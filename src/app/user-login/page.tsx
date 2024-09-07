import { Metadata } from 'next';

import { siteConfig } from '@/constant/config';

export const generateMetadata = (): Metadata => {
  return {
    title: `User Login - ${siteConfig.title}`,
    description: 'Log in to access your account ',
    openGraph: {
      title: 'User Login',
      description: 'Log in to access your account ',
      url: `${siteConfig.url}/user-login`,
      images: [`${siteConfig.url}/images/og.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'User Login',
      description: 'Log in to access your account ',
      images: [`${siteConfig.url}/images/og.png`],
    },
  };
};

import React from 'react';

import UserLoginModule from '@/module/user-login/module';

const UserLoginPage = () => {
  return <UserLoginModule />;
};

export default UserLoginPage;
