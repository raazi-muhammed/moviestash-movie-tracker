const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const PORT = 3000;

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

/* Home Page */
app.get("/", (req, res) => {
	console.log("home: " + req.session.user);

	if (req.session.user) res.redirect("/homepage");
	else res.redirect("/login");
	/* res.send(req.session.user); */
});

//router
app.use("/login", userLogin);
app.use("/signup", userSignup);
app.use("/admin", adminLogin);
app.use("/admin/dashboard", adminDashboard);
app.use("/homepage", userHomepage);

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
