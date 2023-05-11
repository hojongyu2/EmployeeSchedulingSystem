import * as React from 'react';
import { userSignOut } from '../../utilities/userAuthAxios';
import { useNavigate } from 'react-router';
import { Button, Link } from '@mui/material';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';



export default function Header() {
  const {user, setUser} = useContext(userContext)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate()
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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!user && <MenuItem onClick={handleMenuCloseAndLogIn}>Log In</MenuItem>}
      {user && <MenuItem onClick={handleMenuClose}>Profile</MenuItem>}
      {user && <MenuItem onClick={handleMenuCloseAndLogout}>Logout</MenuItem>}
    </Menu>
  );

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
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
