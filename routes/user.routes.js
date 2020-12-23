const {Router} = require('express')
const User = require('../models/User')
const auth = require('../middaleware/auth.check')
const router = Router()

router.get(
	'/:id',
	auth,
	async(req, res) => {
		try {

			const id = req.params.id

			const user = await User.findOne( {"_id": id} )

			if (!user || user === undefined || user.length == 0) {
				return res.status(400).json({message: 'Такого пользователя не существует'})
			}

			res.json(user)

		} catch (e) { 
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

router.get(
	'/',
	auth,
	async(req, res) => {
		try {
			
			const usersList = await User.find()

			if (!usersList || usersList === undefined || usersList.length == 0) {
				return res.status(400).json({message: 'Список пользователей пуст'})
			}

			res.json(usersList)

		} catch (e) { 
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

router.patch(
	'/:id',
	auth,
	async (req, res) => {
	try {
		const id = req.params.id
		const item = req.body

		const changedUser = await User.updateOne({'_id': id}, {$set: item})

		if (changedUser.err) {
			return res.status(400).json({message: 'Данная операция невозможна'})
		}

		res.json(changedUser)

	} catch (e) {
		return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
	}
})

router.delete(
	'/:id',
	auth,
	async (req, res) => {
	try {
		const id = req.params.id

		const changedUser = await User.deleteOne({'_id': id})

		if (changedUser.ok) {
			return res.json({message: 'Пользователь удален'})
		} else {
			return res.status(400).json({message: 'Данная операция невозможна'})
		}

	} catch (e) {
		return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
	}
})

module.exports = router 
