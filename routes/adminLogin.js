const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

router.get("/", (req, res) => {
	if (req.session.admin) res.redirect("/admin/dashboard");
	else res.render("admin-login");
});

router.post("/submit", authentication.checkIfAdmin, (req, res) => {
	req.session.admin = req.body;
	res.redirect("/admin/dashboard");
});

module.exports = router;
