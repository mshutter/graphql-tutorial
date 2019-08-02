const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;
const _ = require('lodash');

// dummy data
const BOOKS = require('../data/books.json');
const AUTHORS = require('../data/authors.json');


/**
 * Schema
 *
 * 1. defined object types
 * 2. define queries
 * 3. define relationships
 */
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve (parent, args) {
				return _.find(AUTHORS, { id: parent.authorId });
			}
		}
	})
})
const AuthorType = new GraphQLObjectType({
	name: 'Author',

	// need to wrap in function to implement JIT typing
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve (parent, args) {
				return _.filter(BOOKS, { authorId: parent.id });
			}
		}
	})
})

// define query types from the root of the graph
const RootQuery = new GraphQLObjectType({
	name: 'Root',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve (parent, args) {
				return _.find(BOOKS, { id: args.id });
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve (parent, args) {
				return BOOKS;
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve (parent, args) {
				return _.find(AUTHORS, { id: args.id });
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve (parent, args) {
				return AUTHORS;
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})