import axios from 'axios';
import React, { useEffect,useState } from 'react';

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

export const ModalDetailPokemon = ({ modalTrigger, url }: ModalDetailPokemonProps) => {
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

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
      <DialogContent className="p-12 text-center sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {pokemonDetail ? pokemonDetail.name : 'Loading...'}
          </DialogTitle>
          <DialogDescription className="text-black dark:text-slate-400">
            {pokemonDetail ? (
              <div>
                <p>Height: {pokemonDetail.height}</p>
                <p>Weight: {pokemonDetail.weight}</p>
                <p>Base Experience: {pokemonDetail.base_experience}</p>
                <p>Abilities:</p>
                <ul>
                  {pokemonDetail.abilities.map((ability: any, index: number) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
