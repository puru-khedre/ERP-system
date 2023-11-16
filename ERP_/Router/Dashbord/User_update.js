const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");
const bcrypt = require("bcrypt");
var user_id;

router.post("/user_profile/update", async (req, res) => {
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
    user_id
  } = req.body;
 
  Users.find().count(async function (err, count) {

    const encrypt_password = await bcrypt.hash(password, 10);

    console.log("user id ", user_id);
    if(user_id ==""|| user_id == undefined){
        res.send({error:"user id require"})
    }
    else{

         }


   
  });

});

module.exports = router;
