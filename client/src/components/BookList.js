/**
 * Present a list of all books in database
 */
import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`

class BookList extends Component {
	displayBooks() {
		const data = this.props.data;
		if (data.loading) {
			return (<div>Loading books...</div>);
		}
		else {
			return data.books.map(book => {
				return (
					<li key={book.id}>{ book.name }</li>
				)
			})
		}
	}
	render() {
		return (
			<div>
				{ this.displayBooks() }
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookList);