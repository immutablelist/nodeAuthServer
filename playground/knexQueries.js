import knex from '../src/config';
import { writeScreen } from '../src/utils/screen';

// ////////////////////////////////////////////////////////// IMPORT END
// /////////////////////////////////////////////////////////////////////


const author_id = 1;
const run = (knexQuery, mode) => {
	return knexQuery
		.then(rows => {writeScreen(rows, mode);})
		.catch(err => {writeScreen(err);})
		.finally(() => {knex.destroy();});
};

const query = knex
	.select('title', 'rating')
	.from('book')
	.distinct()
	.limit(2);

const query2 = knex.raw('SELECT title, rating FROM book');
// Question mark to secure for sql attack
const query3 = knex.raw('SELECT * FROM book WHERE author_id = ?', [author_id]);

// Sorting orderBy / orderByRaw methods
const query3 = knex('book')
	.column('title', 'rating')
	.orderBy('title', 'desc')
	.orderByRaw('title desc');

const query4 = knex('book')
	.select('title', 'id')
	.orderBy('id')
	.limit(2)
	.offset(2);

// Filters
const query5 = knex('author')
	.where({ 'firstname': 'Mark', 'lasname': 'Twain' });

// <> means not equal to
const query6 = knex('author').where('id', '<>', 1);
const query7 = knex('author').where('id', 'in', [1, 2, 3]);

const subquery = knex('author').select('id').where('id', '>', 1);
const query8 = knex('author').where('id', 'in', subquery);

const query9 = knex('author').where(function() {
	this.where('id', 1).orWhere('id', '>', 3);
}).orWHere({ 'firstname': 'Mark' });


const query10 = knex('book').whereExists(function() {
	this.from('author').whereRaw('1=1');
});

run(query, 'json');


// /////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////// QUERIES


// /////////////////////////////////////////////////////////////// JOINS
// /////////////////////////////////////////////////////////////////////

/*
	| METHODS |
	join,
	leftJoin, leftOuterJoin,
	rightJoin, rightOuterJoin,
	outerJoin, fullOuterJoin,
	crossJoin,
	joinRaw
 */

const joinQuery = knex('book')
	.join('author', 'author.id', '=', 'book.author_id')
	.select('author.firstname', 'author.lastname', 'book.title');

// on / orOn
const joinQuery = knex('book')
	.join(function() {
		this.on('author', 'author.id', '=', 'book.author_id')
				.orOn('x', '=', 'y');
	})
	.select('author.firstname', 'author.lastname', 'book.title');
