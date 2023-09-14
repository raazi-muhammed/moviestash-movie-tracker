const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/movieStash")
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
});

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;
