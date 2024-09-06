// /app/module/pokemon/PokemonModule.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/components/layouts/MainLayout';
import { SkeletonCard } from '@/components/organisms/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import CardPokemon from '@/module/pokemon/__components/card';

import { fetchPokemons, setOffset } from '../../redux/slices/pokemonSlice';
import { AppDispatch, RootState } from '../../redux/store';

const PokemonModule = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list, loading, offset } = useSelector(
    (state: RootState) => state.pokemon,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (offset === 0) {
      dispatch(fetchPokemons(offset));
    }
  }, [dispatch, offset]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const filteredList = list
    .filter((pokemon) => pokemon.name.includes(searchTerm))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !loading
      ) {
        dispatch(setOffset(offset + 20));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, offset, loading]);

  useEffect(() => {
    if (offset > 0 && searchTerm === '') {
      dispatch(fetchPokemons(offset));
    }
  }, [dispatch, offset, searchTerm]);

  return (
    <MainLayout>
      <section className='mx-auto min-h-[80vh] max-w-7xl px-4 py-8'>
        <div className='w-full'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='w-full md:w-1/2 lg:w-1/3'>
              <Input
                type='text'
                placeholder='Search Pokemon'
                className='pl-4'
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className='flex space-x-2 '>
              <Button onClick={() => handleSort('asc')} className='text-white'>
                Sort A-Z
              </Button>
              <Button onClick={() => handleSort('desc')} className='text-white'>
                Sort Z-A
              </Button>
            </div>
          </div>

          {!list.length && !loading ? (
            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5 '>
              {Array.from({ length: 20 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className='mt-4 grid  grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5'>
              {filteredList.map((pokemon, index) => (
                <CardPokemon key={index} pokemon={pokemon} />
              ))}
            </div>
          )}

          {loading && (
            <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5'>
              {Array.from({ length: 20 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default PokemonModule;
