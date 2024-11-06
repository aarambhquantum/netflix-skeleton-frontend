import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { MovieRow } from '../components/MovieRow';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from '../services/api';
import { Movie } from '../types/movie';
import { useMovieStore } from '../store/useMovieStore';

export const Browse: React.FC = () => {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const { trending, popular, topRated, setTrending, setPopular, setTopRated } = useMovieStore();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
        ]);

        setTrending(trendingData.results);
        setPopular(popularData.results);
        setTopRated(topRatedData.results);
        setHeroMovie(trendingData.results[0]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [setTrending, setPopular, setTopRated]);

  if (!heroMovie) {
    return null;
  }

  return (
    <div className="app">
      <Navbar />
      <Hero movie={heroMovie} />
      <div style={{ marginTop: '-100px', position: 'relative', zIndex: 2 }}>
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Popular on Streamflix" movies={popular} />
        <MovieRow title="Top Rated" movies={topRated} />
      </div>
    </div>
  );
};