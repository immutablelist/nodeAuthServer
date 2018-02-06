// /////////////////////////////////////////////////////////////////////
// Database Connection
// Knex & Objection DB Instance connection
// /////////////////////////////////////////////////////////////////////

import knexConfig from '../../knexfile';
import Model from './BaseModel';

const environment = process.env.NODE_ENV || 'development';
const knexConfigEnv = knexConfig[environment];

const knex = require('knex')({
	...knexConfigEnv,
	debug: false,
});

Model.knex(knex);

export { knexConfigEnv };

export default Model;
