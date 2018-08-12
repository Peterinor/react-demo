//


var cache = {
	caches: {},
	get: function(key) {
		if (key in this.caches) {
			return this.caches[key];
		}
		return null;
	},

	set: function(key, value) {
		this.caches[key] = value;
	}
};

function serve() {

	return function middle_ware(ctx, next) {
		ctx.cache = cache;
		return next();
	}
}


module.exports = serve;