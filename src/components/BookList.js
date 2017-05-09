import { Component } from 'react'
import { BookRow} from './BookRow'

export const BookList = ({data}) => (
	<table>
		<thead>
			<tr>
				<th>Title</th>
				<th>Author</th>
				<th>Published</th>
				<th>ISBN</th>
			</tr>
		</thead>
		<tbody>
			<BookRow data={data}/>
		</tbody>
	</table>
)