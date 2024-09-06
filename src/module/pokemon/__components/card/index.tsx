// /app/module/pokemon/__components/card/CardPokemon.tsx
import Image from 'next/image';
import React, { FC } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ModalDetailPokemon } from '@/module/pokemon/__components/pop-up';

interface CardPokemonProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const CardPokemon: FC<CardPokemonProps> = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  return (
    <ModalDetailPokemon
      url={pokemon.url}
      modalTrigger={
        <Card className='mx-auto mt-4 min-w-fit overflow-hidden rounded-lg cursor-pointer'>
          <CardHeader className='h-[200px] w-full overflow-hidden p-2 '>
            <Image
              src={imageUrl}
              alt={pokemon.name}
              width={200}
              height={200}
              priority
              className='object-cover'
            />
          </CardHeader>
          <CardContent className='p-6'>
            <section className='mt-5 flex  flex-col gap-3'>
              <CardTitle className='line-clamp-1 text-center'>
                {pokemon.name}
              </CardTitle>
            </section>
          </CardContent>
          <CardFooter className='flex justify-end'></CardFooter>
        </Card>
      }
    />
  );
};

export default CardPokemon;
