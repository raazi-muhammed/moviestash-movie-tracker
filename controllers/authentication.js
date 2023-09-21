const collection = require("../config/mongodb");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController");

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
	console.log("chek if Amind");
	try {
		let userName = req.body.adminName || req.session.admin.adminName;
		let password = req.body.adminPassword || req.session.admin.adminPassword;

		const loginData = await collection.findOne({ name: userName });

		isPassCorrect = await bcrypt.compare(password, loginData.password);
		if (!isPassCorrect) throw new Error();

		if (loginData.admin) next();
		else throw new Error();
	} catch (e) {
		console.log(e);

		res.render("admin-login", { message: "Not an admin or Invalid Password" });
	}
}

module.exports = { checkDetails, hashPass, checkIfAdmin };
