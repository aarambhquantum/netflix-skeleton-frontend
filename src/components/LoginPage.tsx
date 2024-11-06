import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/browse');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              padding: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: '#E50914', mb: 4, fontWeight: 'bold', textAlign: 'center' }}
            >
              STREAMFLIX
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                variant="filled"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2, input: { color: 'white' } }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="filled"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2, input: { color: 'white' } }}
              />
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#E50914',
                  '&:hover': { bgcolor: '#b2070f' },
                  py: 1.5,
                }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};