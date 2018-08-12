//

const koa_route = require('koa-route');
const methods = require('methods');
const path = require('path');

class Router {
	constructor(app) {
		this.app = app;
	}

	addRoutes(routes, prefix) {

		var allRouts = require(routes);
		prefix = prefix || path.basename(routes, '.js');

		// ['get', 'post', 'put', 'delete', 'head','options']
		methods.forEach(method => {
			var s = allRouts[method];
			if (!s) return;

			Object.keys(s).forEach(actionName => {

				var action = s[actionName];

				var path = prefix ? ('/' + prefix + '/' + actionName) : '/' + actionName

				console.log(method, path);
				// console.log(method, path, action);
				this.app.use(koa_route[method](path, action));

			});

		});

		return this;
	}
};

module.exports = function (app) {
	return new Router(app);
}