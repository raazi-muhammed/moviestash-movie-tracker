const express = require("express");
const router = express.Router();
const collection = require("../controllers/mongodb");
const bcrypt = require("bcrypt");

async function hashPass(password) {
	try {
		const hashedPass = await bcrypt.hash(password, 10);
		console.log(hashedPass);
		return hashedPass;
	} catch (error) {
		console.log(error);
	}
}

router.get("/", (req, res) => {
	res.render("user-signup");
});

router.post("/submit", async (req, res) => {
	console.log(req.body);
	hashedPass = await hashPass(req.body.password);
	const userData = {
		name: req.body.username,
		password: hashedPass,
		email: req.body.email,
	};
	await collection.insertMany([userData]);

	res.send(userData);
});

module.exports = router;
