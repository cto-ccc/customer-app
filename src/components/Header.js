import React, { useContext, useState } from 'react'
import { Box, Button} from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import User from '../assets/user.png'
import HomeLogo from '../assets/home-logo.png'
import { AuthContext } from '../contexts/AuthContext'
import { CommonContext } from '../contexts/CommonContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Capacitor } from '@capacitor/core'
import Footer from '../Footer'
import LandingLogo from '../assets/lan-logo.png'
import CartLogo from '../assets/lan-cart.png'
import SearchLogo from '../assets/lan-search.png'
import UserLogo from '../assets/lan-profile.png'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

const styles = {
  navbar : {
    height : '10vh',
    // borderBottom : '1px solid #b1b1b1',
    position:'fixed',
    top:'0',
    width:'92vw',
    background:'#a4243d',
    zIndex:'2',
    // boxShadow: '0px 0px 5px 0px #7e7e7e',
    padding:'0 4vw',
    display:'flex',
    color:'white',
    justifyContent:'space-between',
    alignItems:'center'
  },
  homeLogo : {
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
  },
  lanNavIcon : {
    width:'25px',
    height:'25px',
    marginRight:'20px',
    cursor:'pointer'
  },
  lanProfIcon : {
    width:'20px',
    height:'25px',
    marginRight:'20px',
    cursor:'pointer'
  },
  menuItem : {
    fontWeight:'bold',
    margin:'10px 0',
    cursor:'pointer',
    paddingLeft:'5vw'
  },
  menuSubItem : {
    margin:'10px 0',
    cursor:'pointer',
    paddingLeft:'5vw'
  }
}

function Header() {

  const navigate = useNavigate()
  const location = useLocation()
  const { isUserLoggedIn, getCustomerIdFromCache } = useContext(AuthContext)
  const { updateCart, cartData, isDesktop } = useContext(CommonContext)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [itemsData, setItemsData] = useState([])
  const [allItemsData, setAllItemsData] = useState([])
  const [filteredItemsData, setFilteredItemsData] = useState([])
  const [anchor, setAnchor] = useState(false)

  const searchProductsEvent = (value) => {

    if (!value) {
      setFilteredItemsData([])
      return
    }

    const newItemsData = allItemsData.filter((item) => item.name.split(" ").join("").toLowerCase()
                                              .match(value.toLowerCase().split(" ").join("")))
    setFilteredItemsData(newItemsData)
  }

  const closeSearch = () => {
    setShowSearchBar(false)
    setFilteredItemsData([])
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      setAnchor(false)
    }else
    setAnchor(open)
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <Divider />
      <List>
        <ListItem key={'text'} disablePadding>
          <ListItemButton>
            Help
            <ListItemText primary={'text'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

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

          <Box sx={{display:'flex', fontFamily:'Foregen', alignItems:'center', fontSize:'20px'}}>

            <Box p={2} onClick={() => setAnchor(true)} style={styles.navItem}>
              <MenuIcon />
            </Box>
            <Box p={2} onClick={() => navigate('/home')} style={styles.navItem}>
              SHOP
            </Box>

            <Box p={2} onClick={() => navigate('/stores')} style={styles.navItem}>
              OUR STORES
            </Box>
          </Box>

          <Box>
            <Box onClick={() => navigate('/')}>
              <img src={LandingLogo} style={styles.homeLogo}/>
            </Box>
          </Box>
          

          <Box sx={{display:'flex', width:'15vw', justifyContent:'end'}}>
            
            {/* <Box p={2} onClick={() => navigate('/')} style={styles.navItem}>
              Home
            </Box>
            <Box p={2} onClick={() => navigate('/aboutUs')} style={styles.navItem}>
              About Us
            </Box>
            <Box p={2} onClick={() => navigate('/recipies')} style={styles.navItem}>
              Our Recipes
            </Box>
            <Box onClick={() => goToProfile()} p={2} style={styles.navItem}>
              { getCustomerIdFromCache() ? 'My Orders' : 'Login / SignUp'} 
            </Box>
            <Box p={2} onClick={() => navigate('/cart')} style={styles.cartCont}>
              <ShoppingCartIcon 
                sx={{fontSize:'18px', paddingRight:'5px', marginRight:'5px', color:'#a4243d'}} />
              Cart
            </Box> */}

{
              showSearchBar ? 
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'30vw'}}>
                <Box sx={{display:'flex', alignItems:'center', padding:'0 10px', width:'30vw', justifyContent:'flex-end'}}>
                  <TextField
                    size='small'
                    placeholder="Search Products"
                    variant="outlined"
                    type="text"
                    autoComplete='off'
                    name="searchProducts"
                    inputProps={{
                      style: {
                        height : '20px',
                        background:'white',
                        padding: '3px 14px',
                        borderRadius:'5px'
                      },
                  }}
                    autoFocus
                    onChange={(event) => {
                      searchProductsEvent(event.target.value);
                    }}
                  />
                  <CloseIcon onClick={() => closeSearch()} sx={{cursor:'pointer', marginRight:'15px'}}/>
                </Box>
                {
                  filteredItemsData.length ?
                  <Box sx={{display:'flex', position:'absolute', top:'10vh', 
                    background:'white', width:'30vw', justifyContent:'flex-end', flexDirection:'column' }}>
                    {
                      filteredItemsData.map((item) => {
                        return (
                          <Box sx={{padding:'10px', borderBottom:'2px solid white', cursor:'pointer', background:'#f3f3f3'}}
                            onClick={() => navigate(`/products/${item.urlId}`, {state : item})}>
                            {item.name} ({item.qty})
                          </Box>
                        )
                      })
                    }
                  </Box> : null
                }
                
              </Box>
               : 
              // <Box p={2} onClick={() => setShowSearchBar(true)} style={styles.navItem}>
                  <img src={SearchLogo} style={styles.lanNavIcon} onClick={() => setShowSearchBar(true)}/>
              // </Box>
            }

            <img src={UserLogo} onClick={() => goToProfile()} style={styles.lanProfIcon}/>
            <img src={CartLogo} onClick={() => navigate('/cart')} style={styles.lanNavIcon}/>
          </Box>


          <React.Fragment key={'left'}>
            <Drawer
              anchor={'left'}
              open={anchor}
              onClose={toggleDrawer(false)}
            >
              <Box sx={{width:'20vw', background:'#a4243d', height:'100%', color:'#FFF0D9'}}>
                <Box sx={{background:'#f9f8f8', fontFamily:'Foregen', color:'#a4243d', 
                          fontSize:'30px', padding:'10px 5vw', marginBottom:'30px', cursor:'pointer'}}
                          onClick={() => navigate('/profile')}>

                  My Orders
                </Box>
               
                <Box style={styles.menuItem}
                  onClick={() => navigate('/home')}>
                  Our Offerings
                </Box>
                <Box style={styles.menuItem}
                  onClick={() => navigate('/aboutUs')}>
                  About Us
                </Box>
                <Box style={styles.menuItem}
                  onClick={() => navigate('/stores')}>
                  Our Stores
                </Box>
                <Box style={styles.menuItem}
                  onClick={() => navigate('/recipies')}>
                  Our Recipies
                </Box>

                <Box sx={{margin:'50px 0 10px 0', paddingLeft:'5vw', cursor:'pointer'}}
                  onClick={() => navigate('/cart')}>
                  Cart
                </Box>
                <Box style={styles.menuSubItem}
                  onClick={() => navigate('/contactus')}>
                  Contact Us
                </Box>
                <Box style={styles.menuSubItem}>
                  FAQ's
                </Box>
                <Box style={styles.menuSubItem}
                  onClick={() => navigate('/ccc-blogs')}>
                  Blog
                </Box>
              </Box>
            </Drawer>
          </React.Fragment>

          </Box> : null
      }

      <Outlet />
      {
        (isDesktop && location.pathname!='/home' )? <Footer /> : null
      } 
    </Box>
  )
}

export default Header