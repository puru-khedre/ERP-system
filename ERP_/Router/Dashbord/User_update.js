const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Users = require("../../Schema/Users_schema");
const bcrypt = require("bcrypt");
var user_id;
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/Images"),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const PropertyImages = multer({
  storage: storage,
}).fields([{ name: "property_images", maxCount: 10 }]);

function uniqid() {
  return new Date().getTime() + Math.random().toString(16).slice(2);
}

router.post("/update/:id", PropertyImages, async (req, res) => {
  console.log("puru");
  try {
    const userId = req.params.id;

    const updatedUser = await Users.findOneAndUpdate(
      { user_id: userId },
      { $set: req.body },
      { new: true }
    );

    if (updatedUser) {
      res.send({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error in update endpoint:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/puru/:id", (req, res) => {
  console.log(req.params);
  res.send("hello");
});

// router.
module.exports = router;
