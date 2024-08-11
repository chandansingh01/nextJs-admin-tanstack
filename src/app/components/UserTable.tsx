"use client"
import React from 'react';
import { Panel, Table, Stack, Button } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

export default function UsersPage({ users }: { users: any[] }) {



      return (
            <div className="flex flex-col w-full p-4 relative">

                  <Panel
                        bordered
                        header={
                              <Stack justifyContent="space-between">
                                    <h2 className="text-2xl font-bold mb-4">Users List</h2>

                                    <Button active>Add User</Button>

                              </Stack>
                        }

                  >
                        <Table height={600} data={users} className='text-black'>
                              <Column flexGrow={1} align="center" fixed>
                                    <HeaderCell>First Name</HeaderCell>
                                    <Cell dataKey="first_name" />
                              </Column>
                              <Column flexGrow={1} align="center">
                                    <HeaderCell>Last Name</HeaderCell>
                                    <Cell dataKey="last_name" />
                              </Column>
                              <Column flexGrow={1} align="center">
                                    <HeaderCell>Email</HeaderCell>
                                    <Cell dataKey="email" />
                              </Column>
                              <Column flexGrow={1} align="center">
                                    <HeaderCell>Alternate Email</HeaderCell>
                                    <Cell dataKey="alternate_email" />
                              </Column>
                              <Column flexGrow={1} align="center">
                                    <HeaderCell>Age</HeaderCell>
                                    <Cell dataKey="age" />
                              </Column>
                        </Table>
                  </Panel>
            </div>
      );
}
