'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
const TableUserLogin = () => {
  const { data: session } = useSession();

  return (
    <Table className='mt-6 border'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-1/2 text-center'>Username</TableHead>
          <TableHead className='w-1/2 text-center'>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {session?.user ? (
          <TableRow key={session?.user?.email}>
            <TableCell className='text-center'>{session?.user?.name}</TableCell>
            <TableCell className='text-center'>
              {session?.user?.email}
            </TableCell>
          </TableRow>
        ) : (
          <TableCell colSpan={2} className='text-center'>
            No user logged in
          </TableCell>
        )}
      </TableBody>
    </Table>
  );
};

export default TableUserLogin;
