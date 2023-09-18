function renderHomePage(req, res, message = "") {
	res.render("user-login", { message });
}

function renderSignupPage(req, res, message = "") {
	console.log("userjlasjdfl;saj");
	res.render("user-signup", { message });
}

module.exports = { renderHomePage, renderSignupPage };
