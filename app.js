const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const PORT = process.env.PORT;

const userLogin = require("./routes/userLogin");
const userSignup = require("./routes/userSignup");
const adminLogin = require("./routes/adminLogin");
const adminDashboard = require("./routes/adminDashboard");
const userHomepage = require("./routes/userHomepage");

//view engine
app.set("view engine", "ejs");

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.use(
	session({
		secret: uuidv4(),
		resave: false,
		saveUninitialized: true,
	})
);

//static
app.use("/static", express.static(path.join(__dirname, "/public")));

//back button to homepage
app.use(function (req, res, next) {
	res.set(
		"Cache-Control",
		"no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
	);
	next();
});

/* Home Page */
app.get("/", (req, res) => {
	req.session.user ? res.redirect("/homepage") : res.redirect("/login");
});

//router
app.use("/login", userLogin);
app.use("/signup", userSignup);
app.use("/admin", adminLogin);
app.use("/admin/dashboard", adminDashboard);
app.use("/homepage", userHomepage);
app.use("*", (req, res) => {
	req.session.user ? res.redirect("/homepage") : res.redirect("/login");
});

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
