import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { getPost } from "../services/PostApi";
import { Link } from "react-router-dom";
import { handleDeletePost } from "./DeletePost";
import UpdatePost from "./UpdatePost";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Search,
  Mail,
  User,
} from "lucide-react";

const BasicTable = ({ data, setData }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };

  useEffect(() => {
    if (data.length === 0) {
      getPostData();
    }
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16} /> ID
          <ArrowUpDown size={14} className="ml-2" />
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("name", {
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16} /> Name
          <ArrowUpDown size={14} className="ml-2" />
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("email", {
      header: () => (
        <span className="flex items-center">
          <Mail className="mr-2" size={16} /> Email
          <ArrowUpDown size={14} className="ml-2" />
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("body", {
      header: () => (
        <span className="flex items-center">
          <User className="mr-2" size={16} /> Body
          <ArrowUpDown size={14} className="ml-2" />
        </span>
      ),
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      header: "Actions",
      cell: ({ row }) => {
        let rowData = row.original;
        return (
          <div className="flex gap-2">
            <button
              className="action-button bg-[#415E72]"
              onClick={() => handleDeletePost(rowData.id, data, setData)}
            >
              Delete
            </button>
            <Link
              to="/UpdatePost"
              state={{
                updateApiData: rowData,
              }}
            >
              <button className="action-button bg-[#17313E]">Edit</button>
            </Link>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="container px-4 py-30 flex flex-col items-center">
        <div className="bg-[#415E72] flex justify-between items-center px-4 py-5 rounded-[4px] mb-[20px] w-full">
          <div className="relative flex items-center">
            <Search size={20} className="absolute left-1" color="black" />
            <input
              type="search"
              placeholder="Search..."
              className="outline-none bg-white border-b-[2px] border-[#C5B0CD] py-2 px-[22px] w-[400px]"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Link to="/addPost">
              <button className="flex items-center justify-center gap-2 border border-white py-2 px-[22px] rounded-[4px] text-[16px] text-white font-normal leading-[26px] bg-[#17313E] relative">
                <Plus size={20} />
                <span>ADD NEW ITEM</span>
              </button>
            </Link>
          </div>
        </div>
        <table className="bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-[#C5B0CD] text-[20px] font-semibold leading-[24px]"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer flex items-center"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="nth-[even]:bg-[#faf0fe]">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 w-full flex items-center justify-between">
          <div className="text-white flex items-center gap-4">
            <span>Items Per Page</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="p-2 text-center border border-white rounded-[4px] outline-none"
            >
              {[5, 10, 20, 250].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={20} />
            </button>
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              <input
                min={1}
                max={table.getPageCount()}
                type="number"
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="p-2 text-center border border-white rounded-[4px] outline-none text-white"
              />
              <span className="ml-2">of {table.getPageCount()}</span>
            </span>
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => table.nextPage(0)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
