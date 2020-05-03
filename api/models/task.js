const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: { type: String, required: true },
	priority: { type: String, required: true },
	description: { type: String },
	finished: { type: Boolean, default: false },
	createdAt: { type: String },
	updatedAt: { type: String },
	deadline: { type: String },
	image: { type: String },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = Task = mongoose.model('Task', taskSchema);
