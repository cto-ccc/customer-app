import { Box } from '@mui/material'
import React from 'react'

function AppBlocker() {
  return (
    <Box
      sx={{width:'100vw', height:'100vh', zIndex:'10000', background:'#FFF0D9'}}>AppBlocker</Box>
  )
}

export default AppBlocker