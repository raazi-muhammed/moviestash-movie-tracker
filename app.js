const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const PORT = 3000;

const userLogin = require("./routes/userLogin");
const userSignup = require("./routes/userSignup");
const adminLogin = require("./routes/adminLogin");
const adminDashboard = require("./routes/adminDashboard");
const userHomepage = require("./routes/userHomepage");

app.get("/", (req, res) => {
	res.send("Home Page");
});

//view engine
app.set("view engine", "ejs");

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static
app.use("/static", express.static(path.join(__dirname, "/public")));

//router
app.use("/login", userLogin);
app.use("/signup", userSignup);
app.use("/admin", adminLogin);
app.use("/admin/dashboard", adminDashboard);
app.use("/homepage", userHomepage);

app.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});
