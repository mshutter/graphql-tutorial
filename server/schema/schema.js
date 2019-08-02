const db = require('../db');
const uuid = require('uuid/v4');
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;


/**
 * Schema
 *
 * 1. defined object types
 * 2. define queries
 * 3. define relationships
 * 4. define mutations
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
				return db.authors.getById(parent.authorId);
			}
		}
	})
})
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve (parent, args) {
				return db.books.getByAuthorId(parent.id);
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
				return db.books.getById(args.id);
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve (parent, args) {
				return db.books.getAll()
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve (parent, args) {
				return db.books.getById(args.id);
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve (parent, args) {
				return db.authors.getAll();
			}
		}
	}
})

// define mutations
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull( GraphQLString ) },
				age: { type: new GraphQLNonNull( GraphQLInt ) }
			},
			resolve (parent, args) {
				return db.authors.create(args.name, args.age);
			}
		},
		createBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull( GraphQLString ) },
				genre: { type: new GraphQLNonNull( GraphQLString ) },
				authorId: { type: new GraphQLNonNull( GraphQLString ) }
			},
			resolve (parent, args) {
				return db.books.create(args.name, args.genre, args.authorId);
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})