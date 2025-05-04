import { createAPIUrl } from '@/utils';
import { TVSeries } from 'domain/tv-series';

const apiUrl = createAPIUrl();

export async function findTvSeriesMatchingQuery(
  params: Partial<TVSeries>,
): Promise<TVSeries[]> {
  const url = new URL('/tv-series', apiUrl);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value.toString());
  }

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTvSeriesByIdQuery(
  seriesTvId: TVSeries['id'],
) {
  const url = new URL(`/tv-series/${seriesTvId}`, apiUrl);

  const request = await fetch(url);
  if (!request.ok) return;

  return await request.json();
}

export async function getFeaturedTvSeriesQuery() {
  const url = new URL('/tv-series/recommended', apiUrl);

  const request = await fetch(url);
  if (!request.ok) return [];

  return await request.json();
}

export async function getTopRatedTvSeriesQuery() : Promise<TVSeries[]> {
  // TODO: implement on backend side
  try{
    const url = new URL('/tv-series', apiUrl);
    const request = await fetch(url);
    if (!request.ok) return [];
  
    const json = await request.json();
  
    // top rated has to have a rating above 75%
    return json.filter((it: { rating: number; }) => it.rating > 75);
  }catch(err){
    console.error(err)
    return []
  }
  
}
