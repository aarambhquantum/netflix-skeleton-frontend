import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Rating, Chip, CircularProgress } from '@mui/material';
import { Play, Plus } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { getMovieDetails } from '../services/api';
import { Movie } from '../types/movie';

export const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const data = await getMovieDetails(id);
          setMovie(data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return <Typography>Movie not found</Typography>;
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: -1,
          },
        }}
      >
        <Box
          sx={{
            pt: '100px',
            px: 4,
            display: 'flex',
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: '300px',
              height: '450px',
              flexShrink: 0,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              {movie.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Rating value={movie.vote_average / 2} readOnly precision={0.5} />
              <Typography>({movie.vote_average.toFixed(1)})</Typography>
              <Typography>•</Typography>
              <Typography>{new Date(movie.release_date).getFullYear()}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<Play />}
                sx={{
                  bgcolor: 'white',
                  color: 'black',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
                }}
              >
                Play
              </Button>
              <Button
                variant="contained"
                startIcon={<Plus />}
                sx={{
                  bgcolor: 'rgba(109, 109, 110, 0.7)',
                  '&:hover': { bgcolor: 'rgba(109, 109, 110, 0.4)' },
                }}
              >
                My List
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 2 }}>
              Overview
            </Typography>
            <Typography sx={{ mb: 4, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              {movie.overview}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {movie.genre_ids?.map((genreId) => (
                <Chip
                  key={genreId}
                  label={genreId}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};