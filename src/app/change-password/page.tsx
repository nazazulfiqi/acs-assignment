import { Metadata } from 'next';
import React from 'react';

import { siteConfig } from '@/constant/config';
import ChangePasswordModule from '@/module/change-password/module';

export const generateMetadata = (): Metadata => {
  return {
    title: `Change Password `,
    description: 'Change your password',
    openGraph: {
      title: 'Change Password',
      description: 'Change your password ',
      url: `${siteConfig.url}/change-password`,
      images: [`${siteConfig.url}/images/og.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Change Password',
      description: 'Change your password ',
      images: [`${siteConfig.url}/images/og.png`],
    },
  };
};

const ChangePasswordPage = () => {
  return <ChangePasswordModule />;
};

export default ChangePasswordPage;
