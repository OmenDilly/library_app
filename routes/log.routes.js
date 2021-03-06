const {Router} = require('express')
const Log = require('../models/Log')
const User = require('../models/User')
const Book = require('../models/Book')
const config = require('config')
const auth = require('../middaleware/auth.check')
const router = Router()


router.post(
	'/',
	auth,
	async(req, res) => {
		try {

			const {endDate, status, user, books} = req.body

			// const logExists = await Log.findOne( {name} )

			// if (logExists) {
			// 	return res.status(400).json({ message: 'Такая Запись уже есть'})
			// }
			// const book = await Book.findOne( {"users": user} )

			// if (!book) {
			// 	await Book.update(
			// 		{ "_id": 1 },
			// 		{ $push: { "users": user } }
			//  )
			// }

			let [month, date, year] = new Date().toLocaleDateString("ru-RU").split("/")
			let [parsedMonth, parsedDate, parsedYear] = new Date(endDate).toLocaleDateString("ru-RU").split("/")

			const newLog = new Log({
				date: `${date}.${month}.${year}`,
				endDate: `${parsedDate}.${parsedMonth}.${parsedYear}`,
				status,
				user,
				books,
				owner: req.user.userId
			})

			await newLog.save()

			return res.json({message: 'Запись успешно создана'})

		} catch (e) { 
			console.log(e.message)
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

router.get(
	'/:id',
	auth,
	async(req, res) => {
		try {

			const id = req.params.id

			const log = await Log.findOne( {"_id": id} )

			if (!log || log === undefined || log.length == 0) {
				return res.status(400).json({message: 'Такой записи нет'})
			}

			res.json(log)

		} catch (e) { 
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

router.get(
	'/owner/:id',
	auth,
	async(req, res) => {
		try {

			const id = req.params.id

			const log = await Log.findOne( {"owner": id} ).populate('user books').exec()

			if (!log || log === undefined || log.length == 0) {
				return res.status(400).json({message: 'Такой записи нет'})
			}

			res.json(log)

		} catch (e) { 
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

router.get(
	'/user/:id',
	auth,
	async(req, res) => {
		try {

			const id = req.params.id

			const log = await Log.findOne( {"user": id} ).populate('user books').exec()

			if (!log || log === undefined || log.length == 0) {
				return res.status(400).json({message: 'Такой записи нет'})
			}

			res.json(log)

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
			
			const logsList = await Log.find().populate('user books')

			// console.log(logsList)

			if (!logsList || logsList === undefined || logsList.length == 0) {
				return res.status(400).json({message: 'Список записей пуст'})
			}

			res.json(logsList)

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

		const changedLog = await Log.updateOne({'_id': id}, {$set: item})

		if (changedLog.err) {
			return res.status(400).json({message: 'Данная операция невозможна'})
		}

		res.json(changedLog)

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

		const changedLog = await Log.deleteOne({'_id': id})

		if (changedLog.ok) {
			return res.json({message: 'Запись удалена'})
		} else {
			return res.status(400).json({message: 'Данная операция невозможна'})
		}

	} catch (e) {
		return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
	}
})

module.exports = router 
