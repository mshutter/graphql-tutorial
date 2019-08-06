"# graphql-tutorial" 
link:
https://www.youtube.com/watch?v=ed8SzALpx1Q

Presentation Topics
===

Tour of Demo Environment

How an Express API Would Typically Work

GraphQL Server (schema)
1. Entities (GraphQL Object Types)
	- JIT type definition by wrapping fields in function
2. Queries (root query definitions)
	- Show off GraphiQL interface
3. Relationships (relational query definitions)
4. Mutations (Create, Update and Delete)
	- NonNull wrapper

GraphQL Client
1. Incase unfamiliar with React, here is app component rendered initially
2. GraphQL Client (Apollo)
	- Setup:
		a. Get and config ApolloClient
		b. Get ApolloProvider and wrap app component with it