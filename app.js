const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/log', require('./routes/log.routes'))
app.use('/api/book', require('./routes/book.routes'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = config.get('port') || 5000

async function start() {
	try {
		await mongoose.connect(config.get('MURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
	} catch (e) {
		console.log(`Error ${e.message}`)
		process.exit(1)
	}
}

start()

app.listen(PORT, () => console.log(`app started on ${PORT}`))