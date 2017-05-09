import { Component } from 'react'
import { DashBoard } from './DashBoard'
import { BookList } from './BookList'
import { BookRow } from './BookRow'

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items:['hi', 'pal','howya', 'doin']
		}
	}	

	componentDidMount() {
		this.serverRequest = fetch("https://www.googleapis.com/books/v1/volumes?q=the+hobbit")
			.then(response => response.json())
			.then((data) => {this.setState(data);
		})
	}
	/*componentDidMount() {
  	this.serverRequest = $.get("https://www.googleapis.com/books/v1/volumes?q=the+hobbit", function(result) {
  		var tempApts = result;
  		this.setState({
  			items: tempApts
  		});//setState
  	}.bind(this))
  }*/

 	render() {
		return(
			<div className="app">
				<BookList data={this.state.items}/>
			</div>
		)
	}
};
