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
					"publisher": "Del Rey Books",
	    		"publishedDate": "1982",
	    		"description": "Chronicles the adventures of the inhabitants of Middle-earth and Bilbo Baggins, the hobbit who brought home to The Shire the One Ring of Power",
					"thumbnail": "http://books.google.com/books/content?id=hFfhrCWiLSMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"			
				}
			]
		}
	}	

	componentDidMount() {
		this.serverRequest = fetch("https://www.googleapis.com/books/v1/volumes?q=intitle:lord+of+the+flies")
			.then(response => response.json())
			.then((data) => {
				console.log(data)
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
		}).catch((err) => {
				console.error('There was an error fetching data', err);
			});
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

 	render() {
		return(
			<div className="app">
				<DashBoard />
				<Highlight data={this.state.items[0]}
				/>
				<BookList data={this.state.items} />
			</div>
		)
	}
};
