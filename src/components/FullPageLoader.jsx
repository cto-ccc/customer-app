import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import BottomNavBar from './BottomNavBar';
import { Capacitor } from '@capacitor/core';
import AppBlocker from './AppBlocker';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const styles = {
  loader : {
    position : 'fixed',
    background : 'white',
    opacity:0.6,
    left : '0',
    top : '0',
    bottom : '0',
    right:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:1400,
    flexDirection:'column'
  }
}
function FullPageLoader() {
  const {loader, loadingText, snackbar, hideSnackbar, snackbarText, snackbarType, setSnackbarType, isDesktop, blocker } = useContext(CommonContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    hideSnackbar()
    setSnackbarType('success')
  };

  return (
    <>
      {
        loader ? 
        <div style={styles.loader}> 
        <Box sx={{ display: 'flex', marginBottom:2 }}>
          <CircularProgress />
        </Box>
          { loadingText }
        </div> 
        : null
      }
      {
        <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
            {snackbarText}
          </Alert>
        </Snackbar>        
      }

      
      {
        blocker ? 
        <AppBlocker /> : 
        <Box sx={{paddingBottom: Capacitor.getPlatform() == 'web' ? null : '20vw', 
                  paddingTop : Capacitor.getPlatform() == 'ios' ? '4vh' : ''}}>
          <Outlet />
        </Box>
      }
      {
        (Capacitor.getPlatform() == 'web' || blocker) ? null : <BottomNavBar />
      }
      
    </>
    )
}

export default FullPageLoader
