const omdb = require("../controllers/odmbMovies");

async function renderUserHomePage(req, res, userData, message = "") {
	const moviesId = [
		"tt3896198",
		"tt4154796",
		"tt1517268",
		"tt15398776",
		"tt9362722",
		"tt0816692",
	];

	moviesDetails = await omdb.getAllMovies(moviesId);
	userWatchMovies = await omdb.getAllMovies(userData.moviesWatched);
	userWantToWatchMovies = await omdb.getAllMovies(userData.moviesLater);

	res.render("user-homepage", {
		moviesDetails,
		userData,
		userWatchMovies,
		userWantToWatchMovies,
		message,
	});
}

async function renderUserSearch(req, res, userData, moviesId) {
	//const moviesId = moviesId;
	moviesId = [moviesId];
	moviesDetails = await omdb.getAllMovies(moviesId);
	//userWatchMovies = await omdb.getAllMovies(userData.moviesWatched);
	//userWantToWatchMovies = await omdb.getAllMovies(userData.moviesLater);
	userWatchMovies = "";
	userWantToWatchMovies = "";
	message = "";

	res.render("user-homepage", {
		moviesDetails,
		userData,
		userWatchMovies,
		userWantToWatchMovies,
		message,
	});
}

module.exports = { renderUserHomePage, renderUserSearch };
