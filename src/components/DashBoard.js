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
		<nav className="book-form">
		<form onSubmit={submit}>
			<select aria-label="Drop-down list for book search category"
						  defaultValue={type} 
						  ref={option => _type = option}>
				<option value="q=intitle:">Title</option>
				<option value="q=inauthor:">Author</option>
				<option value="q=subject:">Subject</option>
			</select>
			<input aria-label="Book search box" 
			       type="text" 
			       defaultValue={query} 
			       ref={input => _query = input}
			       placeholder="Enter search terms"/>
			<input type="submit"
						 value="Search"/>
		</form>
		</nav>
	)
}

DashBoard.propTypes = {
	type: PropTypes.string,
	query: PropTypes.string
}