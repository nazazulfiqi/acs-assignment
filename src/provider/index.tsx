'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import LoadingDots from '@/components/organisms/LoadingDots';

import { store } from '@/redux/store';

function ProviderLocal({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute='class' defaultTheme='light'>
        <Suspense fallback={<LoadingDots hScreen={true} />}>
          <Provider store={store}>{children}</Provider>
        </Suspense>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default ProviderLocal;
