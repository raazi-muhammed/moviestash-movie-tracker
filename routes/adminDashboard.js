const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { checkIfAdmin } = require("../controllers/authentication");

router.get("/", checkIfAdmin, (req, res) => {
	adminController.displayUsers(req, res);
});

router.get("/delete", (req, res) => {
	adminController.deleteUser(req, res);
});

router.get("/edit", (req, res) => {
	adminController.editUser(req, res);
});

router.post("/edit/submit", (req, res) => {
	adminController.editUserSubmit(req, res);
});

router.get("/create", (req, res) => {
	res.render("admin-user-create");
});

router.post("/create/submit", (req, res) => {
	adminController.createUserSubmit(req, res);
});

router.post("/search", (req, res) => {
	adminController.searchAndDisplay(req, res);
});

router.get("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/admin");
});

module.exports = router;
