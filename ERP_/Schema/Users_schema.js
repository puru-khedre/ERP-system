const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  department: String,
  designation: String,
  address: String,
  city: String,
  state: String,
  email: String,
  phone_no_1: Number,
  phone_no_2: Number,
  blood_group: String,
  adhar_number: Number,
  driving_license: Number,
  date_of_birth: Date,
  father_name: String,
  mother_name: String,
  emergency_contact_person: String,
  emergency_contact_person_mobile: Number,
  password: String,
  confirm_password: String,
  user_id: String,
  profile_image: String,
});

module.exports = mongoose.model("users", UserSchema);
