import React, { useState, useEffect } from "react";

import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
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
            {data
              .slice((page - 1) * resultsPerPage, page * resultsPerPage)
              .map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <a href="/app/users/pk">
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
              ))}
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

  useEffect(async () => {
    try {
      const res = await fetch("http://localhost:4000/users/userlist");
    } catch (error) {}
  }, []);

  return (
    <Card className="mt-8">
      <CardBody>
        <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
          Revenue
        </p>
        <code className="text-gray-600 dark:text-gray-400">{}</code>
      </CardBody>
    </Card>
  );
}

export default Users;
