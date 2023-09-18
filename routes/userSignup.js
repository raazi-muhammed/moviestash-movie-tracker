const express = require("express");
const router = express.Router();
const collection = require("../model/mongodb");
const authentication = require("../controllers/authentication");
const dbFunction = require("../model/databaseFunction");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
	userController.renderSignupPage(req, res);
});

function confirmPassword(req, res, next) {
	console.log(req.body.cPassword + req.body.password);
	if (req.body.cPassword === req.body.password) next();
	else userController.renderSignupPage(req, res, "Passwords doesn't match");
}

router.post("/submit", confirmPassword, async (req, res) => {
	req.session.user = req.body;

	let user = await dbFunction.getUserDetails(req.body.username);
	if (!user) {
		hashedPass = await authentication.hashPass(req.body.password);
		const userData = {
			name: req.body.username,
			password: hashedPass,
			email: req.body.email,
			age: req.body.age,
			gender: req.body.gender,
			profilePic:
				"https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg",
			admin: false,
		};
		await collection.insertMany([userData]);
		res.redirect("/homepage");
	} else userController.renderSignupPage(req, res, "User already Exists");
});

module.exports = router;
