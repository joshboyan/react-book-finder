import { Component } from 'react';
import { DashBoard } from './DashBoard';
import { Highlight } from './Highlight';
import { BookList } from './BookList';

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			items: [
				{
					"title": "The Hobbit, Or, There and Back Again",
					"authors": "John Ronald Reuel Tolkien",
					"rating": 4,
					"publisher": "Del Rey Books",
	    		"publishedDate": "1982",
	    		"description": "Chronicles the adventures of the inhabitants of Middle-earth and Bilbo Baggins, the hobbit who brought home to The Shire the One Ring of Power",
					"thumbnail": "http://books.google.com/books/content?id=hFfhrCWiLSMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"			
				}
			],
			queryObject: {
				type: 'q=intitle:',
				query: 'lord+of+the'
			},
			highlight: 0,
			visibility: {
				highlight: false,
				bookist: false
			}
		}
		this.updateQuery = this.updateQuery.bind(this);
		this.updateHighlight = this.updateHighlight.bind(this);
	}	

	fetchQuery() {
		this.serverRequest = fetch('https://www.googleapis.com/books/v1/volumes?' + this.state.queryObject.type + this.state.queryObject.query)
			.then(response => response.json())
			.then((data) => {
				console.log(data);
				data.items.forEach((item, i) => {
					let element = {}
					if (typeof item.volumeInfo.title != 'undefined') { 
						element.title = item.volumeInfo.title;
					} else {
						element.title = null;
					}
					if ( typeof item.volumeInfo.authors != 'undefined') {
						element.authors =  item.volumeInfo.authors[0];
					} else {
						element.authors = null;
					}
					if ( typeof item.volumeInfo.averageRating != 'undefined') {
						element.rating =  item.volumeInfo.averageRating;
					} else {
						element.authors = null;
					}
					if ( typeof item.volumeInfo.publisher != 'undefined') {
						element.publisher = item.volumeInfo.publisher;
					} else {
						element.publisher = null;
					}
					if ( typeof item.volumeInfo.publishedDate != 'undefined') {
						element.publishedDate = item.volumeInfo.publishedDate;
					} else {
						element.publishedDate = null;
					}
					if ( typeof item.volumeInfo.description != 'undefined') {
						element.description = item.volumeInfo.description;
					} else {
						element.description = null;
					}	
					if ( typeof item.volumeInfo.imageLinks != 'undefined' &&
								typeof item.volumeInfo.imageLinks.thumbnail != 'undefined' ) {
						element.thumbnail = item.volumeInfo.imageLinks.thumbnail;
					} else {
						element.thumbnail = null;
					}	
					this.setState(this.state.items.splice(i, 1, element));
				})
				console.log(document.getElementsByClassName('book-form'));				
		}).catch((err) => {
				console.error('There was an error fetching data', err);
			});
	}

	componentDidMount() {
		this.fetchQuery();
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	updateQuery(queryObject) {
		this.setState({
			queryObject: {
				type: queryObject.type,
				query: queryObject.query
			},
			visibility: {
				highlight: false,
				booklist: true
			}
		}, () => {
			this.fetchQuery();
		});
	}

	updateHighlight(highlight) {
		this.setState({
			highlight: highlight.highlight,
			visibility: {
				highlight: true,
				booklist: true
			}
		});
	}

 	render() {
		return(
			<div className="app">
				<DashBoard queryObject={this.updateQuery} />
				<Highlight data={this.state.items[this.state.highlight]}
									 visibility={this.state.visibility.highlight}/>
				<BookList data={this.state.items}
									highlight={this.updateHighlight}
									visibility={this.state.visibility.booklist} />
			</div>
		)
	}
};
