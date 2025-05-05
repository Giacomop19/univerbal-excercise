import { atom } from 'jotai';

type FavoriteContent = {
  id: string
  title: string
  director?: string
  creator?: string
  releaseYear: number
  rating : number
}

export type Opaque<B, T extends string = string> = T & { readonly __brand: B };
export const favoritesMovie$ = atom<FavoriteContent[]>([])
export const favoritesTvSerie$ = atom<FavoriteContent[]>([])

