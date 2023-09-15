const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const renderHomePage = require("../controllers/userController");

router.get("/", (req, res) => {
	renderHomePage(req, res);
});

module.exports = router;
