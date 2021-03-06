import {useContext, useState} from 'react'
import { CustomTable } from '../components/CustomTable'
import { DataContext } from '../context/DataContext'
import { BookDetail } from '../components/BookDetail'
import { useApi } from '../hooks/useApi'

export const BooksPage = () => {

	const userData = useContext(DataContext)

	const {request} = useApi()

	const [data, setData] = useState({
		columns: [
			{title: 'Название', field: 'name'},
			{title: 'Статус', field: 'status'},
		],
		values: query =>
		new Promise((resolve, reject) => {
				// prepare your data and then call resolve like this:
				request('api/book', 'GET', null, {
					Authorization: `Bearer ${userData.token}`
				})
					.then(result => {
						resolve({
							data: result,
						})
					})
		})
	})

	const addBook = async (data) => {
		const added = await request(`api/book`, 'POST', {data}, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(added)
	}
	const deleteBook = async (data) => {
		const deleted = await request(`api/book/${data._id}`, 'DELETE', null, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(deleted)
	}
	const updateBook = async (data) => {
		const updated = await request(`api/book/${data._id}`, 'PATCH', {data}, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(updated)
	}

	const bookDetail = (data) => {
		return (
			<BookDetail data={data}/>
		)
	}

	return (
		<div>
			{
				CustomTable(data, addBook, deleteBook, updateBook, bookDetail)
			}
		</div>
	)
}
