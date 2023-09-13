const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

router.get("/", (req, res) => {
	res.render("admin-login");
});

router.post(
	"/submit",
	authentication.checkDetails,
	authentication.checkIfAdmin,
	(req, res) => {
		console.log("hi");
		res.redirect("/admin/dashboard");
	}
);

module.exports = router;
