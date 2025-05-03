import { Atom, atom } from 'jotai';
import { Movie } from '../../../domain/movie';
import { getFeaturedMoviesQuery } from '@/infrastructure/repositories/movie';

export const movies$: Atom<Promise<Movie[]>> = atom(async (get, { signal }) => {
  const featuredMovies = await getFeaturedMoviesQuery(signal)

  const result: Movie[] = []
  return result
    .concat(featuredMovies)

});
