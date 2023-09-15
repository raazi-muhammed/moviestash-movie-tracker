const collection = require("../model/mongodb");

async function getUserDetails(nameToFind) {
	const loginData = await collection.findOne({ name: nameToFind });
	console.log(loginData);
	return loginData;
}

async function getAllUserDetails() {
	const loginData = await collection.find({});
	console.log(loginData);
	return loginData;
}

async function getSpecificUsersDetails(filter) {
	let condition = [{ name: { $regex: filter } }, { email: { $regex: filter } }];

	const loginData = await collection.find({ $or: condition });
	console.log(loginData);
	return loginData;
}

async function addMovieToWatched(userId, movieId) {
	const updating = await collection.findOneAndUpdate(
		{ _id: userId },
		{ $addToSet: { moviesWatched: movieId } }
	);
}

async function removeMovieFromWatched(userId, movieId) {
	const updating = await collection.findOneAndUpdate(
		{ _id: userId },
		{ $pull: { moviesWatched: movieId } }
	);
}

async function addMovieToLater(userId, movieId) {
	const updating = await collection.findOneAndUpdate(
		{ _id: userId },
		{ $addToSet: { moviesLater: movieId } }
	);
}

async function removeMovieFromLater(userId, movieId) {
	const updating = await collection.findOneAndUpdate(
		{ _id: userId },
		{ $pull: { moviesLater: movieId } }
	);
}

module.exports = {
	getUserDetails,
	getAllUserDetails,
	getSpecificUsersDetails,
	addMovieToWatched,
	removeMovieFromWatched,
	addMovieToLater,
	removeMovieFromLater,
};
