import PropTypes from 'prop-types';

export const BookRow = ({title, author}) => (
	<tr>
		<td>{title}</td>
		<td>{author}</td>
	</tr>
)

BookRow.propTypes ={
	title: PropTypes.string,
	author: PropTypes.string
}