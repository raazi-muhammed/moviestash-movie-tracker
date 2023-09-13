const express = require("express");
const router = express.Router();
const collection = require("../controllers/mongodb");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
	res.render("user-login");
});

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

router.post("/submit", checkDetails, async (req, res) => {
	req.session.user = req.body;
	res.redirect("/homepage");
});

module.exports = router;
