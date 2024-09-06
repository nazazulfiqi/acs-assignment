'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  fetchPokemonDetails,
  fetchPokemons,
  setOffset,
} from '../../redux/slices/pokemonSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { SkeletonCard } from '@/components/organisms/SkeletonCard';
import { SkeletonList } from '@/components/organisms/SekeletonList';

const ListPokemonModule = () => {
  const dispatch: AppDispatch = useDispatch();
  const { list, loading, offset } = useSelector(
    (state: RootState) => state.pokemon,
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    if (offset === 0) {
      dispatch(fetchPokemons(offset)).then((action: any) => {
        action.payload.forEach((pokemon: any) => {
          dispatch(fetchPokemonDetails(pokemon)); // Ambil detail untuk setiap Pokemon
        });
      });
    }
  }, [dispatch, offset]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Handle sort order change
  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  // Handle ability filter change
  const handleAbilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAbility(e.target.value);
  };

  // Handle type filter change
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  // Filter and sort the list of Pokémon
  const filteredList = list
    .filter((pokemon) => {
      if (searchTerm && !pokemon.name.includes(searchTerm)) {
        return false;
      }
      if (selectedAbility && pokemon.details) {
        const abilities = pokemon.details.abilities.map(
          (a: any) => a.ability.name,
        );
        if (!abilities.includes(selectedAbility)) {
          return false;
        }
      }
      if (selectedType && pokemon.details) {
        const types = pokemon.details.types.map((t: any) => t.type.name);
        if (!types.includes(selectedType)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Handle infinite scroll
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

  // Fetch more Pokémon when offset changes (and no filters are applied)
  useEffect(() => {
    if (offset > 0 && searchTerm === '' && !selectedAbility && !selectedType) {
      dispatch(fetchPokemons(offset)).then((action: any) => {
        action.payload.forEach((pokemon: any) => {
          dispatch(fetchPokemonDetails(pokemon));
        });
      });
    }
  }, [dispatch, offset, searchTerm, selectedAbility, selectedType]);

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
            <div className='flex justify-between space-x-2'>
              <Button onClick={() => handleSort('asc')} className='text-white'>
                Sort A-Z
              </Button>
              <Button onClick={() => handleSort('desc')} className='text-white'>
                Sort Z-A
              </Button>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-4 md:flex-row'>
            <select
              onChange={handleAbilityChange}
              defaultValue=''
              className='w-full rounded-md dark:bg-slate-950 dark:text-white'
            >
              <option value='' className=''>
                Filter by Ability
              </option>
              {Array.from(
                new Set(
                  list.flatMap((p) =>
                    p.details?.abilities.map((a: any) => a.ability.name),
                  ),
                ),
              ).map((ability) => (
                <option key={ability} value={ability}>
                  {ability}
                </option>
              ))}
            </select>

            <select
              onChange={handleTypeChange}
              defaultValue=''
              className='w-full rounded-md dark:bg-slate-950 dark:text-white'
            >
              <option value=''>Filter by Type</option>
              {Array.from(
                new Set(
                  list.flatMap((p) =>
                    p.details?.types.map((t: any) => t.type.name),
                  ),
                ),
              ).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {!list.length && !loading ? (
            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5'>
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonList key={index} />
              ))}
            </div>
          ) : (
            <div className='mt-8 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-5'>
              {filteredList.map((pokemon, index) => (
                <Link
                  href={`/list-pokemon/${pokemon.name}`}
                  key={index}
                  className='rounded border p-4 shadow'
                >
                  <h3 className='text-xl font-bold'>{pokemon.name}</h3>
                  <p className='text-xs'>
                    Type:{' '}
                    {pokemon.details?.types
                      .map((t: any) => t.type.name)
                      .join(', ')}
                  </p>
                  <p className='text-xs'>
                    Abilities:{' '}
                    {pokemon.details?.abilities
                      .map((a: any) => a.ability.name)
                      .join(', ')}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {loading && (
            <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5'>
              {Array.from({ length: 20 }).map((_, index) => (
                <SkeletonList key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ListPokemonModule;
