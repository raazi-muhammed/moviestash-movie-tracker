const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

router.get("/", (req, res) => {
	res.render("user-login");
});

router.post("/submit", authentication.checkDetails, async (req, res) => {
	req.session.user = req.body;
	res.redirect("/homepage");
});

module.exports = router;
