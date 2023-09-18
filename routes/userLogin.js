const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
	userController.renderHomePage(req, res);
});

module.exports = router;
