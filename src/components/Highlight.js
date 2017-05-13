import PropTypes from 'prop-types';
import MdStarHalf from 'react-icons/lib/md/star-half';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';

export const Highlight = ({data}) => {
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

	return (
		<section id="book-highlight" 
						 aria-label="Area showing information about book selected from list">
			<h2>{data.title}</h2>
			<h3>{(data.authors) ? <span>by</span> : null}{data.authors}</h3>
			<span>{renderStars(data.rating)}</span>
			<p><img src={data.thumbnail} alt={data.title}/>{data.description}</p>
			<div>
				<span>{data.publisher}</span>
				<span>{data.publishedDate}</span>
			</div>
			<div><a href="">Purchase</a></div>
		</section>
	)
}

Highlight.propTypes = {
	data: PropTypes.object
}