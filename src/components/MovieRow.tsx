import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Movie } from '../types/movie';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, px: 2 }}>
        {title}
      </Typography>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 3, spaceBetween: 10 },
          640: { slidesPerView: 4, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 10 },
          1280: { slidesPerView: 6, spaceBetween: 10 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={`${title}-${movie.id}`}>
            <Box
              onClick={() => navigate(`/movie/${movie.id}`)}
              sx={{
                position: 'relative',
                paddingTop: '150%',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};