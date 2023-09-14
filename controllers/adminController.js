const collection = require("../model/mongodb");
const authentication = require("../controllers/authentication");

async function displayUsers(req, res) {
	const allUsers = await collection.find({});
	console.log(allUsers);

	res.render("admin-dashboard", { allUsers });
}
async function deleteUser(req, res) {
	console.log("deleting id: " + req.query.id);

	await collection.deleteOne({ _id: req.query.id });

	res.redirect("/admin/dashboard");
}
async function editUser(req, res) {
	console.log("editing id: " + req.query.id);
	const userToEdit = await collection.find({ _id: req.query.id });
	console.log(userToEdit);

	res.render("admin-user-edit", { userToEdit });
}
async function editUserSubmit(req, res) {
	console.log("updating id: " + req.query.id);
	console.log(req.body);
	const updating = await collection.findOneAndUpdate(
		{ _id: req.query.id },
		{
			name: req.body.username,
			email: req.body.email,
			age: req.body.age,
			gender: req.body.gender,
			admin: req.body.admin,
		},
		{ upsert: false }
	);
	res.redirect("/admin/dashboard");
}
async function createUserSubmit(req, res) {
	console.log("creating new data: " + req.body);
	hashedPass = await authentication.hashPass(req.body.password);
	const userData = {
		name: req.body.username,
		password: hashedPass,
		email: req.body.email,
		age: req.body.age,
		gender: req.body.gender,
		admin: req.body.admin,
	};

	await collection.insertMany([userData]);
	console.log("creating");
	res.redirect("/admin/dashboard");
}

module.exports = {
	displayUsers,
	deleteUser,
	editUser,
	editUserSubmit,
	createUserSubmit,
};
