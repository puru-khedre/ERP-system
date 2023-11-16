// usersRouter.js
const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");

router.delete("/users/user_delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Users.findOne({ user_id: userId });

    if (!user) {
      res.status(404).send({ error: "User Not Found" });
      return;
    }

    // Delete the user
    const userDetails = await Users.findOneAndDelete({ user_id: userId });
    console.log("user details", userDetails);

    res.send({ result: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
