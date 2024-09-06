'use client';

import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fetchPokemonDetail } from '@/redux/slices/pokemonDetailSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoadingDots from '@/components/organisms/LoadingDots';

const DetailPokemonModule = () => {
  const params = useParams();
  const name = params?.name;

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.pokemonDetail,
  );

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemonDetail(String(name)));
    }
  }, [dispatch, name]);

  return (
    <MainLayout>
      {loading ? (
        <LoadingDots hScreen />
      ) : (
        <section className='mx-auto min-h-[80vh] w-full max-w-7xl px-4 py-8'>
          <div>
            {error && <p className='text-red-500'>{error}</p>}
            {data && !error && (
              <div className='grid min-h-[75vh] grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='flex h-full flex-col justify-between gap-4'>
                  <Button
                    className='max-w-20 bg-primary text-white hover:bg-primary-foreground'
                    asChild
                  >
                    <Link href='/list-pokemon'>Back</Link>
                  </Button>
                  <Card>
                    <CardHeader>
                      <CardTitle>{data?.name.toUpperCase()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-base'>
                        Type:{' '}
                        {data?.types.map((t: any) => t.type.name).join(', ')}
                      </p>
                      <p className='text-base'>
                        Abilities:{' '}
                        {data?.abilities
                          .map((a: any) => a.ability.name)
                          .join(', ')}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Abilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data?.stats.map((stat: any) => (
                        <div
                          key={stat.stat.name}
                          className='mb-2 flex items-center'
                        >
                          <p className='w-52 text-base'>{stat.stat.name}</p>

                          <p className='w-8 text-right text-base'>
                            {stat.base_stat}
                          </p>

                          <div className='ml-4 h-2.5 w-full rounded-full bg-gray-200'>
                            <div
                              className='darkbg-tertiary h-2.5 rounded-full bg-primary'
                              style={{
                                width: `${(stat.base_stat / 225) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className='flex items-center justify-center'>
                  <div>
                    <Image
                      src={data?.sprites?.other?.dream_world?.front_default}
                      alt={data?.name}
                      width={350}
                      height={350}
                      priority
                      className='object-cover'
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default DetailPokemonModule;
