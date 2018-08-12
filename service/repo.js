//

var Sequelize = require('sequelize');
var db = require('./db.js');

const User = db.define('users', {
	id: {
		type: Sequelize.STRING(32),
		primaryKey: true
	},
	name: Sequelize.STRING(200),
	birth: Sequelize.DATE
}, {
	timestamps: false,
});

module.exports.User = User;