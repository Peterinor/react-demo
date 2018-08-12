// cache demo

module.exports = {
	get: {
		show: async ctx => {
			ctx.body = ctx.cache.get('x') || '';
		},

		inc: async ctx => {
			var c = ctx.cache.get('x');
			c++;
			ctx.cache.set('x', c);
			ctx.body = c;
		}
	}
}