import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Popper, Paper, Typography, CircularProgress } from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';
import { searchMovies } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/movie';

export const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchMoviesDebounced = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        try {
          const data = await searchMovies(query);
          setResults(data.results.slice(0, 5));
        } catch (error) {
          console.error('Search error:', error);
        }
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(searchMoviesDebounced);
  }, [query]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <Box ref={searchRef} sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: isOpen ? '#141414' : 'transparent',
          border: isOpen ? '1px solid #333' : 'none',
          borderRadius: '4px',
          transition: 'all 0.3s ease',
        }}
      >
        <SearchIcon
          size={20}
          style={{ margin: '0 10px', cursor: 'pointer' }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <TextField
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="standard"
            placeholder="Titles, people, genres"
            InputProps={{
              disableUnderline: true,
              style: { color: 'white' },
            }}
            sx={{ width: '300px' }}
          />
        )}
      </Box>

      <Popper
        open={isOpen && query.length > 2}
        anchorEl={searchRef.current}
        placement="bottom-start"
        style={{ width: '350px', zIndex: 1400 }}
      >
        <Paper
          sx={{
            bgcolor: '#141414',
            color: 'white',
            mt: 1,
            border: '1px solid #333',
          }}
        >
          {loading ? (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            results.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  gap: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#333' },
                }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: '45px', height: '68px', objectFit: 'cover' }}
                />
                <Box>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                  <Typography variant="caption" color="gray">
                    {new Date(movie.release_date).getFullYear()}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Paper>
      </Popper>
    </Box>
  );
};