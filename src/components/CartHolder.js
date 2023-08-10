import React, { useContext } from 'react'
import { Box} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import { Capacitor } from '@capacitor/core'


const styles = {
  cartViewCont : {
    position : 'fixed',
    bottom:'2vh',
    boxShadow:'0px 0px 8px 0px #666666',
    width:'90vw',
    padding:'15px',
    background:'#a4243d',
    color:'white',
    borderRadius:'10px',
    display:'flex',
    justifyContent:'space-between',
    zIndex:3,
    maxWidth:'500px'
  },
  cartContDesk : {
    display:'flex', 
    justifyContent:'center', 
    height:"11vh", 
    background:'white',
    position:'fixed',
    bottom:0,
    left:'30%',
    width:'40vw',
    zIndex:3,
    borderRadius:'10px 10px 0 0',
    cursor:'pointer'
  },
  cartCont : {
    display:'flex', 
    justifyContent:'center'
  }
}

function CartHolder() {

  const navigate = useNavigate()
  const { updateCart, cartData, isDesktop } = useContext(CommonContext)

  return (
    <>
      {
        cartData && cartData.totalCount && Capacitor.getPlatform() == 'web' ?
        <Box style={isDesktop ? styles.cartContDesk : styles.cartCont}
          onClick={() => navigate(`/cart`)}>
          <Box style={styles.cartViewCont}>
            <Box>
              {cartData.totalCount} Items | ₹ {cartData.totalAmount}
            </Box>
            <Box>
              View Cart
            </Box>
          </Box>
        </Box> : null
      }

      <Outlet />
    </>
  )
}

export default CartHolder