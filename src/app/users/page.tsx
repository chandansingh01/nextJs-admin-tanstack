import UserTable from "../components/Users/UserList";
const baseUrl = process.env.NEXT_URL;

export default function UsersPage() {
  return (
    <>
      <UserTable />
    </>
  );
}
