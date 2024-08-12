"use client"
import {
      Column,
      ColumnFiltersState,
      PaginationState,
      RowData,
      createColumnHelper,
      flexRender,
      getCoreRowModel,
      getFilteredRowModel,
      getPaginationRowModel,
      useReactTable
} from '@tanstack/react-table';
import React from 'react';
import { Button, Panel, Stack } from 'rsuite';
import { User } from '../../models/User';
import { PaginationControl } from './Pagination';
import { Filter } from './Filter'
import Link from 'next/link';
declare module '@tanstack/react-table' {
      //allows us to define custom properties for our columns
      interface ColumnMeta<TData extends RowData, TValue> {
            filterVariant?: 'text' | 'range' | 'select' | 'none'
      }
}
const columnHelper = createColumnHelper<User>();

const columns = [
      columnHelper.accessor('first_name', {
            header: 'First Name',
            cell: info => info.getValue(),
      }),
      columnHelper.accessor('last_name', {
            header: 'Last Name',
            cell: info => info.getValue(),
      }),
      columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
      }),
      columnHelper.accessor('alternate_email', {
            header: 'Alternate Email',
            cell: info => info.getValue(),
      }),
      columnHelper.accessor('age', {
            header: 'Age',
            cell: info => info.getValue(),
            meta: {
                  filterVariant: 'range',
            },
      }),
      columnHelper.accessor('id', {
            header: 'Action',
            meta: {
                  filterVariant: 'none',
            },
            cell: ({ row }) => (
                  <>
                        <a href={`/user/${row.original.id}`} className='mr-4'>Edit</a>
                        <a href={`/delete/${row.original.id}`} style={{ color: 'red' }}>Delete</a>
                  </>
            ),
      }),
];

export default function UsersPage({ users }: { users: User[] }) {
      const [pagination, setPagination] = React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 10,
      })
      const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
            []
      )

      const table = useReactTable({
            data: users,
            columns,
            filterFns: {},
            state: {
                  columnFilters,
                  pagination,
            },
            onColumnFiltersChange: setColumnFilters,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(), //client side filtering
            getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: setPagination,
            //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically

      });

      return (
            <div className="flex flex-col w-full p-4 relative">
                  <Panel
                        bordered
                        header={
                              <Stack justifyContent="space-between">
                                    <h2 className="text-2xl font-bold mb-4">Users List</h2>
                                    <Link href={'/user'}>Add User</Link>
                              </Stack>
                        }
                  >
                        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                    {table.getHeaderGroups().map(headerGroup => (

                                          <tr key={headerGroup.id}>
                                                {headerGroup.headers.map(header => {
                                                      return (
                                                            <th key={header.id} colSpan={header.colSpan}>
                                                                  {header.isPlaceholder ? null : (
                                                                        <>
                                                                              <div
                                                                                    {...{
                                                                                          className: header.column.getCanSort()
                                                                                                ? 'cursor-pointer select-none'
                                                                                                : '',
                                                                                          onClick: header.column.getToggleSortingHandler(),
                                                                                    }}
                                                                              >
                                                                                    {flexRender(
                                                                                          header.column.columnDef.header,
                                                                                          header.getContext()
                                                                                    )}
                                                                                    {{
                                                                                          asc: ' 🔼',
                                                                                          desc: ' 🔽',
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
                                                      )
                                                })}
                                          </tr>
                                    ))}
                              </thead>
                              <tbody>
                                    {table.getRowModel().rows.map(row => (
                                          <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                {row.getVisibleCells().map(cell => (
                                                      <td className='px-6 py-4' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                                ))}
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                        <PaginationControl table={table} />

                  </Panel>

            </div >
      );
}

