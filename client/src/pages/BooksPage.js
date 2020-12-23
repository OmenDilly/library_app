import {useContext, useState} from 'react'
import { CustomTable } from '../components/CustomTable'
import { DataContext } from '../context/DataContext'
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

	return (
		<div>
			{CustomTable(data)}
		</div>
	)
}
