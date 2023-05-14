import * as React from 'react';
import { userSignOut } from '../../utilities/userAuthAxios';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { Link } from "react-router-dom";

import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';


export default function Header() {
  const { user, setUser } = useContext(userContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseAndLogIn = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate('/login')
  };

  const handleMenuCloseAndLogout = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    const response = await userSignOut()
    if (response.detail === 'Logged out successfully') {
      // remove a key named currentUser when logout function is properly activated
      localStorage.clear();
      setUser('')
      navigate('/')
    }

  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       {!user && <MenuItem onClick={handleMenuCloseAndLogIn}>Log In</MenuItem>}
//       {user && <MenuItem onClick={handleMenuClose}>Profile</MenuItem>}
//       {user && <MenuItem onClick={handleMenuCloseAndLogout}>Logout</MenuItem>}
//     </Menu>
//   );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button sx={{color:'black'}}>create event</Button>
      </MenuItem>
      <MenuItem>
        <Button sx={{color:'black'}}>Send Request</Button>
      </MenuItem>
      <MenuItem>
        <Button sx={{color:'black'}}>Students List</Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, width:'100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Link href='/'>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: 'block' }, color:'white' }}
            >
              MUI
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
            <Link href='/#/create-event'>
              <Button sx={{color:'white'}}>create event</Button>
            </Link>
            <Link href='/#/request'>
              <Button sx={{color:'white'}}>Send Request</Button>
            </Link>
            <Button sx={{color:'white'}}>Students List</Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{color:'white'}}>{user && user.first_name}</Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
              <Link href='/#/create-event'>
                <Typography textAlign="center">Create Event</Typography>
              </Link>
              <Link href='/#/request'>
                <Typography textAlign="center">Send Request</Typography>
              </Link>
              <Button>Students List</Button>
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
            <ButtonGroup variant="text" aria-label="text button group">
              <Button href='/#/create-event'>
                <Typography textAlign="center">Create Event</Typography>
              </Button>
              <Button href='/#/request'>
                <Typography textAlign="center">Send Request</Typography>
              </Button>
              <Button href='/#/request'>
                <Typography textAlign="center">Students List</Typography>
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user && user.first_name} src="/static/images/avatar/2.jpg" />
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
              {!user && <MenuItem onClick={handleMenuCloseAndLogIn}>
                <Typography textAlign="center">Log In</Typography>
              </MenuItem>}
              {user && <MenuItem onClick={handleMenuClose}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>}
              {user && <MenuItem onClick={handleMenuCloseAndLogout}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;