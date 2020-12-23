import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { LogPage } from './pages/LogPage'
import { Nav } from './components/Nav'
import { AuthPage } from './pages/AuthPage'
import { SettingsPage } from './pages/SettingsPage'
import { ActionButton } from './components/ActionButton'

export const useRoutes = isAuthenticated => {

	if (isAuthenticated) {
		return (
			<>
				<Nav/>
				<Switch>
					<Route path='/' exact>
						<LogPage/>
					</Route>
					<Route path='/settings' exact>
						<SettingsPage/>
					</Route>
					<Redirect to='/'/>
				</Switch>
				<ActionButton/>
			</>
		)
	}

	return (
		<Switch>
			<Route path='/'>
				<AuthPage/>
			</Route>
			<Redirect to='/'/>
		</Switch>
	)

}
