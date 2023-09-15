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

module.exports = { getUserDetails, getAllUserDetails, getSpecificUsersDetails };
