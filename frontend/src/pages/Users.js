import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import { Link } from "react-router-dom";
import "./user.css";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Card,
  CardBody,
} from "@windmill/react-ui";

function Users() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 25;
  const totalResults = data.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(async () => {
    try {
      const res = await fetch("http://localhost:4000/users/userlist");

      const list = await res.json();

      setData(list.result);
      console.log(list.result[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <PageTitle>Users</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total users" value={data.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.length == 0 ? (
              <TableRow>
                <TableCell className="font-bold text-xl">Loading...</TableCell>
              </TableRow>
            ) : (
              data
                .slice((page - 1) * resultsPerPage, page * resultsPerPage)
                .map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        {/* to={`/PropertyPage/${property.property_id}`}  */}
                        <a href={`/app/users/${user.user_id}`}>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.email}
                          </p>
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.department}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{user.address}</span>
                      {/* <Badge type={user.status}>{user.status}</Badge> */}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {/* {new Date(user.date).toLocaleDateString()} */}
                        {new Date().toLocaleDateString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export function User({ match, ...props }) {
  const [user, setUser] = useState();
  const { id } = useParams();
  console.log("userid ", id);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`);
        const userData = await res.json();
        console.log("user", userData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

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
                            `http://localhost:4000` +
                              user.result?.profile_image ||
                            "https://bootdey.com/img/Content/avatar/avatar7.png"
                          }
                          alt="User"
                          className="rounded-circle"
                          width="150"
                        />
                        {console.log(
                          "image",
                          `http://localhost:4000${user.result?.profile_image}`
                        )}{" "}
                        <div className="mt-3">
                          <h4>{user ? user.result.name : "Loading..."}</h4>
                          {console.log("user name ", user.result.name)}
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
                              {user.result.department}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Designation</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.designation}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Address</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.address}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">City</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.city}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">State</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.state}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Email</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.email}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone No 1</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.phone_no_1}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Phone No 2</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.phone_no_2}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Blood Group</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.blood_group}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Aadhar Number</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.adhar_number}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Driving License</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.driving_license}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Date of Birth</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.date_of_birth}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Father's Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.father_name}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Mother's Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.mother_name}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Emergency Contact Person</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              {user.result.emergency_contact_person}
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
                              {user.result.emergency_contact_person_mobile}
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div className="col-sm-12">
                              <Link
                                className="btn btn-info"
                                target="__blank"
                                to={"edit/" + user.result.user_id}
                              >
                                Edit
                              </Link>
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

export default Users;
