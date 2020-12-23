const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true 
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	patronomyc: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	books: [{
		type: Types.ObjectId,
		ref: 'Book'
	}],
	logs: [{
		type: Types.ObjectId,
		ref: 'Log'
	}]
})

module.exports = model('User', schema)