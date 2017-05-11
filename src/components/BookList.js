import { Component } from 'react'
import { BookRow } from './BookRow'

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
				title = {entry.volumeInfo.title}
				author = {entry.volumeInfo.authors[0]}
				onClick = {handleClick()}
				/>
			)}
		</tbody>
	</table>
)