// /app/module/user/UserLoginModule.tsx
'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import MainLayout from '@/components/layouts/MainLayout';

import { RootState } from '@/redux/store';

const UserLoginModule = () => {
  const { username, email, phone, isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <MainLayout>
      <section className='min-h-[80vh] mx-auto max-w-7xl px-4 py-8'>
        <div className='w-full'>
          <h1 className='text-2xl font-bold mb-4'>User Login Information</h1>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b border-gray-200'>
                    Username
                  </th>
                  <th className='py-2 px-4 border-b border-gray-200'>Email</th>
                  <th className='py-2 px-4 border-b border-gray-200'>Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='py-2 px-4 border-b border-gray-200'>
                    {username}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-200'>
                    {email}
                  </td>
                  <td className='py-2 px-4 border-b border-gray-200'>
                    {phone}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default UserLoginModule;
