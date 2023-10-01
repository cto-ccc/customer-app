import { Box, CircularProgress, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import cccLogo from '../assets/ccc-logo.png'
import { CommonContext } from '../contexts/CommonContext'

const styles = {
  logoImg : {
    width:'max-content'
  }
}
function AppBlocker() {

  const {updatePercent} = useContext(CommonContext)

  return (
    <Box
      sx={{width:'100vw', height:'100vh', zIndex:'10000', 
            background:'#FFF0D9'}}>
        <Box sx={{paddingTop:'5vh',  display:'flex', flexDirection:'column', alignItems:'center'}}>
        <img src={cccLogo} style={styles.logoImg}/>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', mb:2}}>
          <CircularProgress  variant="determinate" size={100} value={updatePercent} sx={{color:'#a4243d', padding:'20px'}} />
          <Typography color='#a4243d' sx={{position:'absolute', fontFamily:'Foregen', fontSize:'35px'}}>
            {`${Math.round(updatePercent)}%`}
          </Typography>
        </Box>
        <Box sx={{fontFamily:'Foregen', color:'#a4243d', fontSize:'25px'}}>
          <Box sx={{textAlign:'center', mb:1}}>
          Please Wait...
          </Box>
          <Box>
          Your app is updating.
          </Box>
        </Box>
        </Box>
        
    </Box>
  )
}

export default AppBlocker