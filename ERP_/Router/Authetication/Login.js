const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("email ", email, password);
  const userDetail = await Users.findOne({ email: email });
  if (!userDetail) {
    res.send({ error: "User not present" });
    return;
  }

  console.log(userDetail);
  const password_compare = await bcrypt.compare(password, userDetail.password);

  console.log("checkkk password ", password_compare);

  if (userDetail) {
    if (password_compare) {
      res.send(userDetail);
      // const token = jwt.sign(
      //   { user_id: user._id, email },
      //   process.env.TOKEN_KEY,
      //   {
      //     expiresIn: "2h",
      //   }
      // );
    } else {
      res.send({ error: "invaild Password" });
    }
  } else {
    res.send({ error: "user is not exist" });
  }
});
module.exports = router;
