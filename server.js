const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportAt = require("passport");

const users = require("./routes/api/users");
const atUsers = require("./routes/api/atUser");
const applications = require("./routes/api/applications");
const atApplications = require("./routes/api/atApplications");
const certificate = require("./routes/api/certificate");

const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/atUser", atUsers);
app.use("/api/applications", applications);
app.use("/api/atApplications", atApplications);
app.use("/api/certificate", certificate);

app.use(passport.initialize());
app.use(passport.session());

app.use(passportAt.initialize());
app.use(passportAt.session());

app.use('./client/src/uploads', express.static(process.cwd() + './client/src/uploads'));

require('./config/passport')(passport);
require('./config/passport')(passportAt);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
