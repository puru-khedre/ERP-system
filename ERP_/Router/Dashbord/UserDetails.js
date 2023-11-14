const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");


router.get("/users/:id", async (req, res) => {
    const userDetials = await Users.findOne({user_id:req.params.id})
    console.log('user details',userDetials)
    if(userDetials == null || userDetials == undefined){
      res.send({error:"user Not Found"})
    }
    else{
        res.send({result:userDetials})
    }
   });
  module.exports = router;