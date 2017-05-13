import PropTypes from 'prop-types';
import MdStarHalf from 'react-icons/lib/md/star-half';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';

export const BookRow = ({rowNumber, title, author, rating, highlight}) => {

	const click = () => {
		console.log('Just clicked row number', rowNumber);
		highlight({
			highlight: rowNumber
		})
	}

	const renderStars = (rating) => {
		let stars = [];
		let i, j;
		if(rating) {
			for (i = 0; i < 5; i++) {
				stars.push(<MdStarOutline key={i} />);
			}
		}
		for (i = 0; i < Math.floor(rating); i++) {
			stars.splice(i, 1, <MdStar key={i} />);
		}
		if (i < rating) {
			stars.splice(i, 1, <MdStarHalf key={i + 1} />);
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