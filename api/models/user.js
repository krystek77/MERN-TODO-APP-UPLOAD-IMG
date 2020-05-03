const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		default: undefined,
	},
	lastName: {
		type: String,
		default: undefined,
	},
	phone: {
		type: String,
		default: undefined,
	},
	job: {
		type: String,
		default: undefined,
	},
	country: {
		type: String,
		default: undefined,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model('User', userSchema);
