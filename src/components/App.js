import { Component } from 'react'
import { DashBoard } from './DashBoard'
import { BookList } from './BookList'

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			items:[]
		}
	}	

	componentDidMount() {
		this.serverRequest = fetch("https://www.googleapis.com/books/v1/volumes?q=the+hobbit")
			.then(response => response.json())
			.then((data) => {this.setState(data);
				console.log(data);
		})
	}

	componentWillUnmount() {
		this.serverRequest.abort();
	}

 	render() {
		return(
			<div className="app">
				<BookList data={this.state.items} />
			</div>
		)
	}
};
