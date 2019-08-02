// dummy data
const BOOKS = require('./data/books');
const AUTHORS = require('./data/authors');

const _ = require('lodash');
const uuid = require('uuid/v4');

/**
 * Books CRUD
 */
const books = {
	getAll () {
		return BOOKS;
	},
	getById (id) {
		return _.find(BOOKS, { id: id });
	},
	getByAuthorId (authorId) {
		return _.filter(BOOKS, { authorId: authorId });
	},
	create (name, genre, authorId) {
		let newBook = {
			id: uuid(),
			name,
			genre,
			authorId
		}
		BOOKS.push(newBook);
		return newBook;
	} 
}


/**
 * Author CRUD
 */
const authors = {
	getAll () {
		return AUTHORS;
	},
	getById (id) {
		return _.find(AUTHORS, { id: id });
	},
	create (name, age) {
		let newAuthor = {
			id: uuid(),
			name,
			age
		}
		AUTHORS.push(newAuthor);
		return newAuthor;
	}
} 

module.exports = {
	books,
	authors
}