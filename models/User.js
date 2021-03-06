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
	},
	fullName: {
		type: String,
	},
	initials: {
		type: String,
	},
	surname: {
		type: String,
	},
	patronomyc: {
		type: String,
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