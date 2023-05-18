import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function ErrorAlertBar({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You need to sign in again"
        action={action}
        severity="error"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      Your session has expired. Please sign in again.
    </Alert>
    </Snackbar>
  );
}
