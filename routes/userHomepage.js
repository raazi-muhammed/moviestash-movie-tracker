const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const dbFunction = require("../controllers/databaseFunction");
const renderUserHomePage = require("../controllers/userHomePageController");

router.post("/", authentication.checkDetails, async (req, res) => {
	req.session.user = req.body;

	//console.log(req.session.user.username);
	let userData = await dbFunction.getUserDetails(req.session.user.username);
	//console.log(userData);

	renderUserHomePage(req, res, userData);
});

router.get("/", authentication.checkDetails, async (req, res) => {
	//console.log(req.session.user.username);

	let userData = await dbFunction.getUserDetails(req.session.user.username);

	//console.log(userData);

	renderUserHomePage(req, res, userData);
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

module.exports = router;
