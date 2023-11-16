const express = require("express");
const router = express.Router();
const Users = require("../../Schema/Users_schema");


router.get("/users/user_delete/:id", async (req, res) => {
    // const userDetials = await Users.findOne({user_id:req.params.id})
    const userDetials = await Users.deleteOne({user_id:req.params.id})
    console.log('user details',userDetials)
    if(userDetials?.deletedCount == 0){
      res.send({error:"user Not Found"})
    }
    else{
        res.send({result:"user delete successfully"})
    }
   });
  module.exports = router;