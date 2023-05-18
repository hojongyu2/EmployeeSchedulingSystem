import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Icon,
  ListItemIcon,
  Badge,
  styled,
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

import { userContext } from '../context/userContext';
import './Header.styles.css';



const pageUrls = {
  'Create Event': '/create-event',
  'Volunteer Signup': '/request'
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#ddd',
    color: '#fff',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

function ResponsiveAppBar(props) {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const { themeLight, handleThemeChange } = props;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signout = async () => {
    setAnchorElUser(null);
    handleCloseUserMenu();
    const response = await userSignOut()
    if (response.detail === 'Logged out successfully') {
      // remove a key named currentUser when logout function is properly activated

    }
  }

  const profileDropdown = {
    'Login': () => {
      navigate('/login')
    },
    'Logout': () => {
      setAnchorElUser(null);
      handleCloseUserMenu();
      localStorage.clear();
      setUser(null);
      navigate('/');
    }
  };


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHIFT
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleThemeChange}>
                {themeLight ? 'Dark Mode' : 'Light Mode'}
              </MenuItem>
              {Object.keys(pageUrls).map((page, i) => {
              if (!user && page !== 'Create Event') {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <Link to={pageUrls[page]}>
                      {page}
                    </Link>
                  </Button>
                );
              } else if (user) {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <Link to={pageUrls[page]}>
                      {page}
                    </Link>
                  </Button>
                );
              }
            })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SHIFT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(pageUrls).map((page, i) => {
              if (!user && page !== 'Create Event') {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <Link to={pageUrls[page]}>
                      {page}
                    </Link>
                  </Button>
                );
              } else if (user) {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, display: 'block' }}
                  >
                    <Link to={pageUrls[page]}>
                      {page}
                    </Link>
                  </Button>
                );
              }
            })}
            <MenuItem onClick={handleThemeChange}>
              {themeLight ? 'Dark Mode' : 'Light Mode'}
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt={user.first_name.toUpperCase()} src="/static/images/avatar/1.jpg" />
                  </StyledBadge>
                ) : (
                  <Avatar alt="" src="/static/images/avatar/1.jpg" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user && profileDropdown['Logout'] ? (
                <MenuItem key="Logout" onClick={profileDropdown['Logout']}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : null}
              {!user && profileDropdown['Login'] ? (
                <MenuItem key="Login" onClick={profileDropdown['Login']}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              ) : null}
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

ResponsiveAppBar.propTypes = {
  themeLight: PropTypes.bool.isRequired,
  handleThemeChange: PropTypes.func.isRequired,
};

export default ResponsiveAppBar;
