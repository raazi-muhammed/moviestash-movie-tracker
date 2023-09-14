const collection = require("../model/mongodb");

async function getUserDetails(nameToFind) {
	const loginData = await collection.findOne({ name: nameToFind });
	console.log(loginData);
	return loginData;
}

module.exports = { getUserDetails };
