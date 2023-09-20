const collection = require("../model/mongodb");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController");
const { displayAdminLogin } = require("./adminController");

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
		userController.renderHomePage(req, res, "Incorrect Password");
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
		let password = req.body.password || req.session.admin.password;

		const loginData = await collection.findOne({ name: userName });

		isPassCorrect = await bcrypt.compare(password, loginData.password);
		if (!isPassCorrect) throw new Error();

		if (loginData.admin) next();
		else throw new Error();
	} catch (e) {
		displayAdminLogin(req, res, "Not an Admin or Invalid Credentials");
	}
}

module.exports = { checkDetails, hashPass, checkIfAdmin };
