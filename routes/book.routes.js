const {Router} = require('express')
const Book = require('../models/Book')
const auth = require('../middaleware/auth.check')
const router = Router()

router.post(
	'/',
	auth,
	async(req, res) => {
		try {

			const {name, status} = req.body

			const bookExists = await Book.findOne( {name} )

			if (bookExists) {
				return res.status(400).json({ message: 'Такая книга уже есть'})
			}

			const newBook = new Book({
				name,
				status
			})

			await newBook.save()

			return res.json({message: 'Книга успешно создана'})

		} catch (e) { 
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

			const book = await Book.findOne( {"_id": id} )

			if (!book || book === undefined || book.length == 0) {
				return res.status(400).json({message: 'Такой книги нет'})
			}

			res.json(book)

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
			
			const booksList = await Book.find()

			if (!booksList || booksList === undefined || booksList.length == 0) {
				return res.status(400).json({message: 'Список книг пуст'})
			}

			res.json(booksList)

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

		const changedBook = await Book.updateOne({'_id': id}, {$set: item})

		if (changedBook.err) {
			return res.status(400).json({message: 'Данная операция невозможна'})
		}

		res.json(changedBook)

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

		const changedBook = await Book.deleteOne({'_id': id})

		if (changedBook.ok) {
			return res.json({message: 'Книга удалена'})
		} else {
			return res.status(400).json({message: 'Данная операция невозможна'})
		}

	} catch (e) {
		return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
	}
})

module.exports = router 
