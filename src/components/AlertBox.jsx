import React, { useContext } from 'react'
import { CommonContext } from '../contexts/CommonContext'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Outlet } from 'react-router-dom'
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AlertBox() {
  const { alert, alertText, setAlert, popup, setPopup } = useContext(CommonContext)

  const handleClose = () => {
    setAlert(false)
    setPopup(false)
  }


  return (
    <>
      <Dialog open={alert} onClose={handleClose}>
        {
          popup ? 
          <>
            <Box sx={{padding:'10px'}}>
              <Box sx={{textAlign:'right', marginBottom:'5px', cursor:'pointer'}}  onClick={handleClose}>
                <CloseIcon />
              </Box>
                {alertText}
            </Box>
          </>
          :
          <>
            <DialogTitle>
              Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {alertText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </> 
        }
      </Dialog>
      <Outlet />
    </>
  )
}

export default AlertBox
