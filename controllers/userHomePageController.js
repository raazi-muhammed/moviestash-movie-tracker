const getAllMovies = require("../controllers/odmbMovies");

async function renderUserHomePage(req, res, userData, message = "") {
	const moviesId = [
		"tt3896198",
		"tt4154796",
		"tt1517268",
		"tt15398776",
		"tt9362722",
		"tt0816692",
		"tt15789038",
		"tt5971474",
	];

	moviesDetails = await getAllMovies(moviesId);

	userWatchMovies = await getAllMovies(userData.moviesWatched);
	userWantToWatchMovies = await getAllMovies(userData.moviesLater);

	res.render("user-homepage", {
		moviesDetails,
		userData,
		userWatchMovies,
		userWantToWatchMovies,
		message,
	});
}

module.exports = renderUserHomePage;
