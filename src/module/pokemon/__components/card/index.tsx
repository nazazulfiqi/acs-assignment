// /app/module/pokemon/__components/card/CardPokemon.tsx
import Image from 'next/image';
import React, { FC } from 'react';
import { IoEyeOutline } from 'react-icons/io5';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
  console.log(pokemon);
  
  const pokemonId = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Card className="mx-auto mt-4 min-w-fit overflow-hidden rounded-lg">
      <CardHeader className="max-h-[200px] w-full overflow-hidden p-0">
        <Image
          src={imageUrl}
          alt={pokemon.name}
          width={350}
          height={100}
          priority
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <section className=" flex gap-2 overflow-x-hidden">
          <Badge className="bg-dark-900 hover:bg-dark-300 text-dark-900 rounded-md bg-opacity-[0.08] px-3 py-1">
            {pokemon.name}
          </Badge>
        </section>
        <section className="mt-5 flex min-h-[100px] flex-col gap-3">
          <CardTitle className="line-clamp-1">{pokemon.name}</CardTitle>
          <CardDescription className="line-clamp-3">
            <p>Details about {pokemon.name}.</p>
          </CardDescription>
        </section>
      </CardContent>
      <CardFooter className="flex justify-end">
        <ModalDetailPokemon
        url={pokemon.url}
          modalTrigger={
            <Button className="bg-slate-900 hover:bg-black text-white">
              <IoEyeOutline size={18} />
            </Button>
          }
        />
      </CardFooter>
      <hr />
    </Card>
  );
};

export default CardPokemon;
