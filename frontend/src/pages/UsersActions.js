import React, { useState, useEffect } from "react";

import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import { EditIcon, PeopleIcon, TrashIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Pagination,
  Button,
} from "@windmill/react-ui";

function Actions({ id }) {
  return (
    <>
      <Button
        iconLeft={EditIcon}
        layout="outline"
        className="focus:shadow-outline-purple border-purple-500"
      >
        Edit
      </Button>
      <Button
        iconLeft={TrashIcon}
        layout="outline"
        className="focus:shadow-outline-red border-red-500"
      >
        Delete
      </Button>
    </>
  );
}

function UsersAction() {
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
      <PageTitle>UsersAction</PageTitle>

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

              <TableCell>Actions</TableCell>
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
                    {/* <span className="text-sm"> */}
                    {/* {new Date(user.date).toLocaleDateString()} */}
                    {/* {new Date().toLocaleDateString()}
                    </span> */}
                    <span className="flex flex-row gap-2">
                      <Actions id={user._id} />
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

export default UsersAction;
