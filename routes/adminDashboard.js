const express = require("express");
const router = express.Router();
const collection = require("../model/mongodb");

router.get("/", async (req, res) => {
	const allUsers = await collection.find({});
	console.log(allUsers);

	res.render("admin-dashboard", { allUsers });
});

router.get("/delete", async (req, res) => {
	console.log("deleting id: " + req.query.id);

	await collection.deleteOne({ _id: req.query.id }); // returns {deletedCount: 1}

	res.redirect("/admin/dashboard");
});

module.exports = router;
