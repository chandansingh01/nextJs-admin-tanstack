
import React from 'react';

import UserTable from '../components/UserTable/UserTable';
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
