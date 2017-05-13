import PropTypes from 'prop-types';

export const BookRow = ({rowNumber, title, author, highlight}) => {

	const click = () => {
		console.log('Just clicked row number', rowNumber);
		highlight({
			highlight: rowNumber
		})
	}

	return(
	<tr onClick={click}>
		<td>{title}</td>
		<td>{author}</td>
	</tr>
	)
}

BookRow.propTypes ={
	title: PropTypes.string,
	author: PropTypes.string
}