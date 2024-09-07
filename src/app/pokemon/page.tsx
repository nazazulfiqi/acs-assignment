import { Metadata } from 'next';

import { siteConfig } from '@/constant/config';

export const generateMetadata = (): Metadata => {
  return {
    title: `Pokémon`,
    description:
      'Explore the full list of Pokémon, discover their stats and abilities',
    openGraph: {
      title: 'Pokémon ',
      description:
        'Explore the full list of Pokémon, discover their stats and abilities',
      url: `${siteConfig.url}/pokemon`,
      images: [`${siteConfig.url}/images/og.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pokémon',
      description:
        'Explore the full list of Pokémon, discover their stats and abilities',
      images: [`${siteConfig.url}/images/og.png`],
    },
  };
};

import React from 'react';

import PokemonModule from '@/module/pokemon/module';

const PokemonPage = () => {
  return <PokemonModule />;
};

export default PokemonPage;
