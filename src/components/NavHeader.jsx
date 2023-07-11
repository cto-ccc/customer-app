import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CommonContext } from '../contexts/CommonContext';

const styles = {
  headerCont : {
    position:'fixed',
    top:0,
    left:0,
    alignItems:'center',
    padding:'0 4vw',
    boxShadow:'0px 0px 3px 1px #eaeaea',
    display:'flex',
    height:'7vh',
    zIndex:3,
    width:'100vw',
    background:'white'
  }
}

function NavHeader() {

  const {isDesktop} = useContext(CommonContext)

  const goBack = () => {
    window.history.back()
  }

  return (
    <>
      {
        isDesktop ? null : 
        <Box style={styles.headerCont}> 
          <ArrowBackIosIcon onClick={() => goBack()} /> 
        </Box>
      }
    </>

  )
}

export default NavHeader