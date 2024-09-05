"use client";

import { SessionProvider } from 'next-auth/react';
import React, { Suspense } from 'react';

import LoadingDots from '@/components/organisms/LoadingDots';


function Provider({ children }: { children: React.ReactNode }) {
  return (

      <SessionProvider>
          <Suspense fallback={<LoadingDots hScreen={true} />}>
            {children}
          </Suspense>
      </SessionProvider>

  );
}

export default Provider;
