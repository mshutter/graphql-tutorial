import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// components
import BookList from './components/BookList';
// apollo client setup
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
})

function App() {
  return (
  	<ApolloProvider client={client}>
	    <div id="app-container">
	      <h1>Check this out!</h1>
	      <BookList />
	    </div>
	</ApolloProvider>
  );
}

export default App;
