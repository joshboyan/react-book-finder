import PropTypes from 'prop-types';
import { BookRow } from './BookRow';

export const BookList = ({data}) => (
	<table>
		<thead>
			<tr>
				<th>Title</th>
				<th>Author</th>
			</tr>
		</thead>
		<tbody>
			{data.map((entry, i) =>
				<BookRow key = {i}
				title = {entry.title}
				author = {entry.authors}
				/>
			)}
		</tbody>
	</table>
)

BookList.propTypes = {
	data: PropTypes.array
}