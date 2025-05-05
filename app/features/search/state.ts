import { atom } from 'jotai';
import { findMoviesMatchingQuery } from '@/infrastructure/repositories/movie';
import { findTvSeriesMatchingQuery } from '@/infrastructure/repositories/tv-series';

export const inputValue$ = atom<string | undefined>();
export const inputContentType$ = atom<boolean | undefined>()

type Suggestion = { title: string; id: string, seasons ?:any };

export const suggestions$ = atom(async (get, { signal }) => {
  const title = get(inputValue$);
  const contentType = get(inputContentType$)
  if (!title) return [];
  

  const movies = await findMoviesMatchingQuery(signal, { title});
  console.log(movies)
  const tvSeries = await findTvSeriesMatchingQuery({ title });

  const result: Suggestion[] = [];
  return result
    .concat(movies)
    .concat(tvSeries)
    .filter((it) => it.title.includes(title));
});
