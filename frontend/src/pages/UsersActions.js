// UsersAction.js
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

  const handleDelete = async (user_id) => {
    try {
      const res = await fetch(`http://localhost:4000/users/user_delete/${user_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the deleted user from the data array
        setData((prevData) => prevData.filter((user) => user.user_id !== user_id));
      } else {
        console.error("Delete request failed with status:", res.status);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  useEffect(async () => {
    try {
      const res = await fetch("http://localhost:4000/users/userlist");
      const list = await res.json();

      setData(list.result);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  }, []);

  return (
    <>
      <PageTitle>UsersAction</PageTitle>

      {/* Cards */}
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
                      <a href={`/app/users/pk/${user.user_id}`}>
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
                    <span className="flex flex-row gap-2">
                      <Button
                        iconLeft={TrashIcon}
                        layout="outline"
                        className="focus:shadow-outline-red border-red-500"
                        onClick={() => handleDelete(user.user_id)}
                      >
                        Delete
                      </Button>
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
