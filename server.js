//

var Koa = require('koa');
var koaBody = require('koa-body');
var koaStatic = require('koa-static');

var config = require('./webpack.config')

const app = new Koa();

require('./middleware/hot-pack.js')(config);

// for static files
app.use(koaStatic(__dirname + '/assets'));
app.use(koaBody());

// memory cache
cacheServer = require('./middleware/cache.js');
app.use(cacheServer());

// view tpl
var dots = require("./middleware/dot_view.js")({
	path: __dirname + "/assets/views",
	layout: true
});
app.use(dots);

// for log
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
	console.log(`${ctx.method} for ${ctx.url} - ${ms}ms`);
});


// for normal http respose
var route_fork = require('./middleware/route_hook.js')(app);
route_fork.addRoutes(__dirname + '/service/actions/cache.js')
	.addRoutes(__dirname + '/service/actions/user.js')
	.addRoutes(__dirname + '/service/actions/shopping.js');

app.listen(8080);
console.log('listen on 8080:')