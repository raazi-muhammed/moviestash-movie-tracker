const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const dbFunction = require("../controllers/databaseFunction");
const renderUserHomePage = require("../controllers/userHomePageController");

let userData;
router.post("/", authentication.checkDetails, async (req, res) => {
	req.session.user = req.body;

	//console.log(req.session.user.username);
	userData = await dbFunction.getUserDetails(req.session.user.username);
	//console.log(userData);

	renderUserHomePage(req, res, userData);
});

router.get("/", authentication.checkDetails, async (req, res) => {
	//console.log(req.session.user.username);

	userData = await dbFunction.getUserDetails(req.session.user.username);

	//console.log(userData);

	renderUserHomePage(req, res, userData);
});

router.get("/watched", async (req, res) => {
	await dbFunction.addMovieToWatched(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);

	renderUserHomePage(req, res, userData, "added to watched");
});

router.get("/un-watched", async (req, res) => {
	await dbFunction.removeMovieFromWatched(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);

	renderUserHomePage(req, res, userData, "removed from watched");
});

router.get("/later", async (req, res) => {
	await dbFunction.addMovieToLater(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);

	renderUserHomePage(req, res, userData, "added to watch later");
});

router.get("/un-later", async (req, res) => {
	await dbFunction.removeMovieFromLater(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);

	renderUserHomePage(req, res, userData, "removed from watch later");
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

module.exports = router;
