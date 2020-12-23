const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	date: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	user: {
		type: Types.ObjectId,
		required: true,
	},
	books: [{
		type: Types.ObjectId,
		required: true,
		ref: 'Book'
	}],
})

module.exports = model('Log', schema)