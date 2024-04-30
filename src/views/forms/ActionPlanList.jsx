import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";

import { SortIcon } from "../../components/SortIcon";
import classNames from "classnames";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const ActionPlanList = () => {
  const { data: actionPlanList } = useQuery({
    queryKey: ["actionPlanList"],
    queryFn: async () => {
      const data = await fetch.get("/api/actionplan/getActionList/", 1);

      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => actionPlanList ?? [], [actionPlanList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "actionSL",
      className: "font-bold text-black text-center cursor-pointer",
      cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Scheme Area",
      accessorKey: "schemeArea",
      headClass: "cursor-pointer",
      // cell: ({ row }) => (row.original.schemeArea == "R" ? "Rural" : "Urban"),
    },
    {
      header: "Department",
      accessorKey: "deptName",
      headClass: "cursor-pointer",
      cell: ({
        row: {
          original: { deptName },
        },
      }) => (deptName == "Unknown" ? "Karmashree Admin" : deptName),
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headClass: "cursor-pointer",
    },
    {
      header: "District",
      accessorKey: "districtName",
      headClass: "cursor-pointer",
    },
    {
      header: "Block",
      accessorKey: "blockname",
      headClass: "cursor-pointer",
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headClass: "cursor-pointer",
    },
    {
      header: "Type of Schemes",
      accessorKey: "sectorName",
      headClass: "cursor-pointer w-[120px]",
    },
    {
      header: "No of Schemes Proposed",
      accessorKey: "schemeProposed",
      headClass: "cursor-pointer",
    },
    {
      header: "Tentative Total Cost of Schemes",
      accessorKey: "tentativeCostOfScheme",
      headClass: "cursor-pointer",
    },
    {
      header: "Tentative Total Wage to be paid in the Schemes",
      accessorKey: "totWagesPaid",
      headClass: "cursor-pointer",
    },
    {
      header: "Total Person days to be Generated",
      accessorKey: "totPersonDays",
      headClass: "cursor-pointer",
    },
    {
      header: "Total no. of Job Card Holder to be Engaged",
      accessorKey: "totJobCard",
      headClass: "cursor-pointer",
    },
    {
      header: "Average Days of Employmengt to be Provided per Family",
      accessorKey: "averageDays",
      headClass: "cursor-pointer text-[8px]",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns: list,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: parseInt(items),
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    if (items == "all") table.setPageSize(9999);
    else table.setPageSize(parseInt(items));
  }, [items]);

  return (
    <>
      <div className="rounded-lg p-12">
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
                    &nbsp;/
                  </li>
                  <li className="text-gray-500 font-bold" aria-current="page">
                    Action Plan List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="bg-transparent flex flex-col items-center p-8 px-12">
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          <input
            type="text"
            value={filtering}
            className="border h-12"
            onChange={(e) => setFiltering(e.target.value)}
          />
          <Table>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headClass,
                      "hover:bg-zinc-200/70 transition-all"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center space-x-2">
                        <span className="">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <SortIcon sort={header.column.getIsSorted()} />
                      </div>
                    )}
                  </Table.HeadCell>
                ))}
              </Table.Head>
            ))}

            <Table.Body className="divide-y" >
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className={cell.column.columnDef.className}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="flex overflow-x-auto sm:justify-center"></div>
      </div>
    </>
  );
};

export default ActionPlanList;
