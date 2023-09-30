import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton'

const styles = {
  loader : {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    height:'100vh'
  }
}

function ComponentLoader({title}) {
  return (

    <Box sx={{paddingTop:'5vh'}}>
      <Skeleton variant="rectangular" sx={{ bgcolor: '#ffe9c6', borderRadius:'10px' }} height={248} animation="wave" />
      <Skeleton variant="rectangular" sx={{ bgcolor: '#ffe9c6', borderRadius:'10px', marginTop:'20px' }} height={148} animation="wave" />
      <Skeleton variant="rectangular" sx={{ bgcolor: '#ffe9c6', borderRadius:'10px' , marginTop:'20px'}} height={248} animation="wave" />
    </Box> 

    // <div style={styles.loader}> 
    //   <Box sx={{ display: 'flex', marginBottom:2 }}>
    //     <CircularProgress />
    //   </Box>
    //   {title || 'Loading...'}
    // </div> 
  )
}

export default ComponentLoader
