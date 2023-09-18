require("dotenv").config();

const API_KEY = process.env.ODMB_API_KEY;

async function getMovie(movieId) {
	try {
		const response = await fetch(
			`http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
		);
		const data = await response.json();

		if (data.Response === "True") {
			const obj = {
				poster: data.Poster,
				title: data.Title,
				imdbId: movieId,
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

async function searchMovie(name) {
	try {
		const response = await fetch(
			`http://www.omdbapi.com/?t=${name}&apikey=${API_KEY}`
		);
		const data = await response.json();

		if (data.Response === "True") {
			const obj = {
				poster: data.Poster,
				title: data.Title,
				imdbId: data.imdbID,
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
		moviesDetails.push(await getMovie(moviesId[key]));
	}
	return moviesDetails;
}

module.exports = { getAllMovies, searchMovie };
