const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

router.get("/", (req, res) => {
	res.render("user-login");
});

module.exports = router;
