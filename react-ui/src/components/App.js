/**
 * This program allows users to search the google books
 * API and save their favorites to mongoDB
 */
import { Component } from 'react';
import { DashBoard } from './DashBoard';
import { Highlight } from './Highlight';
import { BookList } from './BookList';
import { Favorites } from './Favorites';
import { Menu } from './Menu';
import idb from '../../node_modules/idb';
import axios from 'axios'

export class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			items: [
				null
			],
			queryObject: {
				type: 'q=intitle:',
				query: 'lord+of+the'
			},
			highlight: 0,
			visibility: {
				highlight: false,
				bookist: false, 
				favorites: false
			},
			favorites: [
				null
			]
		}
		this.updateQuery = this.updateQuery.bind(this);
		this.updateHighlight = this.updateHighlight.bind(this);
		this.addFavorite = this.addFavorite.bind(this);
		this.updateFavoriteHighlight = this.updateFavoriteHighlight.bind(this);
		this.updateVisibility = this.updateVisibility.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
	}	

	// Get the results for the search terms entered
	fetchQuery() {
		this.serverRequest = fetch('https://www.googleapis.com/books/v1/volumes?' + this.state.queryObject.type + this.state.queryObject.query)
			.then(response => response.json())
			.then((data) => {
				data.items.forEach((item, i) => {
					let element = {};
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
						element.rating = null;
					}
					if ( typeof item.volumeInfo.ratingsCount != 'undefined') {
						element.ratingsCount =  item.volumeInfo.ratingsCount;
					} else {
						element.ratingsCount = null;
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
						element.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace(/http:/i, 'https:');

					} else {
						element.thumbnail = null;
					}	
					if ( typeof item.saleInfo.listPrice != 'undefined') {
						element.price = item.saleInfo.listPrice.amount;
					} else {
						element.price = null;
					}	
					if ( typeof item.saleInfo.buyLink != 'undefined') {
						element.purchase = item.saleInfo.buyLink;
					} else {
						element.price = null;
					}	
					if ( typeof item.volumeInfo.description != 'undefined') {
						element.description = item.volumeInfo.description;
					} else {
						element.description = null;
					}	
					this.setState(this.state.items.splice(i, 1, element));
				})				
		}).catch((err) => {
				console.error('There was an error fetching data', err);
			});
	}

	componentDidMount() {		
		// Populate the favorites list
		axios.get('/api/favorites')
		.then(response =>{
			console.log('Fetched from mongo', response.data);
			this.setState({
				favorites: response.data
			})
		}).catch(err => {
			console.error(err);
		});

		// Offline
		if(!window.navigator.onLine) {
			setTimeout(function() {alert('You appear to be offline. Your favorites are still avaiable to you'); }, 1);
			// Open IDB
			const dbPromise = idb.open('favorites', 1, upgradeDB => {
			// Create an object store named weather if none exists
				let favorites = upgradeDB.createObjectStore('favorites');
			}).catch(error => {
					console.error('IndexedDB:', error);
			});
			//Get all the favorites
			dbPromise.then(db => {
			return db.transaction('favorites')
				.objectStore('favorites').getAll();
			}).then(allObjs => {
				this.setState({
					favorites: allObjs,
					visibility: {
					highlight: false,
					booklist: false,
					favorites: true
					}
				});
			});
		}		
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

	// Set the current query in state on change
	updateQuery(queryObject) {
		this.setState({
			queryObject: {
				type: queryObject.type,
				query: queryObject.query
			},
			visibility: {
				highlight: false,
				booklist: true,
				favorites: false
			}
		}, () => {
			this.fetchQuery();
		});
		ga('send', 'event', 'Dashboard', 'New query');
	}

	// Show all the data pertaining to an item
	updateHighlight(highlight) {
		this.setState({
			highlight: highlight.highlight,
			visibility: {
				highlight: true,
				booklist: true,
				favorites: false
			}
		});
		ga('send', 'event', 'Book List', 'View query highlight');
	}

	updateFavoriteHighlight(highlight) {
		this.setState({
			highlight: highlight.highlight,
			visibility: {
				highlight: true,
				booklist: false,
				favorites: true
			}
		});
		ga('send', 'event', 'Favorites List', 'View favorite highlight');

	}

	addFavorite(data) {	
		// Add to state	
		this.setState({
			items: this.state.items.filter((item, i) => i !== this.state.highlight),
			visibility: {
				highlight: false,
				booklist: false,
				favorites: true
			},
			favorites: [ ...this.state.favorites, data]
		});

		// Open IDB
		const dbPromise = idb.open('favorites', 1, upgradeDB => {
			// Create an object store named weather if none exists
				let favorites = upgradeDB.createObjectStore('favorites');
		}).catch(error => {
				console.error('IndexedDB:', error);
		});

		// Add favorite to IDB
		dbPromise.then(db => {
			let tx = db.transaction('favorites', 'readwrite');
			let favorites= tx.objectStore('favorites', 'readwrite');
			favorites.add(data, data.title);
		}).catch(error => {
				console.error('IndexedDB:', error);
		});

		// Add favorite to mongoDB
		axios.post('/api/favorites', data)
		.then(function (res) {
		console.log(res);
		})
		.catch(function (err) {
			console.log(err);
		});  	
		ga('send', 'event', 'Book List', 'Add to favorites');
	}

	removeFavorite(data) {
		const remove = this.state.favorites;
		remove.splice(this.state.highlight, 1);
		this.setState({
			visibility: {
				highlight: false,
				booklist: false,
				favorites: true
			},
			favorites: [...remove]
		});
		const dbPromise = idb.open('favorites', 1, upgradeDB => {
        // Create an object store named weather if none exists
	        let favorites = upgradeDB.createObjectStore('favorites');
	    }).catch(error => {
	        console.error('IndexedDB:', error);
	    });
		dbPromise.then(db => {
            let tx = db.transaction('favorites', 'readwrite');
            let favorites= tx.objectStore('favorites', 'readwrite');
            favorites.delete(data.title);
        }).catch(error => {
            console.error('IndexedDB:', error);
        })
		ga('send', 'event', 'Highlight', 'Remove favorite');
		axios.delete(`/api/favorites/${data._id}`, data)
			.then(function(res){
				console.log(res);
			}).catch(function(err){
				console.error(err);
			})
	}
  
	// Set state for which parts of the UI are visible
	updateVisibility(setVisibility) {
		this.setState({
			visibility: {
				highlight: setVisibility.highlight,
				booklist: setVisibility.booklist,
				favorites: setVisibility.favorites
			}
		});

	}

 	render() {
		return(
			<div className="app">
				<DashBoard queryObject={this.updateQuery} />

				<Highlight data={this.state.visibility.favorites ?
					this.state.favorites[this.state.highlight] :
					this.state.items[this.state.highlight]}
						   visibility={this.state.visibility}
						   addFavorite={this.addFavorite}
						   removeFavorite={this.removeFavorite}/>

				<BookList data={this.state.items}
						  highlight={this.updateHighlight}
						  visibility={this.state.visibility.booklist} />
				
				<Favorites data={this.state.favorites}
						   highlight={this.updateFavoriteHighlight}
						   visibility={this.state.visibility.favorites} />
				
				<Menu setVisibility={this.updateVisibility}
					  visibility={this.state.visibility} />
			</div>
		)
	}
};
