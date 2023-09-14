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

async function getAllMovies(moviesId) {
	let moviesDetails = [];
	for (const key in moviesId) {
		console.log("movie all move:" + (await getMovie(moviesId[key])));
		moviesDetails.push(await getMovie(moviesId[key]));
	}
	console.log(moviesDetails);
	return moviesDetails;
}

module.exports = getAllMovies;
