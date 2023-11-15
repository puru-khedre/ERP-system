require("dotenv").config();

const express = require("express");

const port = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const Ragistration = require("./Router/Authetication/Ragistration");
const Login = require("./Router/Authetication/Login");
const UserList = require("./Router/Dashbord/UserList");
const UserDetails = require("./Router/Dashbord/UserDetails");

const jwt = require("jsonwebtoken");
const authCheck = require("./middleware/authCheck");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(Ragistration);
app.use(Login);

app.use(UserList);
app.use(UserDetails);

const url = `mongodb+srv://Erp:1234@atlascluster.brub2yo.mongodb.net/erp?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
