const collection = require("../model/mongodb");
const authentication = require("../controllers/authentication");
const dbFunction = require("../model/databaseFunction");

async function displayUsers(req, res) {
	const allUsers = await dbFunction.getAllUserDetails();
	res.render("admin-dashboard", { allUsers });
}
async function deleteUser(req, res) {
	await collection.deleteOne({ _id: req.query.id });
	res.redirect("/admin/dashboard");
}
async function editUser(req, res) {
	const userToEdit = await collection.find({ _id: req.query.id });
	res.render("admin-user-edit", { userToEdit });
}
async function editUserSubmit(req, res) {
	const updating = await collection.findOneAndUpdate(
		{ _id: req.query.id },
		{
			name: req.body.username,
			email: req.body.email,
			age: req.body.age,
			gender: req.body.gender,
			admin: req.body.admin,
			profilePic: req.body.profilePic,
		},
		{ upsert: false }
	);
	res.redirect("/admin/dashboard");
}
async function createUserSubmit(req, res) {
	hashedPass = await authentication.hashPass(req.body.password);
	const userData = {
		name: req.body.username,
		password: hashedPass,
		email: req.body.email,
		age: req.body.age,
		gender: req.body.gender,
		profilePic:
			req.body.profilePic ||
			"https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg",
		admin: req.body.admin || false,
	};

	await collection.insertMany([userData]);
	res.redirect("/admin/dashboard");
}

async function searchAndDisplay(req, res) {
	const allUsers = await dbFunction.getSpecificUsersDetails(req.body.search);
	res.render("admin-dashboard", { allUsers });
}

module.exports = {
	displayUsers,
	deleteUser,
	editUser,
	editUserSubmit,
	createUserSubmit,
	searchAndDisplay,
};
