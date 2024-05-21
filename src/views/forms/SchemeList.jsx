import { useState, useEffect, useMemo } from "react";
import { Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "../../functions/Fetchfunctions";
import { SortIcon } from "../../components/SortIcon";
import { Pagination } from "../../components/Pagination";
import classNames from "classnames";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getAllSchemeList } from "../../Service/Scheme/SchemeService";

const SchemeList = () => {
  const { userIndex } = JSON.parse(localStorage.getItem("karmashree_User"));

  const HeadData = [
    "Financial Year",
    "Block/Municipality",
    "GP",
    "Scheme Name",
    "Project Cost",
    "Total Wages Paid till date",
    "No of labours",
    "Engaged for no. of Days(MGNREGA WORKERS)",
    "Funding Department",
    "Action",
  ];
  const { data: schemeList } = useQuery({
    queryKey: ["schemeList"],
    queryFn: async () => {
      const data = await fetch.get("/api/schememaster/schemelist/" + userIndex);
      // console.log(Array.isArray(data.data.result));
      return data.data.result;
    },
  });

  const ListOptions = [5, 10, 15, "all"];
  const [items, setItems] = useState(ListOptions[0]);

  const data = useMemo(() => schemeList ?? [], [schemeList]);

  const list = [
    {
      header: "Sl no",
      accessorKey: "scheme_sl",
      className: "font-bold text-black text-center cursor-pointer normal-case",
      cell: ({ row }) => row.index + 1,
      headClass: "cursor-pointer normal-case",
    },
    {
      header: "Financial Year",
      accessorKey: "finYear",
      headClass: "cursor-pointer normal-case",
    },
    {
      header: "Scheme Id",
      accessorKey: "schemeId",
      headClass: "cursor-pointer normal-case",
    },
    {
      header: "Block/Municipality",
      accessorKey: "blockname",
      headClass: "cursor-pointer normal-case",

      cell: ({ row }) =>
        row.original.blockname == ""
          ? row.original.muniName
          : row.original.blockname,
      // sortingFn: "id",
    },
    {
      header: "GP",
      accessorKey: "gpName",
      headClass: "cursor-pointer normal-case",
      cell: ({ row }) =>
        row.original.gpName == "" ? "-" : row.original.gpName,
      // sortingFn: "id",
    },
    {
      header: "Scheme Name",
      accessorKey: "schemeName",
      headClass: "cursor-pointer normal-case",
      // sortingFn: "id",
    },
    {
      header: "Project Cost",
      accessorKey: "totalprojectCost",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Total Wages Paid till date",
      accessorKey: "totalWageCost",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Sl no",
      accessorKey: "totalLabour",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Engaged For No. Of Days(MGNREGA WORKERS)",
      headClass: "cursor-pointer normal-case",
      className: "text-center",
      cell: ({ row }) => "---",
      // sortingFn: "id",
    },
    {
      header: "Funding Department",
      accessorKey: "FundingDeptname",
      headClass: "cursor-pointer normal-case",
      // cell: ({ row }) => row.index + 1,
      // sortingFn: "id",
    },
    {
      header: "Action",
      headClass: "cursor-pointer normal-case",
      className: "text-center",
      cell: ({ row }) => "*",
      // sortingFn: "id",
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

  console.log(schemeList, "scehemeList");

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
                    &nbsp;/
                  </li>
                  <li className="text-gray-500 font-bold" aria-current="page">
                    Scheme List
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-8 px-12">
        <div className=" flex justify-between px-2 items-center h-12">
          <select
            className="rounded-lg"
            name=""
            id=""
            value={items}
            onChange={(e) => setItems(e.target.value)}
          >
            {ListOptions.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={filtering}
            placeholder="search..."
            className="border-2 rounded-lg border-zinc-400"
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto overflow-y-hidden h-fit w-full show-scrollbar">
          {/* <Table className="">
            <Table.Head>
              <Table.HeadCell className="capitalize">sl no</Table.HeadCell>
              {HeadData?.map((e) => (
                <Table.HeadCell key={e} className="capitalize">
                  {e}
                </Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {schemeList?.map((d, index) => (
                <Table.Row
                  key={userIndex}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>

                  <Table.Cell>{d?.finYear}</Table.Cell>
                  <Table.Cell>
                    {d?.blockcode ? d?.blockname : d?.muniName}
                  </Table.Cell>
                  <Table.Cell>{d?.gpName == "" ? "-" : d?.gpName}</Table.Cell>
                  <Table.Cell>{d?.schemeName}</Table.Cell>
                  <Table.Cell>{d?.totalprojectCost}</Table.Cell>

                  <Table.Cell>{d?.totalWageCost}</Table.Cell>
                  <Table.Cell>{d?.totalLabour}</Table.Cell>
                  <Table.Cell>----</Table.Cell>
                  <Table.Cell>{d?.departmentNo}</Table.Cell>
                  <Table.Cell>*</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table> */}
          <Table>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Head key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.HeadCell
                    key={header.id}
                    className={classNames(
                      header.column.columnDef.headClass,
                      "hover:bg-zinc-200/70 transition-all whitespace-nowrap"
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

            <Table.Body className="divide-y">
              {table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      className={classNames(cell.column.columnDef.className,"whitespace-nowrap")}
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
        <Pagination data={data} table={table} />
      </div>
    </>
  );
};

export default SchemeList;
