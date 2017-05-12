export const Highlight = ({data}) => (
	<div>
		<h2>{data.title}</h2>
		<h3>{data.author}</h3>
		<p>{data.publishedDate}</p>
		<div><img src={data.thumbnail} alt=""/></div>
		<div><p>{data.description}</p></div>
		<span>{data.publisher}</span>
		<span>Something</span>
		<div><a href="">Purchase</a></div>
	</div>
)