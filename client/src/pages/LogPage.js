import React, {useContext, useState} from 'react'
import { CustomTable } from '../components/CustomTable'
import { DataContext } from '../context/DataContext'
import { useApi } from '../hooks/useApi'

export const LogPage = () => {

	const userData = useContext(DataContext)

	const {request} = useApi()

	const [data, setData] = useState({
		columns: [
			{title: 'Дата', field: 'name'},
			{title: 'Пользователь', field: 'user'},
			{title: 'До', field: 'endDate'},
			{title: 'Статус', field: 'status'},
		],
		data: query =>
		new Promise((resolve, reject) => {
				// prepare your data and then call resolve like this:
				request('api/log', 'GET', null, {
					Authorization: `Bearer ${userData.token}`
				})
					.then(result => {
						resolve({
							data: result,
						})
					})
		})
	})

	const addLog = () => {
		console.log('add')
	}
	const deleteLog = () => {
		console.log('delete')
	}
	const updateLog = () => {
		console.log('update')
	}

	return (
		<div>
			{
				CustomTable(data, addLog, deleteLog, updateLog)
			}
		</div>
	)
}
