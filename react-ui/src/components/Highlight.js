/**
 * This comonent shows all the details about the selected entry 
 */
import PropTypes from 'prop-types';
import MdStarHalf from 'react-icons/lib/md/star-half';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove';

export const Highlight = ({ data, visibility, addFavorite, removeFavorite }) => {

	const color = {background: 'white', border: 'white', color: 'red'};
	
	// Transform numerical rating into 5 star UI element
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
	};

	const addToFavorites = () => {
		addFavorite(data);
	};

	const removeFromFavorites = () => {
		removeFavorite(data);
	};

	if (visibility.highlight) {
		return (
			<section id="book-highlight" 
							 aria-label="Area showing information about book selected from list">
				<h2>{data.title}</h2>
				<h3>{(data.authors) ? <span>by</span> : null}{data.authors}</h3>
				<span>{renderStars(data.rating)} {data.ratingsCount ? <span>({data.ratingsCount})</span> : null}</span>
				<p><img src={data.thumbnail} alt={data.title}/>{data.description}</p>
				<div>
					<span>{data.publisher}</span>
					<span>{data.publishedDate}</span>
				</div>
				<hr/>
				<div>
					{!visibility.favorites ? 
						<button onClick={() => addToFavorites()}><MdStar /> Favorite</button> : 
						<button style={color} onClick={() => removeFromFavorites()}><MdHighlightRemove /> Remove</button>}
					{(data.price) ? <a href={data.purchase}> Buy ${data.price}</a> : null}
				</div>
			</section>
		)
	} else {
		return null;
	};
};

Highlight.propTypes = {
	data: PropTypes.object
}