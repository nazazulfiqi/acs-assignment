import { Metadata } from 'next';
import * as React from 'react';
import '@/lib/env';

import { siteConfig } from '@/constant/config';
import SignInModule from '@/module/sign-in/module';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export const generateMetadata = (): Metadata => {
  return {
    title: `Login - ${siteConfig.title}`,
    description:
      'Log in to explore and discover detailed information about Pokémon.',
    openGraph: {
      title: 'Login to Pokémon World',
      description:
        'Log in to explore and discover detailed information about Pokémon.',
      url: 'https://nazazulfiqi.vercel.app/login',
      images: ['https://nazazulfiqi.vercel.app/images/og-login.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Login to Pokémon World',
      description:
        'Log in to explore and discover detailed information about your favorite Pokémon.',
      images: ['https://nazazulfiqi.vercel.app/images/og-login.jpg'],
    },
  };
};

export default function HomePage() {
  return (
    <main>
      <SignInModule />
    </main>
  );
}
