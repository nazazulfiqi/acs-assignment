'use client';

import React from 'react';

import MainLayout from '@/components/layouts/MainLayout';
import { Separator } from '@/components/ui/separator';

import TableUserLogin from '@/module/user-login/__components/table';

const UserLoginModule = () => {
  return (
    <MainLayout>
      <section className='mx-auto min-h-[80vh] max-w-7xl px-4 py-8'>
        <div className='w-full'>
          <h1 className='mb-4  text-2xl font-bold'>User Login Information</h1>
          <Separator />
          <div>
            <TableUserLogin />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default UserLoginModule;
