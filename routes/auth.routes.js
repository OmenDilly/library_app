const {Router} = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middaleware/auth.check')
const { check, validationResult } =require('express-validator')
const bcrypt = require('bcrypt')

const router = Router()

router.post(
	'/register',
	auth,
	[
		check('password', 'Мингимлаьная длина пароля 6 символов').isLength({
			min: 6,
			max: 20
		})
	],
	async(req, res) => {
		try {

			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистарции'
				})
			}

			const { login, password, name, surname, patronomyc, role, status} = req.body

			const candidate = await User.findOne({ login })

			if (candidate) {
				return res.status(400).json({ message: 'Пользователь с таким логином ужде существует'})
			}

			const hashedPassword = await bcrypt.hash(password, 12) 

			const user = new User({
				login,
				password: hashedPassword,
				name,
				surname,
				patronomyc,
				role,
				status
			})

			await user.save()

			res.status(201).json({ message: 'Пользователь создан'})

		} catch (e) { 
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

router.post(
	'/signin',
	async(req, res) => {
		try {

			const errors = validationResult(req)
	
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при при входе'
				})
			}
	
			const {login, password} = req.body
	
			const user = await User.findOne({ login })

			if (!user) {
				return res.status(400).json({message: 'Пользователь не найден'})
			}

			const passwordMatch = await bcrypt.compare(password, user.password)

			if (!passwordMatch) {
				return res.status(400).json({ message: 'Неверный пароль, попробуйте снова'})
			}

			const token = jwt.sign(
				{userId: user.id, role: user.role},
				config.get('secret'),
				{
					expiresIn: '1w'
				}
			)

			res.json({ message: 'Успешная авторизация', token, userId: user.id})

		} catch (e) { 
			return res.status(500).json({ message: 'Что-то пошло не так', error: e.message})
		}
	}
)

module.exports = router 
