import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ModalDetailPokemonProps {
  modalTrigger: React.ReactNode;
  url: string; // Terima URL dari props
}

export const ModalDetailPokemon = ({
  modalTrigger,
  url,
}: ModalDetailPokemonProps) => {
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

  console.log(url);

  console.log(pokemonDetail);

  useEffect(() => {
    if (url) {
      axios.get(url).then((response) => {
        setPokemonDetail(response.data);
      });
    }
  }, [url]);

  return (
    <Dialog>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className='p-12 text-center sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex flex-col items-center gap-4'>
            <Image
              src={pokemonDetail?.sprites?.other?.dream_world?.front_default}
              alt={pokemonDetail?.name}
              width={150}
              height={150}
              priority
              className='object-cover'
            />
            <p className='text-3xl'>
              {pokemonDetail ? pokemonDetail.name : 'Loading...'}
            </p>
          </DialogTitle>
          <DialogDescription className='text-black dark:text-slate-400 pt-4'>
            {pokemonDetail ? (
              pokemonDetail.stats.map((stat: any) => (
                <div key={stat.stat.name} className='flex items-center mb-2'>
                  <p className='w-24 text-base'>{stat.stat.name}:</p>

                  <p className='w-8 text-base text-right'>{stat.base_stat}</p>

                  <div className='w-full ml-4 bg-gray-200 rounded-full h-2.5'>
                    <div
                      className='darkbg-tertiary h-2.5 rounded-full bg-primary'
                      style={{ width: `${(stat.base_stat / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading details...</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex w-full justify-between pt-4'>
          <DialogClose asChild>
            <Button variant='outline' className='w-full'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
