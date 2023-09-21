const mongoose = require("mongoose");

const URL = process.env.MONOGODB_URL;
mongoose
	.connect(URL)
	.then(() => {
		console.log("Connected");
	})
	.catch(() => {
		console.log("Connection failed");
	});

const loginSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
	},
	gender: {
		type: String,
	},
	admin: {
		type: Boolean,
		required: true,
	},
	profilePic: {
		type: String,
	},
	moviesWatched: {
		type: Array,
	},
	moviesLater: {
		type: Array,
	},
});

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;
