import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isScrolled ? '#141414' : 'transparent',
        backgroundImage: isScrolled ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)',
        boxShadow: 'none',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Typography
            variant="h6"
            onClick={() => navigate('/browse')}
            sx={{
              color: '#E50914',
              fontWeight: 'bold',
              fontSize: '1.8rem',
              cursor: 'pointer',
            }}
          >
            STREAMFLIX
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
              <Typography
                key={item}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <SearchBar />
          <Bell color="white" size={24} style={{ cursor: 'pointer' }} />
          <Avatar
            onClick={handleMenu}
            sx={{ width: 32, height: 32, cursor: 'pointer' }}
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80"
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};