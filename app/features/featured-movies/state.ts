import { Atom, atom } from 'jotai';
import { Movie } from '../../../domain/movie';
import { getFeaturedMoviesQuery, getMoviePoster } from '@/infrastructure/repositories/movie';

export const movies$: Atom<Promise<Movie[]>> = atom(async (get, { signal }) => {
  const featuredMovies = await getFeaturedMoviesQuery(signal)

  const result: Movie[] = []
  return result
    .concat(featuredMovies)

});

export const file$: Atom<Promise<any>> = atom(async (get, { signal })  => {
  const file =  await getMoviePoster(signal)
  return file
})
