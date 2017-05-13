import PropTypes from 'prop-types';

export const Highlight = ({data}) => (
	<section id="book-highlight" 
					 aria-label="Area showing information about book selected from list">
		<h2>{data.title}</h2>
		<h3>{data.authors}</h3>
		<p>{data.publishedDate}</p>
		<div><img src={data.thumbnail} alt={data.title}/></div>
		<div><p>{data.description}</p></div>
		<span>{data.publisher}</span>
		<span>Something</span>
		<div><a href="">Purchase</a></div>
	</section>
)

Highlight.propTypes = {
	data: PropTypes.object
}