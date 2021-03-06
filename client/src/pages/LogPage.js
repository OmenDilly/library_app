import React, {useContext, useState} from 'react'
import { CustomTable } from '../components/CustomTable'
import { LogDetail } from '../components/LogDetail'
import { DataContext } from '../context/DataContext'
import { useApi } from '../hooks/useApi'

export const LogPage = () => {

	const userData = useContext(DataContext)

	const {request} = useApi()

	const [data, setData] = useState({
		columns: [
			{title: 'Дата', field: 'date'},
			{title: 'Пользователь', field: 'user.initials'},
			{title: 'До', field: 'endDate'},
			{title: 'Статус', field: 'status'},
		],
		values: query =>
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

	const addLog = async (data) => {
		const added = await request(`api/log`, 'POST', {data}, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(added)
	}
	const deleteLog = async (data) => {
		const deleted = await request(`api/log/${data._id}`, 'DELETE', null, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(deleted)
	}
	const updateLog = async (data) => {
		const updated = await request(`api/log/${data._id}`, 'PATCH', {data}, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(updated)
	}

	const logDetail = (data) => {
		return (
			<LogDetail data={data}/>
		)
	}

	return (
		<div>
			{
				CustomTable(data, addLog, deleteLog, updateLog, logDetail)
			}
		</div>
	)
}
