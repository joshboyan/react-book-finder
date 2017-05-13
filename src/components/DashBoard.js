import PropTypes from 'prop-types';
export const DashBoard = ({type, query, queryObject}) => {
	
	let _type, _query;

	const submit = (e) => {
		e.preventDefault();
		queryObject({
			type: _type.value,
			query: _query.value
		});
	}
	
	return(
		<div className="book-form">
		<form onSubmit={submit}>
			<select name="" id="" defaultValue={type} ref={option => _type = option}>
				<option value="q=intitle:">Title</option>
				<option value="q=inauthor:">Author</option>
				<option value="q=subject:">Subject</option>
			</select>
			<label htmlFor="query"></label>
			<input id="query" type="text" defaultValue={query} ref={input => _query = input}/>
			<button>Search</button>
		</form>
		</div>
	)
}

DashBoard.defaultProps = {
	type: "q=intitle",
	query: "hobbit"
}

DashBoard.propTypes = {
	type: PropTypes.string,
	query: PropTypes.string
}