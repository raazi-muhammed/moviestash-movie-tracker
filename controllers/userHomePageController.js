const getAllMovies = require("../controllers/odmbMovies");

async function renderUserHomePage(req, res, userData) {
	const moviesId = [
		"tt3896198",
		"tt4154796",
		"tt1517268",
		"tt15398776",
		"tt9362722",
		"tt0816692",
		"tt15789038",
	];

	moviesDetails = await getAllMovies(moviesId);
	res.render("user-homepage", { moviesDetails, userData });
}

module.exports = renderUserHomePage;
