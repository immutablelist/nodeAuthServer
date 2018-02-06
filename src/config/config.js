// import Model from 'src/config/BaseModel';
import knexConfig from '../../knexfile';
import { clearScreen } from '../utils/screen';

// ////////////////////////////////////////////////////////// IMPORT END
// /////////////////////////////////////////////////////////////////////

clearScreen();

const environment = process.env.NODE_ENV || 'development';
const knexConfigEnv = knexConfig[environment];

const knex = require('knex')({
	...knexConfigEnv,
	debug: true,
});


// /////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////// EXPORT DEFAULT
export default knex;
