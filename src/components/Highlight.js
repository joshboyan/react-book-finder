import PropTypes from 'prop-types';
import MdStarHalf from 'react-icons/lib/md/star-half';
import MdStarOutline from 'react-icons/lib/md/star-outline';
import MdStar from 'react-icons/lib/md/star';
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove';

export const Highlight = ({data, visibility, addFavorite, removeFavorite, highlight}) => {

	const color = {background: 'white', border: 'white', color: 'red'};
	
	const { title, authors, rating, ratingsCount, thumbnail, 
		publisher, publishedDate, description, price, purchase } = data;
	
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
		console.log('Added to favorites', data);
		addFavorite(data);
	};

	const removeFromFavorites = (shit) => {
		console.log("click event");
		removeFavorite()
	};

	if (visibility.highlight) {
		return (
			<section id="book-highlight" 
							 aria-label="Area showing information about book selected from list">
				<h2>{title}</h2>
				<h3>{(authors) ? <span>by</span> : null}{authors}</h3>
				<span>{renderStars(data.rating)} {ratingsCount ? <span>({ratingsCount})</span> : null}</span>
				<p><img src={thumbnail} alt={title}/>{description}</p>
				<div>
					<span>{publisher}</span>
					<span>{publishedDate}</span>
				</div>
				<hr/>
				<div>
					{!visibility.favorites ? 
						<button onClick={() => addToFavorites()}><MdStar /> Favorite</button> : 
						<button style={color} onClick={() => removeFromFavorites()}><MdHighlightRemove /> Remove</button>}
					{(price) ? <a href={purchase}> Buy ${price}</a> : null}
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