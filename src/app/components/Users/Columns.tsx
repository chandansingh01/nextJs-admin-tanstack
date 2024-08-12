import { createColumnHelper } from "@tanstack/react-table";
import { User } from "../../models/User";
import { Button } from "rsuite";
import { String } from "aws-sdk/clients/acm";

const columnHelper = createColumnHelper<User>();

export const createColumns = (handleOpen: (id: String) => void) => [
  columnHelper.accessor("password", {
    id: "select",
    meta: {
      filterVariant: "none",
    },
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={(e) => table.toggleAllRowsSelected(e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor("first_name", {
    header: "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_name", {
    header: "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("alternate_email", {
    header: "Alternate Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "range",
    },
  }),
  columnHelper.accessor("id", {
    header: "Action",
    meta: {
      filterVariant: "none",
    },
    cell: ({ row }) => (
      <>
        <Button onClick={() => handleOpen(row.original.id)} className="mr-4">
          Edit
        </Button>
      </>
    ),
  }),
];