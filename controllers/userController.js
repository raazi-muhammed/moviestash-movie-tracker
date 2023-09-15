function renderHomePage(req, res, message = "") {
	res.render("user-login", { message });
}

module.exports = renderHomePage;
