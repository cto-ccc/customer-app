import React, { useContext } from 'react'
import { Box} from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import User from '../assets/user.png'
import HomeLogo from '../assets/home-logo.png'
import { AuthContext } from '../contexts/AuthContext'
import { CommonContext } from '../contexts/CommonContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Capacitor } from '@capacitor/core'
import Footer from '../Footer'

const styles = {
  navbar : {
    height : '10vh',
    borderBottom : '1px solid #b1b1b1',
    position:'fixed',
    top:'0',
    width:'92vw',
    background:'white',
    zIndex:'2',
    boxShadow: '0px 0px 5px 0px #7e7e7e',
    padding:'0 4vw',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  homeLogo : {
    width:'200px',
    height:'7.5vh',
    cursor:'pointer'
  },
  userLogo : {
    width:'11vw',
    height:'11vw',
    maxWidth:'50px',
    maxHeight:'50px',
    border:'1px solid #eaeaea',
    padding:'2px',
    borderRadius:'50%'
  },
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
  navItem : {
    cursor:'pointer',
    padding:'10px'
  },
  cartCont : {
    cursor:'pointer',
    padding:'10px 20px',
    borderRadius:'10px',
    border:'1px solid #a4243d',
    display:'flex',
    alignItems:'center',
    color:'#a4243d',
    marginLeft:'10px'
  }
}

function Header() {

  const navigate = useNavigate()
  const location = useLocation()
  const { isUserLoggedIn } = useContext(AuthContext)
  const { updateCart, cartData, isDesktop } = useContext(CommonContext)


  async function goToProfile() {
    if (await isUserLoggedIn()) {
      navigate('/profile')
    } else {
      navigate('/auth')
    }
  }

  return (
    <Box>
      {
        isDesktop ? 
        <Box style={styles.navbar}>
          <Box>
            <Box onClick={() => navigate('/')}>
              <img src={HomeLogo} style={styles.homeLogo}/>
            </Box>
          </Box>
          <Box sx={{display:'flex'}}>
            <Box p={2} onClick={() => navigate('/')} style={styles.navItem}>
              Home
            </Box>
            <Box p={2} onClick={() => navigate('/aboutUs')} style={styles.navItem}>
              About Us
            </Box>
            <Box p={2} onClick={() => navigate('/recipies')} style={styles.navItem}>
              Our Recipies
            </Box>
            <Box onClick={() => goToProfile()} p={2} style={styles.navItem}>
              Profile
            </Box>
            <Box p={2} onClick={() => navigate('/cart')} style={styles.cartCont}>
              <ShoppingCartIcon 
                sx={{fontSize:'18px', paddingRight:'5px', marginRight:'5px', color:'#a4243d'}} />
              Cart
            </Box>
          </Box>
          </Box> : null
      }

      <Outlet />
      {
        (isDesktop && location.pathname!='/' )? <Footer /> : null
      } 
    </Box>
  )
}

export default Header