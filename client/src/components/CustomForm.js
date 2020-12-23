import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextField, Input, Button } from '@material-ui/core'

const initialValues = {
	login: '',
	password: ''
}

const onSubmit = values => {
	console.log(values)
}

const validate = values => {

	let errors = {}

	if (!values.login) {
		errors.login = 'Заполните поле'
	}

	if (!values.password) {
		errors.password = 'Заполните поле'
	}

	if (values.password.length < 6) {
		errors.password = 'Минимальная длина пароля 6 символов'
	}

	return errors
}

export const CustomForm = () => {

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validate={validate}
		>
			<Form>
				<div>
					<Input
						inputComponent={Field} 
						type='text'
						id='login'
						name='login'
					/>
					<ErrorMessage name='login'/>
				</div>
				<div>
					<Input
						inputComponent={Field} 
						type='password'
						id='password'
						name='password'
					/>
					<ErrorMessage name='password'/>
				</div>
				<Button type='submit'> 
					Войти
				</Button>
			</Form>
		</Formik>
	)
}
