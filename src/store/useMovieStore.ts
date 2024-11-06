import { create } from 'zustand';
import { Movie } from '../types/movie';

interface MovieStore {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  setTrending: (movies: Movie[]) => void;
  setPopular: (movies: Movie[]) => void;
  setTopRated: (movies: Movie[]) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  trending: [],
  popular: [],
  topRated: [],
  setTrending: (movies) => set({ trending: movies }),
  setPopular: (movies) => set({ popular: movies }),
  setTopRated: (movies) => set({ topRated: movies }),
}));