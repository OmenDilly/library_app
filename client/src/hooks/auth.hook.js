import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {

	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)

	const signIn = useCallback((webToken, id) => {
		setToken(webToken)
		setUserId(userId)

		localStorage.setItem(storageName, JSON.stringify({
			userId: id, token: webToken
		}))
	}, [])

	const signOut = useCallback(() => {
		setToken(null)
		setUserId(null)
		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))

		if (data && data.token) {
			signIn(data.token, data.userId)
		}
	}, [signIn])

	return {signIn, signOut, token, userId}
}