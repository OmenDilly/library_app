import {useContext, useState} from 'react'
import { CustomTable } from '../components/CustomTable'
import { UserDetail } from '../components/UserDetail'
import { DataContext } from '../context/DataContext'
import { useApi } from '../hooks/useApi'

export const UsersPage = () => {

	const {request} = useApi()

	const userData = useContext(DataContext)
	const [data, setData] = useState({
		columns: [
			{title: 'Имя', field: 'name'},
			{title: 'Фамилия', field: 'surname'},
			{title: 'Отчество', field: 'patronomyc'},
			{title: 'Роль', field: 'role'},
			{title: 'Статус', field: 'status'},
		],
		values: query =>
			new Promise((resolve, reject) => {
					// prepare your data and then call resolve like this:
          request('api/user', 'GET', null, {
						Authorization: `Bearer ${userData.token}`
					})
            .then(result => {
              resolve({
                data: result,
              })
            })
			})
	})

	const addUser = async (data) => {
		const added = await request(`api/user`, 'POST', {data}, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(added)
	}
	const deleteUser = async (data) => {
		const deleted = await request(`api/user/${data._id}`, 'DELETE', null, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(deleted)
	}
	const updateUser = async (data) => {
		const updated = await request(`api/user/${data._id}`, 'PATCH', {data}, {
			Authorization: `Bearer ${userData.token}`
		})
		console.log(updated)
	}

	const userDetail = (data) => {
		return (
			<UserDetail data={data}/>
		)
	}

	return (
		<div>
			{
				CustomTable(data, addUser, deleteUser, updateUser, userDetail)
			}
		</div>
	)
}
