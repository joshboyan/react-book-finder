/**
 * This component show each entries overview snippet
 */
import PropTypes from 'prop-types';
import MdStarHalf from 'react-icons/lib/md/star-half';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';
import Scroll from 'react-scroll';

export const BookRow = ({rowNumber, title, author, rating, highlight}) => {

	// Scroll to the top of UI when user selects an entry
	const click = () => {
		highlight({
			highlight: rowNumber
		})
		Scroll.animateScroll.scrollTo(200);
	}

	// This transforms the numerical rating into a 5 star UI
	const renderStars = (rating) => {
		let stars = [];
		// Use i to iterate through state array and j to assign unique key to each item
		let i, j = 0;
		if(rating) {
			for (i = 0; i < 5; i++) {
				stars.push(<MdStarOutline key={j} />);
				j++;
			}
		}
		for (i = 0; i < Math.floor(rating); i++) {
			stars.splice(i, 1, <MdStar key={j} />);
			j++;
		}
		if (i < rating) {
			stars.splice(i, 1, <MdStarHalf key={j + 1} />);
			j++;
		}	
			return stars;
	}

	return(
	<div onClick={click}>
			<p>{title}</p>
			<span>{author}</span>
			<span>{renderStars(rating)}</span>
	</div>
	)
}

BookRow.propTypes ={
	title: PropTypes.string,
	author: PropTypes.string
}