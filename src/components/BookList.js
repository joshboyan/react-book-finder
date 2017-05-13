import PropTypes from 'prop-types';
import { BookRow } from './BookRow';

export const BookList = ({data, highlight}) => {

	return(
		<section id="book-list"
						 aria-label="List of books returned from search">
				{data.map((entry, i) =>
					<BookRow key = {i}
									 id = {i}
					         rowNumber = {i}
					         title = {entry.title}
					         author = {entry.authors}
					         rating = {entry.rating}
					         highlight = {highlight}
					/>
				)}
			</section>
	)
}

BookList.propTypes = {
	data: PropTypes.array
}