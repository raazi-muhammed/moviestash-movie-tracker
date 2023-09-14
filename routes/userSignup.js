const express = require("express");
const router = express.Router();
const collection = require("../model/mongodb");
const authentication = require("../controllers/authentication");

router.get("/", (req, res) => {
	res.render("user-signup");
});

router.post("/submit", async (req, res) => {
	console.log("submit data: " + req.body);
	hashedPass = await authentication.hashPass(req.body.password);
	const userData = {
		name: req.body.username,
		password: hashedPass,
		email: req.body.email,
		age: req.body.age,
		gender: req.body.gender,
		admin: false,
	};
	await collection.insertMany([userData]);
	res.redirect("/homepage");
});

module.exports = router;
