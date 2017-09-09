/**
 * This component generates a BookRow for every array element in state
 */
import PropTypes from 'prop-types';
import { BookRow } from './BookRow';

export const BookList = ({data, highlight, visibility}) => {

	if (visibility && data[0] !== null) {
		return(
			<section id="book-list"
							 aria-label="List of books returned from search">
				{data.map((entry, i) =>
					
					<BookRow key = {i}
					         rowNumber = {i}
					         title = {entry.title}
					         author = {entry.authors}
					         rating = {entry.rating}
					         highlight = {highlight}
					/>
				)}
			</section>
		)
	} else {
		return null;
	}
}

BookList.propTypes = {
	data: PropTypes.array
}