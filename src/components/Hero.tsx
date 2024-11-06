import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  movie: {
    title: string;
    backdrop_path: string;
    overview: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ movie }) => {
  return (
    <Box
      sx={{
        height: '80vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '7.5rem',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6), #141414)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: -1,
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
      </Box>
      
      <Box sx={{ ml: 4, maxWidth: '40%', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}>
            {movie.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'white' }}>
            {movie.overview}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Play />}
              sx={{
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.75)',
                },
              }}
            >
              Play
            </Button>
            <Button
              variant="contained"
              startIcon={<Info />}
              sx={{
                bgcolor: 'rgba(109, 109, 110, 0.7)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(109, 109, 110, 0.4)',
                },
              }}
            >
              More Info
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};