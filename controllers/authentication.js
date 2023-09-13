const collection = require("../model/mongodb");
const bcrypt = require("bcrypt");

async function checkDetails(req, res, next) {
	console.log(req.body);
	try {
		const loginData = await collection.findOne({ name: req.body.username });

		console.log("loginData: " + loginData.password);
		console.log("reqpass: " + req.body.password);

		isPassCorrect = await bcrypt.compare(req.body.password, loginData.password);
		console.log(isPassCorrect);

		if (isPassCorrect) {
			console.log("correct pass");
			next();
		} else {
			console.log("else working");
			throw new Error("New error");
		}
	} catch (error) {
		console.log("Incorrect pass");
		res.redirect("/login");
	}
}

async function hashPass(password) {
	try {
		const hashedPass = await bcrypt.hash(password, 10);
		console.log(hashedPass);
		return hashedPass;
	} catch (error) {
		console.log(error);
	}
}

async function checkIfAdmin(req, res, next) {
	const loginData = await collection.findOne({ name: req.body.username });
	console.log("admin BOOl: " + loginData.admin);

	if (loginData.admin) {
		console.log("Addmin get");
		next();
	}
	return loginData.admin;
}

module.exports = { checkDetails, hashPass, checkIfAdmin };
