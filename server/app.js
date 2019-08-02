const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
	schema,

	// documentation expander is huge!
	// imagine you need to buld a front end for an unfamiliar API
	
	graphiql: true
}))

app.listen(4000, () => {
	console.log('listening on port 4000...')
})