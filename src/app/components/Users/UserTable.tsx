import React from "react";
import { Button, Loader, Panel, Stack, Message } from "rsuite";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { Filter } from "./Filter";
import { PaginationControl } from "./Pagination";

interface UserTableProps {
  table: any;
  

}

const UserTable: React.FC<UserTableProps> = ({ table}) => {
  return (
    
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup:{ id: string; headers: any[] }) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row:{ id: string; getVisibleCells: () => any[] }) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td className="px-4 py-2" key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    
  );
};

export default UserTable;