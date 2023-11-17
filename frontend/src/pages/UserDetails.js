import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function UserDetails() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
    console.log({ u });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            {user && (
              <>
                <div className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={
                            `http://localhost:4000` + user.profile_image ||
                            "https://bootdey.com/img/Content/avatar/avatar7.png"
                          }
                          alt="User"
                          className="rounded-circle"
                          width="150"
                        />
                        {console.log(
                          "image",
                          `http://localhost:4000${user.profile_image}`
                        )}{" "}
                        <div className="mt-3">
                          <h4>{user ? user.name : "Loading..."}</h4>
                          {console.log("user name ", user.name)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      {/* Display user information */}
                      {user && (
                        <>
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Department</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.department}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Designation</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.designation}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Address</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.address}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">City</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.city}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">State</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.state}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.email}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone No 1</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.phone_no_1}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone No 2</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.phone_no_2}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Blood Group</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.blood_group}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Aadhar Number</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.adhar_number}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Driving License</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.driving_license}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Date of Birth</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.date_of_birth}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Father's Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.father_name}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Mother's Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.mother_name}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Emergency Contact Person</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.emergency_contact_person}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">
                                Emergency Contact Person Mobile
                              </h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.emergency_contact_person_mobile}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                             <NavLink to='/Edit'><a
                                className="btn btn-info"
                                target="__blank"
                            
                              >
                                Edit
                              </a></NavLink> 
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
