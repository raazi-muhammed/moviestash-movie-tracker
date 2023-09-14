const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const getAllMovies = require("../controllers/odmbMovies");

router.get("/", async (req, res) => {
	console.log("user home pages");
	const moviesId = [
		"tt3896198",
		"tt4154796",
		"tt1517268",
		"tt15398776",
		"tt9362722",
		"tt0816692",
	];

	moviesDetails = await getAllMovies(moviesId);
	//console.log("movieDetails: " + moviesDetails);
	console.log("user seesion: " + req.session.user.username);
	res.render("user-homepage", { moviesDetails });
});

router.get("/logout", (req, res) => {
	console.log("Log Out");
	req.session.destroy();

	res.redirect("/");
});

module.exports = router;
