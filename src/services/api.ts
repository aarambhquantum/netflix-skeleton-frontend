const API_KEY = 'd0216b8f241ef3f48b3adebdb5f07d49';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  return response.json();
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=1`
  );
  return response.json();
};

export const getTrendingMovies = () => fetchMovies('/trending/movie/week');
export const getPopularMovies = () => fetchMovies('/movie/popular');
export const getTopRatedMovies = () => fetchMovies('/movie/top_rated');
export const getMovieDetails = (id: string) => fetchMovies(`/movie/${id}`);