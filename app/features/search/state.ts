import { atom } from 'jotai';
import { findMoviesMatchingQuery } from '@/infrastructure/repositories/movie';
import { findTvSeriesMatchingQuery } from '@/infrastructure/repositories/tv-series';

export const inputValue$ = atom<string | undefined>();
export const inputYearValue$ = atom<number | undefined>()

type Suggestion = { title: string; id: string };

export const suggestions$ = atom(async (get, { signal }) => {
  const title = get(inputValue$);
  const releaseYear = get(inputYearValue$)
  if (!title) return [];
  if(!releaseYear) return []

  const movies = await findMoviesMatchingQuery(signal, { title , releaseYear});
  const tvSeries = await findTvSeriesMatchingQuery({ title });

  const result: Suggestion[] = [];
  return result
    .concat(movies)
    .concat(tvSeries)
    .filter((it) => it.title.includes(title));
});
