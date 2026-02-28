import { Atom, atom } from 'jotai';
import { TVSeries } from '../../../domain/tv-series';
import { getFeaturedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { getMoviePoster } from '@/infrastructure/repositories/movie';

export const featuredTvSeries$ = atom(
  async (_, { signal }): Promise<TVSeries[]> => {
    const response = await getFeaturedTvSeriesQuery();
    return response;
  },
);

export const file$: Atom<Promise<any>> = atom(async (get, { signal })  => {
  const file =  await getMoviePoster(signal)
  return file
})
