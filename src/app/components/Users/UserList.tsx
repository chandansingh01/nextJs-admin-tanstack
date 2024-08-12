"use client";
declare module "@tanstack/react-table" {
      //allows us to define custom properties for our columns
      interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select" | "none";
      }
    }
import { useDeleteUsers, UseUserData } from "@/app/hooks/UseUserData";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  RowData,
  useReactTable
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Button,
  Loader,
  Message,
  Modal,
  Panel,
  Stack,
  useToaster
} from "rsuite";
import UserForm from "../UserForm";
import { createColumns } from './Columns'; // Import the createColumns function
import { PaginationControl } from "./Pagination";
import UserTable from "./UserTable";

export default function UsersPage() {
  const { data: users, error, isLoading } = UseUserData();
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const toaster = useToaster();
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState<string|null>(null);
  const { mutate } = useDeleteUsers();
  const [confirmDelete, setConfirmDelete] = React.useState(false); 
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const [message, setMessage] = useState<string | null>(null); 

  const handleDelete = () => {
    // Added handleDelete function
    const users = Object.keys(selectedRowIds).map((item) => parseInt(item)+1);
    mutate(users);
  };

  const handleOpen = (value: string | null) => {
    setUserId(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddUser = () => {
   
    toaster.push(messageAdded, {
      placement: "topEnd",
      duration: 5000,
    }); // Use toaster for success message
  };

  const handleUpdateUser = () => {
    // Logic to update user
    setMessage('User updated successfully! ')
    toaster.push(messageUpdate, {
      placement: "topEnd",
      duration: 5000,
    }); // Use toaster for success message
  };

  const columns = createColumns(handleOpen); // Pass handleOpen to createColumns

  const table = useReactTable({
    data: users,
    columns, // Use the columns created with the handleOpen function
    filterFns: {},
    state: {
      columnFilters,
      pagination,
      rowSelection: selectedRowIds,
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setSelectedRowIds,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
  });
  const messageAdded = (
      <Message showIcon type={'info'} closable>
        <p>User added successfully!</p>
      </Message>
    );
    const messageUpdate = (
      <Message showIcon type={'info'} closable>
        <p>User Updated successfully!</p>
      </Message>
    );
  return (
    <div className="flex flex-col w-full p-4 relative">
      {users?.length ? (
        <Panel
          bordered
          className="overflow-x-scroll"
          header={
            <Stack justifyContent="space-between">
              <h2 className="text-2xl font-bold mb-4 ">Users List</h2>
              <Button  onClick={() => handleOpen(null)}>Add User</Button>
            </Stack>
          }
        >
          <UserTable table={table}/>
          <div className="flex justify-between">
            <div>
          { Object.keys(selectedRowIds)?.length>0&&<Button
          className="flex items-bottom gap-2 mt-4 justify-start bg-red-500 text-white"
            onClick={() => {
              setConfirmDelete(true);
            }}
          >
            Delete Users
          </Button>}
          </div>
          <PaginationControl table={table} />
          </div>
          
        </Panel>
      ) : (
        <Loader center />
      )}
      <Modal size={"lg"} open={open} onClose={handleClose}>
        <Modal.Body>
          <UserForm
            params={{ userId: String(userId) }}
            onSucess={() => {
              handleClose();
              if (userId) {
                handleUpdateUser(); // Call update message if editing
              } else {
                handleAddUser(); // Call add message if adding
              }
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size={"sm"}
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
      >
        <Modal.Body>
          <p className="text-black">
            Are you sure you want to delete the selected users?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setConfirmDelete(false)} appearance="subtle">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmDelete(false);
              handleDelete();
              setSelectedRowIds([]);
            }}
            appearance="primary"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}