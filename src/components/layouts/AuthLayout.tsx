'use client';

import Image from 'next/image';
import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='wrapper relative mt-0 flex min-h-[100vh] items-center justify-center bg-[#F8F8F8] dark:bg-slate-950'>
      <div className='box relative flex h-full w-[1000px] items-center  rounded-lg shadow-sm shadow-slate-500 dark:bg-secondary-foreground dark:shadow-slate-800'>
        <div className='box-left hidden min-h-[400px] w-1/2 overflow-hidden rounded-l-lg text-center lg:flex '>
          <Image
            src='/images/auth/auth-1.png'
            width={500}
            height={400}
            alt='hero-login'
            priority={true}
            className='mx-auto  h-[400px] w-[480px]'
          />
        </div>
        <div className='box-right my-auto flex min-h-screen w-full  flex-col justify-center px-8 lg:h-full lg:min-h-[400px] lg:w-1/2'>
          <div className=''>{children}</div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
