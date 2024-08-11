
import React from 'react';
import { Table } from 'rsuite';
import UserTable from '../components/UserTable';
const baseUrl = process.env.NEXT_URL

export default async function UsersPage() {
      let users: any[] = [];
      try {
            const response = await fetch(`${baseUrl}/api/users`);
            const data = await response.json();
            console.log(data);
            users = data;

      } catch (error) {
            console.log(error);
      }

      return (
            <UserTable users={users} />
      );
}
