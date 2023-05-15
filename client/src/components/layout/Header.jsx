import * as React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/userContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';

const pageUrls = {
  'Create Event': '/create-event',
  'Volunteer Signup': '/request'
};

const profileDropdown = {
  'Log In': () => {
    // Function call for Profile
    console.log('login function called');
  },
  'Profile': () => {
    // Function call for Account
    console.log('profile function called');
  },
  'Log Out': () => {
    // Function call for Dashboard
    console.log('logout function called');
  }
};

function ResponsiveAppBar() {
  const { user, setUser } = useContext(userContext)

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
              {Object.keys(pageUrls).map((page, url) => (
                <MenuItem key={page} component={Link} to={url}>
                  <ListItemIcon>
                    <Icon>people</Icon>
                  </ListItemIcon>
                  {page}
                </MenuItem>
              ))}
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
              if (page !== 'Create Event') {
                <Button
                  key={page}
                  sx={{ my: 2, display: 'block' }}
                >
                  <Link to={pageUrls[page]}>
                    {page}
                  </Link>
                </Button>
              } else if (user) {
                <Button
                  key={page}
                  sx={{ my: 2, display: 'block' }}
                >
                  <Link to={pageUrls[page]}>
                    {page}
                  </Link>
                </Button>
              }
            })}
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {Object.keys(profileDropdown).map((name, index) => {
                if (user && name !== 'Log In') {
                  return (
                    <MenuItem key={name} onClick={profileDropdown[name]}>
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  );
                }
                else if (name === 'Log In') {
                  return (
                    <MenuItem key={name} onClick={profileDropdown[name]}>
                      <Typography textAlign="center">{name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
