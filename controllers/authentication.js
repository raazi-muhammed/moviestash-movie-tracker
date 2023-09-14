const collection = require("../model/mongodb");
const bcrypt = require("bcrypt");

async function checkDetails(req, res, next) {
	try {
		let userName = req.body.username || req.session.user.username;
		let password = req.body.password || req.session.user.password;
		console.log(userName, password);

		const loginData = await collection.findOne({
			name: userName,
		});
		isPassCorrect = await bcrypt.compare(password, loginData.password);
		if (isPassCorrect) next();
		else throw new Error("New error");
	} catch (error) {
		console.log("Incorrect pass");
		res.redirect("/login");
	}
}

async function hashPass(password) {
	try {
		const hashedPass = await bcrypt.hash(password, 10);
		return hashedPass;
	} catch (error) {
		console.log(error);
	}
}

async function checkIfAdmin(req, res, next) {
	const loginData = await collection.findOne({ name: req.body.username });
	if (loginData.admin) next();
}

module.exports = { checkDetails, hashPass, checkIfAdmin };
