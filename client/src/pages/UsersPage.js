import {useContext, useState} from 'react'
import { CustomTable } from '../components/CustomTable'
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

	return (
		<div>
			{CustomTable(data)}
		</div>
	)
}
