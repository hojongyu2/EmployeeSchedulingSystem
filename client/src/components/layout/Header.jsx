import * as React from 'react';
import { userSignOut } from '../../utilities/userAuthAxios';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { Link } from "react-router-dom";

import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const Header = () => {
  const {user, setUser} = useContext(userContext)
  const navigate = useNavigate()
  
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

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <Button>create event</Button>
//       </MenuItem>
//       <MenuItem>
//         <Button>Send Request</Button>
//       </MenuItem>
//       <MenuItem>
//         <Button>Students List</Button>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1, width:'100%' }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Link href='/'>
//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{ display: { sm: 'block' }}}
//             >
//               MUI
//             </Typography>
//           </Link>
//           <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
//             <Link href='/#/create-event'>
//               <Button sx={{}}>create event</Button>
//             </Link>
//             <Link href='/#/request'>
//               <Button sx={{}}>Send Request</Button>
//             </Link>
//             <Button sx={{}}>Students List</Button>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />
//           <Typography sx={{}}>{user && user.first_name}</Typography>
//           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//           </Box>
//           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </Box>
//   );
// }

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
              letterSpacing: '.3rem',
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