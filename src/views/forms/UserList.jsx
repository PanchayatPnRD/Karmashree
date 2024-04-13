import { useState, useEffect, useMemo } from "react";
import { baseURL } from "../../WebApi/WebApi";
import { Table, Pagination } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TablePagination } from "../../components/DataTable";
import axios from "axios";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [startIndex, endIndex] = useMemo(() => {
    const start = (currentPage - 1) * 5;
    const end = currentPage * 5;

    return [start, end];
  }, [currentPage]);
  // Queries
  const { data: userlist } = useQuery({
    queryKey: ["userlist"],
    queryFn: async () => {
      const data = await axios.get(
        "http://43.239.110.159:8094/api/user/getUserList?created_by=1"
      );

      return data.data.result.data;
    },
  });

  const { data: departmentList } = useQuery({
    queryKey: ["departmentList"],
    queryFn: async () => {
      const data = await axios.get(
        "http://43.239.110.159:8094/api/mastertable/getDepatmentlist"
      );
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const { data: designationList } = useQuery({
    queryKey: ["designationList"],
    queryFn: async () => {
      const data = await axios.get(
        "http://43.239.110.159:8094/api/mastertable/DesignationList"
      );
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  // Mutations

  const HeadData = [
    "department",
    "office name",
    "district",
    "sub division",
    "block",
    "officer designation",
    "phone",
    "status",
  ];
  return (
    <>
      <div className="bg-white rounded-lg p-12">
        <div id="breadcrumb-starts-here" className="shadow-md -mb-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4 px-4 py-2">
                  {" "}
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1.5em"
                  >
                    <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
                  </svg>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Home
                    </a>
                    /
                  </li>
                  <li className="text-gray-500 font-bold" aria-current="page">
                    Work Allocation
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-8 px-12">
        <Table className="">
          <Table.Head>
            <Table.HeadCell className="capitalize">sl no</Table.HeadCell>
            {HeadData.map((e) => (
              <Table.HeadCell className="capitalize">{e}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {userlist
              ?.slice(
                startIndex,
                userlist.length > endIndex ? endIndex : userlist.length
              )
              .map(
                (
                  {
                    userIndex,
                    departmentNo,
                    category,
                    districtcode,
                    subDivision,
                    blockCode,
                    designationID,
                    contactNo,
                    currentStatus,
                  },
                  index
                ) => {
                  return (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {index + 1 + startIndex}
                      </Table.Cell>
                      <Table.Cell>
                        {/* {departmentList?.[departmentNo]?.departmentName} */}
                        {departmentList?.[
                          departmentList?.findIndex(
                            (obj) => obj.departmentNo == departmentNo
                          )
                        ]?.departmentName || "Karmashree Admin"}
                      </Table.Cell>
                      <Table.Cell>{category}</Table.Cell>
                      <Table.Cell>
                        {parseInt(districtcode) ? districtcode : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {parseInt(subDivision) ? subDivision : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {parseInt(blockCode) ? blockCode : "-"}
                      </Table.Cell>
                      <Table.Cell>
                        {
                          designationList?.[
                            designationList?.findIndex(
                              (obj) => obj.designationId == designationID
                            )
                          ]?.designation
                        }
                      </Table.Cell>
                      <Table.Cell>{contactNo}</Table.Cell>
                      <Table.Cell>{currentStatus}</Table.Cell>
                    </Table.Row>
                  );
                }
              )}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
          <TablePagination
            data={userlist}
            setCurrentPage={setCurrentPage}
            startIndex={startIndex}
            endIndex={endIndex}

          />
        </div>
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
};

export default UserList;
