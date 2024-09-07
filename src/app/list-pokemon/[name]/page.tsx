import { Metadata } from 'next';

import { siteConfig } from '@/constant/config';

export const generateMetadata = (): Metadata => {
  return {
    title: `Pokémon Detail`,
    description:
      'Discover detailed information about your selected Pokémon, including stats and abilities',
    openGraph: {
      title: 'Pokémon Detail',
      description:
        'Discover detailed information about your selected Pokémon, including stats and abilities',
      url: `${siteConfig.url}/list-pokemon/detail`,
      images: [`${siteConfig.url}/images/og.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pokémon Detail',
      description:
        'Discover detailed information about your selected Pokémon, including stats and abilities',
      images: [`${siteConfig.url}/images/og.png`],
    },
  };
};

import React from 'react';

import DetailPokemonModule from '@/module/list-pokemon/detail/module';

const DetailPokemonPage = () => {
  return <DetailPokemonModule />;
};

export default DetailPokemonPage;
