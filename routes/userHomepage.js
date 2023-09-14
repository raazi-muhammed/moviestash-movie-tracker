const express = require("express");
const router = express.Router();

async function getMovie(movieId) {
	try {
		const response = await fetch(
			`http://www.omdbapi.com/?i=${movieId}&apikey=81141d43`
		);
		const data = await response.json();

		if (data.Response === "True") {
			console.log(data.Poster + " " + data.Title);
			const obj = {
				poster: data.Poster,
				title: data.Title,
			};
			return obj;
		} else {
			console.error("Movie not found");
			return null;
		}
	} catch (error) {
		console.error("Error fetching movie data:", error);
		return null;
	}
}

async function getAllMovies(moviesId) {
	let moviesDetails = [];
	for (const key in moviesId) {
		console.log("movie all move:" + (await getMovie(moviesId[key])));
		moviesDetails.push(await getMovie(moviesId[key]));
	}
	console.log(moviesDetails);
	return moviesDetails;
}

router.get("/", async (req, res) => {
	console.log("user home pages");
	const moviesId = ["tt3896198", "tt4154796", "tt1517268", "tt15398776"];
	// getMovies("tt3896198");
	// getMovies("tt4154796");
	// getMovies("tt1517268");
	// getMovies("tt15398776");

	moviesDetails = await getAllMovies(moviesId);
	console.log("moviesdEtail: " + moviesDetails);
	res.render("user-homepage", { moviesDetails });
});

router.get("/logout", (req, res) => {
	console.log("Log Out");
	req.session.destroy();

	res.redirect("/");
});

module.exports = router;
