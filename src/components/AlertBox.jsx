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
  const { alert, alertText, setAlert, popup, setAlertText } = useContext(CommonContext)

  const handleClose = () => {
    setAlert(false)
  }


  return (
    <>
      <Dialog open={alert} onClose={handleClose}>
        {
          popup ? 
          <Box sx={{padding:'5px'}}>
            <Box sx={{textAlign:'right', cursor:'pointer'}}>
              <CloseIcon onClick={handleClose} />
            </Box>
            <Box>
              {alertText}
            </Box>
          </Box>
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
              <Button onClick={handleClose}>
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
