const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");

router.get("/users/userlist", async (req, res) => {
  const userList = await Users.find();
  console.log("user list data ", userList);
  if (userList.length == 0) {
    res.send({ error: "Not found" });
  } else {
    res.send({ result: userList });
  }
});

module.exports = router;
