const collection = require("../model/mongodb");
const bcrypt = require("bcrypt");
const renderHomePage = require("../controllers/userController");

async function checkDetails(req, res, next) {
	try {
		let userName = req.body.username || req.session.user.username;
		let password = req.body.password || req.session.user.password;

		const loginData = await collection.findOne({
			name: userName,
		});
		isPassCorrect = await bcrypt.compare(password, loginData.password);
		if (isPassCorrect) next();
		else throw new Error("New error");
	} catch (error) {
		renderHomePage(req, res, "Incorrect Password");
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
	try {
		let userName = req.body.username || req.session.admin.username;
		const loginData = await collection.findOne({ name: userName });
		if (loginData.admin) next();
		else throw new Error();
	} catch (error) {
		res.redirect("/admin");
	}
}

module.exports = { checkDetails, hashPass, checkIfAdmin };
