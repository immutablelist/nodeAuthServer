import knex from './config';
import { writeScreen } from './utils/screen';


knex.select('title', 'rating')
		.from('book')
		.asCallback((err, rows) => {
			if (err) throw err;
			else writeScreen(rows, 'json');

			knex.destroy();
		});
