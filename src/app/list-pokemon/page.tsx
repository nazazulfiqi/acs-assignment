import { Metadata } from 'next';

import { siteConfig } from '@/constant/config';

export const generateMetadata = (): Metadata => {
  return {
    title: `Pokémon List`,
    description:
      'Browse the complete list of Pokémon, explore their abilities, stats, and more.',
    openGraph: {
      title: 'Pokémon List',
      description:
        'Browse the complete list of Pokémon, explore their abilities, stats, and more.',
      url: `${siteConfig.url}/list-pokemon`,
      images: [`${siteConfig.url}/images/og.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pokémon List',
      description:
        'Browse the complete list of Pokémon, explore their abilities, stats, and more.',
      images: [`${siteConfig.url}/images/og.png`],
    },
  };
};

import React from 'react';

import ListPokemonModule from '@/module/list-pokemon/module';

const ListPokemonPage = () => {
  return <ListPokemonModule />;
};

export default ListPokemonPage;
