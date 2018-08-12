//

var doT = require('dot');
doT.log = false;

var fs = require('fs');
var path = require('path');
/*
 options: {
	path: view-path,
	layout:..
 }
 */

module.exports = function (options) {
	var layout = options.layout === true ? 'layout' : options.layout,
		body = options.body || 'body';

	var dots = {};

	function compile(pathx) {
		dots = {};
		fs.readdir(pathx, (err, files) => {
			files.forEach(f => {
				var px = path.format({
					dir: options.path,
					base: f
				});
				fs.stat(px, (err, s) => {
					if (s.isDirectory()) {
						var op = {
							path: px
						}
						var dx = dots[f] = doT.process(op);
						if (layout) {
							if (!dx[layout]) throw 'layout <' + layout + '> does not exist...';
						}
					}
				});

			});
		});
	}

	compile(options.path);

	var hk = null;
	fs.watch(options.path, {
		recursive: true,
	}, (type, files) => {
		if (hk) clearTimeout(hk);
		hk = setTimeout(function () {
			compile(options.path);
		}, 1000);
	});

	return function middle_ware(ctx, next) {

		ctx.render = function (view, state) {
			var paths = view.split(/\//g);
			var viewx = paths[1] || 'index';
			var viewGroup = dots[paths[0]];
			if (!viewGroup[viewx]) {
				ctx.status = 505;
				ctx.body = 'view <' + view + '> not found...';
				return;
			}
			state = state || ctx.state;
			ctx.type = 'text/html';

			var html = viewGroup[viewx](state);
			if (layout) {
				ctx.state[body] = html;
				ctx.body = viewGroup[layout](state);

			} else {
				ctx.body = html;
			}
		}

		return next();
	}
}