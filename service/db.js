// 


var Sequelize = require('sequelize');

var sequelize = new Sequelize('main', null, null, {
	dialect: 'sqlite',
	operatorsAliases: false,

	pool: {
		max: 10,
		min: 0,
		idle: 10000
	},
	storage: __dirname + '/../assets/data/shopping.db',

	logging: false,
	// logging: msg => console.log("SQL:" +msg),
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Sqlite Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});


module.exports = sequelize;