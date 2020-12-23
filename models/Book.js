const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true 
	},
	status: {
		type: String,
	},
	users: [{
		type: Types.ObjectId,
		ref: 'User'
	}]
})

module.exports = model('Book', schema)