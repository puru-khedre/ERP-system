import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Button, Input, Select } from "@windmill/react-ui";
import "./Create.css";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone_no_1: "",
    phone_no_2: "",
    blood_group: "",
    adhar_number: "",
    driving_license: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",
    emergency_contact_person: "",
    emergency_contact_person_mobile: "",
    password: "",
    confirm_password: "",
    PropertyImages: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setFormData(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User data updated successfully");
        // Optionally, you can redirect the user or perform other actions
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Registration Form</h3>
            </div>
            <div className="form-body">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  pattern="^[A-Za-z]+\s[A-Za-z]+$"
                  title="please Enter name in 'First Last' format"
                  required
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  required
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="phone_no_1">Phone 1</label>
                <input
                  type="tel"
                  name="phone_no_1"
                  id="phone_no_1"
                  required
                  maxLength="10"
                  value={formData.phone_no_1}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone_no_2">Phone 2</label>
                <input
                  type="tel"
                  name="phone_no_2"
                  maxLength="10"
                  id="phone_no_2"
                  value={formData.phone_no_2}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="department">Department Name</label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  required
                  placeholder="Name of Department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="designation">Designation</label>
                <select
                  name="designation"
                  id="designation"
                  required
                  value={formData.designation}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Designation
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  required
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="blood_group">Blood group</label>
                <input
                  type="text"
                  name="blood_group"
                  required
                  id="blood_group"
                  value={formData.blood_group}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="adhar_number">Aadhar Number</label>
                <input
                  type="number"
                  maxLength="12"
                  required
                  name="adhar_number"
                  id="adhar_number"
                  value={formData.adhar_number}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="driving_license">Driving License</label>
                <input
                  type="number"
                  name="driving_license"
                  required
                  id="driving_license"
                  value={formData.driving_license}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  required
                  id="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="father_name">Father's name</label>
                <input
                  type="text"
                  name="father_name"
                  required
                  id="father_name"
                  value={formData.father_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="mother_name">Mother's name</label>
                <input
                  type="text"
                  name="mother_name"
                  required
                  id="mother_name"
                  value={formData.mother_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="emergency_contact_person">
                  Emergency Contact Person
                </label>
                <input
                  type="text"
                  required
                  name="emergency_contact_person"
                  id="emergency_contact_person"
                  value={formData.emergency_contact_person}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="emergency_contact_person_mobile">
                  Emergency Contact Number
                </label>
                <input
                  type="tel"
                  required
                  name="emergency_contact_person_mobile"
                  id="emergency_contact_person_mobile"
                  value={formData.emergency_contact_person_mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="property_images">Property Images</label>
                <Input
                  type="file"
                  name="property_images"
                  id="property_images"
                  onChange={handleInputChange}
                  accept=".jpg, .jpeg, .png"
                />
              </div>

              <div>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
