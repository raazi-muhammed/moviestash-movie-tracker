const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const dbFunction = require("../model/databaseFunction");
const homepage = require("../controllers/userHomePageController");
const omdb = require("../controllers/odmbMovies");

let userData;
router.post("/", authentication.checkDetails, async (req, res) => {
	req.session.user = req.body;
	userData = await dbFunction.getUserDetails(req.session.user.username);
	homepage.renderUserHomePage(req, res, userData);
});

router.get("/", authentication.checkDetails, async (req, res) => {
	userData = await dbFunction.getUserDetails(req.session.user.username);
	homepage.renderUserHomePage(req, res, userData);
});

router.get("/watched", async (req, res) => {
	await dbFunction.addMovieToWatched(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);
	homepage.renderUserHomePage(req, res, userData, "added to watched");
});

router.get("/un-watched", async (req, res) => {
	await dbFunction.removeMovieFromWatched(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);
	homepage.renderUserHomePage(req, res, userData, "removed from watched");
});

router.get("/later", async (req, res) => {
	await dbFunction.addMovieToLater(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);
	homepage.renderUserHomePage(req, res, userData, "added to watch later");
});

router.get("/un-later", async (req, res) => {
	await dbFunction.removeMovieFromLater(req.query.userId, req.query.movieId);
	userData = await dbFunction.getUserDetails(req.session.user.username);
	homepage.renderUserHomePage(req, res, userData, "removed from watch later");
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

router.post("/search", async (req, res) => {
	try {
		movieDetails = await omdb.searchMovie(req.body.search);
		userData = await dbFunction.getUserDetails(req.session.user.username);
		homepage.renderUserSearch(req, res, userData, movieDetails.imdbId);
	} catch (error) {
		res.redirect("/homepage");
	}
});

module.exports = router;
