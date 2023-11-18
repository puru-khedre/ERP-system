const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

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

router.post("/auth/signup", PropertyImages, async (req, res) => {
  try {
    const {
      name,
      department,
      designation,
      address,
      city,
      state,
      email,
      phone_no_1,
      phone_no_2,
      blood_group,
      adhar_number,
      driving_license,
      date_of_birth,
      father_name,
      mother_name,
      emergency_contact_person,
      emergency_contact_person_mobile,
      password,
      confirm_password,
      // user_id,
    } = req.body;

    const filePath = req.files.property_images
      .map((file) => file.path)[0]
      .split("public")[1];
    console.log("Incoming Request Data:", req.body);

    Users.find().count(async function (err, count) {
      console.log("Number of docs: ", count);
      const user_id = count;

      const encrypt_password = await bcrypt.hash(password, 10);

      console.log("user id ", user_id);

      const user_exist = await Users.findOne({ email: email });

      if (user_exist) {
        res.send({ error: "The Email is already in use !" });
      } else {
        if (name == undefined || name == "") {
          res.send({ error: "name Required" });
        } else if (department == undefined || department == "") {
          res.send({ error: "department Required" });
        } else if (designation == undefined || designation == "") {
          res.send({ error: "designation Required" });
        } else if (address == undefined || address == "") {
          res.send({ error: "address Required" });
        } else if (city == undefined || city == "") {
          res.send({ error: "city Required" });
        } else if (state == undefined || state == "") {
          res.send({ error: "state Required" });
        } else if (phone_no_1 == undefined || phone_no_2 == "") {
          res.send({ error: "phone No Required" });
        }
        // else if(phone_no_2 == undefined || phone_no_2 ==""){
        //     res.send({error:'phone No Required'})
        // }
        else if (blood_group == undefined || blood_group == "") {
          res.send({ error: "blood group Required" });
        } else if (adhar_number == undefined || adhar_number == "") {
          res.send({ error: "ahdar No. Required" });
        } else if (driving_license == undefined || driving_license == "") {
          res.send({ error: "Driving License Required" });
        } else if (date_of_birth == undefined || date_of_birth == "") {
          res.send({ error: "date of birth Required" });
        } else if (father_name == undefined || father_name == "") {
          res.send({ error: "father name Required" });
        } else if (mother_name == undefined || mother_name == "") {
          res.send({ error: "Mother name Required" });
        } else if (
          emergency_contact_person == undefined ||
          (emergency_contact_person == "" &&
            emergency_contact_person_mobile == undefined) ||
          emergency_contact_person_mobile == ""
        ) {
          res.send({ error: "emergency contact  Required" });
        }
        // for the property images
        else if (
          req?.files?.property_images == undefined ||
          req?.files?.property_images.length == 0
        ) {
          res.send({ error: "property images Required" });
        }

        //     else if(emergency_contact_person_mobile == undefined || emergency_contact_person_mobile ==""){
        //       res.send({error:'Date of birth Required'})
        //   }
        else if (password == undefined || password == "") {
          res.send({ error: "password Required" });
        } else if (confirm_password == undefined || confirm_password == "") {
          res.send({ error: "confirm password Required" });
        }
        const userDetail = {
          name: name,
          department: department,
          designation: designation,
          address: address,
          city: city,
          state: state,
          email: email,
          phone_no_1: phone_no_1,
          phone_no_2: phone_no_2,
          blood_group: blood_group,
          adhar_number: adhar_number,
          driving_license: driving_license,
          date_of_birth: date_of_birth,
          father_name: father_name,
          mother_name: mother_name,
          emergency_contact_person: emergency_contact_person,
          emergency_contact_person_mobile: emergency_contact_person_mobile,
          password: encrypt_password,
          confirm_password: confirm_password,
          profile_image: filePath,
          user_id: user_id,
        };
        console.log("User Detail:", userDetail);

        Users.create(userDetail, (err, result) => {
          if (err) {
            console.error("Error creating user:", err);
            res.status(500).send({ error: "Internal Server Error" });
          } else {
            console.log("User Created Successfully");
            res.send({ message: "User Created Successfully" });
          }
        });
      }
    });
  } catch (error) {
    console.error("Error in signup endpoint:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
