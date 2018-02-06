const env = require('dotenv');
const path = require('path');

env.load({ path: path.resolve(__dirname, '.env') });

const {
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_NAME,
} = process.env;


module.exports = {
	development: {
		client: 'pg',
		connection: {
			database: DB_NAME,
			host: DB_HOST,
			user: DB_USERNAME,
			port: DB_PORT,
			password: DB_PASSWORD,
			charset: 'utf8',
		},
		debug: true,
		migrations: {
			tableName: 'migrations',
		},
	},

	staging: {
		client: 'pg',
		connection: {
			database: DB_NAME,
			host: DB_HOST,
			user: DB_USERNAME,
			port: DB_PORT,
			password: DB_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'migrations',
		},
	},

	production: {
		client: 'pg',
		connection: {
			database: DB_NAME,
			host: DB_HOST,
			user: DB_USERNAME,
			port: DB_PORT,
			password: DB_PASSWORD,
			charset: 'utf8',
		},
		migrations: {
			tableName: 'migrations',
		},
	},

	testing: {
		client: 'pg',
		connection: {
			database: DB_NAME + '_' + process.pid,
			host: DB_HOST,
			user: DB_USERNAME,
			port: DB_PORT,
			password: DB_PASSWORD,
			charset: 'utf8',
		},
		migrations: {
			tableName: 'migrations',
		},
	},
};
