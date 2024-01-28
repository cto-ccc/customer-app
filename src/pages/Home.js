import SteriodFreeImg from '../assets/antibiotic-and-steriod-free-hens.png'
import FreeRangeHens from '../assets/free-range-hens.png'
import NoForceFeeding from '../assets/no-force-feeding-hens.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ComponentLoader from '../components/ComponentLoader'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import Eggs from '../assets/eggs.png'
import HomeBanner1 from '../assets/banner1.png'
import HomeBanner2 from '../assets/banner2.png'
import HomeBanner3 from '../assets/banner3.png'

import HomeBanner4 from '../assets/desk-banner1.png'
import HomeBanner5 from '../assets/desk-banner2.png'
import HomeBanner6 from '../assets/desk-banner3.png'
import OfferBanner1 from '../assets/offer-banner1.png'
import OfferBanner2 from '../assets/offer-banner2.png'


import User from '../assets/user.png'
import HomeLogo from '../assets/home-logo.png'
import { useState, useContext, useEffect } from 'react';
import { CommonContext, CommonProvider } from '../contexts/CommonContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext';
import Offers from '../assets/offers.gif'
import { Geolocation } from '@capacitor/geolocation';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { Preferences } from '@capacitor/preferences';


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import FooterLogo from '../assets/lan-footer.png'

import * as React from 'react';
import { getCustomizedProducts, getImgMap, getLanding, getMetaData, handleDeviceToken, logAction } from '../services/api';
import { Capacitor } from '@capacitor/core';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import CatFreeRange1 from '../assets/land-cat-freerange.png'
import CatVillageBirds1 from '../assets/land-cat-village.png'
import CatMarinates1 from '../assets/land-cat-marinates.png'
import CatEggs1 from '../assets/land-cat-eggs.png'
import CatPickles1 from '../assets/land-cat-pickle.png'
import CatNutrisoft1 from '../assets/land-cat-nutrisoft.png'
import CccWhiteLogo from '../assets/ccc-white-logo.png'
import FavouriteLogo from '../assets/favourites.png'
import LandingLogo from '../assets/lan-logo.png'
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { App as CapApp } from '@capacitor/app';
import AppBlocker from '../components/AppBlocker';

import OfferPopup from '../assets/offer-popup.png'
import "../App.css"
import {
  PushNotifications,
} from '@capacitor/push-notifications';


const styles = {
  navbar : {
    height : '8vh',
    // borderBottom : '1px solid #b1b1b1',
    position:'fixed',
    top:'0',
    left:'0',
    width:'92vw',
    background:'#a4243d',
    zIndex:'2',
    // boxShadow: '0px 0px 5px 0px #7e7e7e',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  mainContent : {
    height : '100vh',
    paddingTop:'8vh'
  },
  mainContentDesk : {
    height : '100vh',
    paddingTop:'10vh'
  },
  whyccc: {
    background:'#a4243d',
    color:'white',
    display:'flex',
    padding:'4vw 2vw',
    textAlign:'center',
    marginTop:'30px'
  },
  contentImg: {
    minWidth:'200px',
    width:'20vw',
    marginBottom:'15px'
  },
  contentCont: {

  },
  productItem : {
    margin:'10px 15px 10px 10px',
    background:'#FFF5E8',
    borderRadius:'5px',
    width:'220px',
    height:'315px',
    boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)'
  },

  productItemDesk : {
    margin:'10px',
    background:'#FFF5E8',
    borderRadius:'5px',
    width:'230px',
    height:'320px',
    // marginRight:'25px',
    boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)'
  },

  productCatTitle : {
    padding:'5vw 6vw 5px', 
    fontSize:'20px', 
    fontWeight:'500',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'baseline',
    color:'#a4243d'
  },

  productCatTitleDesk : {
    padding:'35px 30px 5px 30px', 
    fontSize:'20px', 
    fontWeight:'500',
    color:'#a4243d'
  },


  productGridCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },  
  productImg : {
    height:'180px',
    width:'320px',
    borderRadius:'5px 5px 0 0'
  },
  productImgDesk : {
    height:'180px',
    width:'320px',
    borderRadius:'5px 5px 0 0'
  },

  productDescCont : {
    padding:'5px 15px',
    height:'120px',
    textAlign:'left',
    alignItems:'center',
    // background:'#ffebeb',
    borderRadius:'0px 0px 5px 5px',
    display:'grid',
    position:'relative',
    borderTop:'1px solid #eaeaea'
    // width:'170px'
  },
  mainBtn : {
    backgroundColor:'a4243d !important',
    '&:hover' : {
      background:'white'
    }
  },
  bannerImg: {
    width:'-webkit-fill-available',
    // margin:'20px',
    // borderRadius:'10px',
    height:'18vh'
  },
  bannerImgDesk: {
    width:'-webkit-fill-available',
    // margin:'25px',
    // borderRadius:'10px',
    height:'40vh'
  },
  incCont : {
    display : 'flex',
    justifyContent:'right',
    padding:'5px'
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
  homeLogo : {
    cursor:'pointer',
    height:'5vh'
  },
  posterImg : {
    width:'100%',
    height:'100px',
    marginBottom:'10px',
    boxShadow:'0 0 5px 0px #b3b1b1',
    borderRadius:'2px'
  },
  posterImgDesk : {
    width:'90%',
    marginBottom:'10px',
    boxShadow:'0 0 5px 0px #b3b1b1',
    borderRadius:'2px'
  },
  posterCont : {
    textAlign:'center',
    borderRadius:'10px',
    boxShadow:'0px 0px 10px 0px #eaeaea',
    margin:'0 5px'
  },

  posterContDesk : {
    padding:'10px 5px',
    textAlign:'center',
    width:'225px',
    height:'165px',
    color:'#a4243d',
    fontWeight:'bold',
    // background:'#ffebeb',
    // borderRadius:'10px',
    // boxShadow:'0px 0px 10px 0px #eaeaea',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    cursor:'pointer'
  },

  activeExtra : {
    background : '#F47F13',
    color:'white',
    borderRadius:'5px',
    padding:'7px 15px',
    cursor:'pointer',
    boxShadow:'1px 1px 5px 3px #eaeaea',
    display:'flex',
    alignItems:'baseline'
  },
  inactiveExtra : {
    padding:'8px 15px',
    cursor:'pointer',
    display:'flex',
    alignItems:'baseline',
    border:'1px solid #eaeaea',
    borderRadius:'5px'
  },
  disabled : {
    opacity:'0.5',
    pointerEvents:'none'
  },
  productCatCont : {
    display:'flex', 
    overflowX:'auto', 
    overflowY:'hidden', 
    marginBottom:'10px', 
    padding:'0 10px'
  },
  productCatContDesk : {
    display:'flex', 
    overflowX:'auto', 
    overflowY:'hidden', 
    marginBottom:'10px', 
    padding:'0 20px'
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
  offerImgDesk : {
    height:'150px',
    width:'450px',
    marginRight:'20px',
    borderRadius:'3px',
    cursor:'pointer'
  },
  offerImg : {
    height:'150px',
    width:'100%',
    // marginRight:'20px',
    borderRadius:'3px'
  },
  prodName : {
    textAlign:'left', 
    marginBottom:'3px', 
    fontWeight:'450', 
    fontSize:'15px', 
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    cursor:'pointer',
    "&:hover": {
      color:'#a4243d'
    }
  },
  prodImgCont : {
    textAlign:'center', 
    height:'180px',
    cursor:'pointer',
    position:'relative',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  discountCont : {
    background:'#a4243d',
    color:'white',
    top:'10px',
    fontSize:'13px',
    boxShadow:'0 0 5px -1px white',
    padding:'5px 8px',
    width:'min-content',
    position:'absolute',
    width:'auto',
    right:'0',
    borderRadius:'3px 0 0 3px'
  },
  topCatCont : {
    display:'inline-grid', 
    marginBottom:'20px',
    gridTemplateColumns: 'auto auto auto',
    width:'92vw',
    padding:'0 4vw'
  },
  topCatContDesk : {
    display:'flex', justifyContent:'center', padding:'0 10px', marginBottom:'6vw'
  },
  mobMenuItem : {
    padding:'10px 20px'
  },
  popupImg : {
    width:'80vw',
    maxWidth:'400px'
  },
  catTitleCont : {
    position: 'relative',
    overflow: 'hidden'
  },
  catTitle : {
    fontSize: '20px',
    lineHeight: '35px',
    cursor: 'pointer'
  },
  catDummyCont : {
    position: 'absolute',
    top: 0,
    height: '100%',
    left: '-100px',
    width: '30%',
    background: 'linear-gradient(to right, white, transparent 50%)',
    webkitTextFillColor: 'transparent',
    animation: 'shine 2.5s infinite',
    overflow: 'hidden'
  }
}

let updateData = null

function Home() {
  const navigate = useNavigate()
  const { updateCart, cartData, isDesktop, showAlert, showPopup, setBlocker, setUpdatePercent, clearCart, 
          setPopup, hideAlert, showSnackbar,landingPopupShown, setLandingPopupShown, clearCouponData } = useContext(CommonContext)
  const { isUserLoggedIn, getCustomerId, getUserId, getUserMobile } = useContext(AuthContext)
  const [anchor, setAnchor] = useState(false)
  const [sideNavAnchor, setSideNavAnchor] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSearchBar, setShowSearchBar] = useState(false)

  const [skinType, setSkinType] = useState('withskin')
  const [boneType, setBoneType] = useState('withBones')
  const [flavourType, setFlavourType] = useState('normal')
  const [cutType, setCutType] = useState('medium')

  const [selectedItem, setSelectedItem] = useState(null)

  const [itemsData, setItemsData] = useState([])
  const [allItemsData, setAllItemsData] = useState([])
  const [filteredItemsData, setFilteredItemsData] = useState([])

  const [latLong, setLatLong] = useState(null)
  const [metaData, setMetaData] = useState(getMetaData()['home'])
  const [hasOfferItems, setHasOfferItems] = useState(false)


  CapacitorUpdater.addListener('download', (event) => {
    console.log("***Download in progress***", JSON.stringify(event))
    setUpdatePercent(event.percent)
  })

  const requestForLocPermission = async() => {
    await Geolocation.requestPermissions('location').then(async(resp) => {
      if (resp.location == 'granted') {
        printCurrentPosition()
      } else {
        showAlert("Location permission is disabled. Please enable location to order from nearest store")
        const params = {
          packageVersion : process.env.REACT_APP_VERSION,
          platform       : Capacitor.getPlatform(),
          userMobile     : await getUserId()
        }
        getLandingData(params)
      }
    }).catch(async(err) => {
      showAlert("Location permission is disabled. Please enable location to order from nearest store")
      const params = {
        packageVersion : process.env.REACT_APP_VERSION,
        platform       : Capacitor.getPlatform(),
        userMobile     : await getUserId()
      }
      getLandingData(params)
    })
  }

  const printCurrentPosition = async() => {

    await Geolocation.getCurrentPosition()
    .then(async(resp) => {

      const params = {
        packageVersion : process.env.REACT_APP_VERSION,
        platform       : Capacitor.getPlatform(),
        userMobile     : await getUserId(),
        location       : {
          lat : resp.coords.latitude,
          lng : resp.coords.longitude
        }
      }
      getLandingData(params)

    })
    .catch((err) => {
      requestForLocPermission()
    })
  }

  const closePopup = async() => {

    if (await isUserLoggedIn()) {
      hideAlert()
      showSnackbar("Login successfull, continue to order")
    } else {
      hideAlert()
      navigate('/auth')
    }
  }

  async function getLandingData(params) {
    params.query = window.location.search
    getLanding(params).then(async(resp) => {
      if (window.location.pathname == '/home' || (!isDesktop && window.location.pathname == '/')) {
        if (resp.showLandingPopup && !landingPopupShown) {
          showPopup(<>
            <Box
              onClick={() => closePopup()}>
              <img src={OfferPopup} style={styles.popupImg} />
            </Box>
          </>)
          setLandingPopupShown(true)
        }
      }

  
      if (resp.action == 'UPDATE' && Capacitor.getPlatform() != 'web') {

        setBlocker(true)

        updateData = await CapacitorUpdater.download({
          version : resp.currVersion,
          url     : resp.newBuildUrl
        })
        
        await clearCart()
        await CapacitorUpdater.set(updateData)
        setBlocker(false)
      } else {
        
        if (Capacitor.getPlatform != 'web') {
          const deviceTokenResp = await Preferences.get({ key: 'deviceToken' })
          if (!deviceTokenResp?.value) {
            getDeviceToken()
          }
        }


        setItemsData(resp.productsData)
        let allCatItems = []
        resp.productsData.forEach((item) => {
          allCatItems = allCatItems.concat(item.data)
        })
        if(resp.clearCart) {
          await clearCart()
          await clearCouponData()
        } 
        setHasOfferItems(resp.hasOfferItems)
        setAllItemsData(allCatItems)
        setLoading(false)
      }

    }).catch((err) => {
      setLoading(false)
    })
  }

  async function addToCart(item) {
    if (getCustomizedProducts().includes(item.id)) {
      setSelectedItem(item)
      setAnchor(true)
    } else {
      updateCart(item, true)
    }
  }

  async function modifyCart(item, isIncrease) {
    updateCart(item, isIncrease)
  } 

  async function goToProfile() {
    if (await isUserLoggedIn()) {
      navigate('/profile')
    } else {
      navigate('/auth')
    }
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open)
  }

  const toggleSideNavDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setSideNavAnchor(open)
  }

  const downloadApp = () => {
    window.open('https://play.google.com/store/apps/details?id=com.countrychicken.customerapp', '_blank')
  }

  const modifySkinType = (type) => {
    setSkinType(type)
    if (type == 'skinless') {
      setFlavourType('normal')
    }
  }

  const modifyBoneType = (type) => {
    setBoneType(type)
  }

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

  const addItemFromExtras = () => {
    
    let activeItem = selectedItem

    activeItem.extras = {
      skinType    : skinType,
      flavourType : flavourType,
      cutType     : cutType,
      boneType    : boneType
    }
    updateCart(activeItem, true)
    setSelectedItem(null)
    setSkinType('withskin')
    setFlavourType('normal')
    setCutType('medium')
    setAnchor(false)
  }

  async function getLandingForIos() {
    const params = {
      packageVersion : process.env.REACT_APP_VERSION,
      platform       : Capacitor.getPlatform(),
      userMobile     : await getUserMobile(),
      customerId     : await getCustomerId()
    }
    getLandingData(params)
  }

  const getDeviceToken = () => {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register()
      } else {
        // Show some error
      }
    })

    PushNotifications.addListener('registration',
    async(token) => {
      const resp  = await handleDeviceToken({deviceId : token.value, mobileNo : await getUserMobile()})
      const resp1 = await Preferences.set({key: 'deviceToken', value: token.value})
    }
  )}

  const list = (anchor) => (
    <Box sx={{padding:'4vw'}}>
      <Box sx={{fontSize:'15px', fontWeight:'600', mb:2, color:'#a4243d', borderBottom:'1px solid #eaeaea'}}>
        Customize your order
      </Box>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Box>
          Chicken Type
        </Box>
        {
          selectedItem?.skinType ? 
          <>
            <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3}}>
              <Box sx={{mr:3}} style={skinType == 'withskin' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifySkinType('withskin')}>
                With Skin 
              </Box>
              <Box style={skinType == 'skinless' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifySkinType('skinless')}>
                Without Skin <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹100/-)</Box>  
              </Box>
            </Box>
          </> : null
        }
        {
          selectedItem?.boneType ? 
          <>
            <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3}}>
              <Box sx={{mr:3}} style={boneType == 'withBones' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifyBoneType('withBones')}>
                With Bone
              </Box>
              <Box style={boneType == 'boneless' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifyBoneType('boneless')}>
                Boneless <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹300/-)</Box>  
              </Box>
          </Box>
          </>
          : null
        }
        {
          selectedItem?.flavourType ? 
          <>
          <Box sx={{display:'flex', flexDirection:'column'}}
            style={skinType == 'withskin' ? null : styles.disabled}>
            <Box>
              Chicken Flavour
            </Box>
            <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3, alignItems:'center'}}>
              <Box style={flavourType == 'normal' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => setFlavourType('normal')}>
                Normal
              </Box>
              <Box sx={{display:'flex', alignItems:'center'}} style={flavourType == 'smoketurmeric' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => setFlavourType('smoketurmeric')}>
                Smoked & Turmeric <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹15/-)</Box>  
              </Box>
          </Box>
          </Box>
          </> : null
        } 
      </Box>

      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Box>
          Chicken Cut
        </Box>
        <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:4}}>
          <Box sx={{mr:3}} style={cutType == 'small' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setCutType('small')}>
            Small
          </Box>
          <Box style={cutType == 'medium' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setCutType('medium')}>
            Medium
          </Box>
          <Box style={cutType == 'biryani' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setCutType('biryani')}>
            Biryani Cut
          </Box>
       </Box>
        
      </Box>

      <Box sx={{mt:3, display:'flex', justifyContent:'flex-end'}}>
        <Button variant='contained'
          fullWidth
          onClick={() => addItemFromExtras()}>
          Add Item
        </Button>
      </Box>

    </Box>
  )


  useEffect(() => {
    logAction('PAGE_VIEW', 'home')
    // if (Capacitor.getPlatform() == 'ios') {
      //Immediate fix for ver 3 as there is no location access
    //   getLandingForIos()
    // } else {
    //   printCurrentPosition()
    // }
    logAction('APP_OPEN', Capacitor.getPlatform())
    getLandingForIos()
    
  }, [])

  return (
    <motion.div
      initial={{opacity:0}} 
      animate={{opacity:1}}
      exit={{x:-window.innerWidth, transition:{duration:isDesktop ? 0 : 0.1}}}>
      <Box>
        <Helmet>
          <title>{metaData.title}</title>
          <meta name='description' content={metaData.description} />
          <meta name='keywords' content={metaData.keywords} />
        </Helmet>
        {
          isDesktop ? <Header /> :
          null
        }
        
        {
          isDesktop ? 
          null : 
          <Box style={styles.navbar} sx={{padding : Capacitor.getPlatform() == 'ios' ? '5vh 4vw 0 4vw' : '0 4vw' }}>
            <Box onClick={() => setSideNavAnchor(true)}>
              <MenuIcon sx={{color:'#FFF0D9'}} />
            </Box>
            <Box onClick={() => navigate('/')}>
              <img src={LandingLogo} style={styles.homeLogo}/>
            </Box>
            <Box sx={{display:'flex'}}>
              <img src={FavouriteLogo} />
            </Box>
          </Box>
        }

      {
        loading ?
        <Box sx={{padding:'4vw'}}>
          <ComponentLoader />
        </Box>
         :
        <div style={isDesktop ? styles.mainContentDesk : styles.mainContent}>
            {
              isDesktop ? null : 
          
                <Box>
                  <Box sx={{display:'flex', alignItems:'center', padding:'0 10px',
                            height:'10vh',justifyContent:'flex-end'}}>
                    <OutlinedInput
                      size='small'
                      placeholder="Search on Country Chicken Co"
                      variant="outlined"
                      type="text"
                      autoComplete='off'
                      name="searchProducts"
                      fullWidth
                      sx={{borderRadius:'20px'}}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton edge="end">
                          <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      onChange={(event) => {
                        searchProductsEvent(event.target.value);
                      }}  
                    />
                </Box>

                {
                  filteredItemsData.length ?
                  <Box sx={{display:'flex', position:'absolute', top: Capacitor.getPlatform() == 'ios' ? '20vh' : '17vh', left:0, background:'white', 
                            width:'100vw', justifyContent:'flex-start', flexDirection:'column', zIndex:'333' }}>
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

          }
            
        <Box sx={{padding:isDesktop ? null : '0 4vw'}}>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{delay:3500, disableOnInteraction: false}}
            modules={[Pagination, Autoplay]}
            className= {isDesktop ? null : 'mySwiper' }
          >
            <SwiperSlide
              onClick={() => navigate('/categories/free-range-birds')}>
              <img src={isDesktop ? HomeBanner4 : HomeBanner1} style={isDesktop ? styles.bannerImgDesk : styles.bannerImg} />
            </SwiperSlide>
            <SwiperSlide
              onClick={() => navigate('/categories/eggs')}>
              <img src={isDesktop ? HomeBanner6 : HomeBanner3} style={isDesktop ? styles.bannerImgDesk : styles.bannerImg} />
            </SwiperSlide>
             <SwiperSlide
              onClick={() => navigate('/categories/eggs')}>
              <img src={isDesktop ? HomeBanner5 : HomeBanner2} style={isDesktop ? styles.bannerImgDesk : styles.bannerImg} />
            </SwiperSlide>
          </Swiper>
        </Box>
        
        <Box sx={{padding: isDesktop ? '3vw 3vw 1vw 2vw' : '20px 4vw' , fontSize:'20px', fontWeight:'bold', display:'grid', color:'#a4243d'}}>
          Categories
        </Box>
        <Box sx={isDesktop ? styles.topCatContDesk : styles.topCatCont}>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/nutrisoft-chicken')}>
            <img src={CatNutrisoft1} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
            {/* Nutrisoft Chicken */}
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/free-range-birds')}>
            <img src={CatFreeRange1} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
            {/* Free Range Birds */}
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/village-birds')}>
            <img src={CatVillageBirds1} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
            {/* Village Birds */}
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/eggs')}>
            <img src={CatEggs1} style={isDesktop ? styles.posterImgDesk : styles.posterImg}/>
            {/* Eggs */}
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/pickles')}>
            <img src={CatPickles1} style={isDesktop ? styles.posterImgDesk : styles.posterImg}/>
            {/* Pickles */}
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont}
            onClick={() => showAlert('Marinates are currently unavailable !')}>
            <img src={CatMarinates1} style={isDesktop ? styles.posterImgDesk :  styles.posterImg}/>
            {/* Marinates */}
          </Box>
        </Box>

        <Grid container sx={{display:'flex', justifyContent:'center'}}>
          <Grid xs={12} lg={6} sx={{textAlign:'right'}}>
            <img src={OfferBanner1} style={isDesktop ? styles.offerImgDesk : styles.offerImg} />
          </Grid>
          {
            Capacitor.getPlatform() == 'web' ? 
              <Grid xs={12} lg={6}>
                <img src={OfferBanner2} style={isDesktop ? styles.offerImgDesk : styles.offerImg}
                  onClick={() => downloadApp()}/>
              </Grid> : null
          }
        </Grid> 

        {
          itemsData.length && itemsData.map((category, index) => {
            return <Box key={index}>
            
            <Box style={isDesktop ? styles.productCatTitleDesk : styles.productCatTitle}>
              <Box style={styles.catTitleCont}>
                <Box style={styles.catTitle}>
                {category.title}
                </Box>
                <Box style={hasOfferItems && index == 0 ? styles.catDummyCont : null}>
                </Box>
              </Box>
              {
                isDesktop ? null : 
                <Box sx={{fontSize:'15px', display:'flex', alignItems:'center', color:'black'}}
                  onClick={() => navigate(`/categories/${category.id}`)}>
                  View All
                  <ArrowForwardIosIcon sx={{fontSize:'15px' }}/>
                </Box>
              }
            </Box>
            <Box style={isDesktop ? styles.productCatContDesk : styles.productCatCont}>
              {
                category.data.map((item) => {
                return (
                  <Box style={isDesktop ? styles.productItemDesk : styles.productItem} key={item.id}>
                    <Box sx={styles.prodImgCont}
                      onClick={() => navigate(`/products/${item.urlId}`, {state : item})}>
                      {/* <Box sx={styles.discountCont}>
                        {Math.trunc(((item.mrp - item.price) / item.mrp) * 100)}% Off
                      </Box> */}
                      <img src={getImgMap()[item.imgUrl]} style={isDesktop ? styles.productImgDesk : styles.productImg}/>
                    </Box>

                    <div style={styles.productDescCont}>
                      <Box sx={styles.prodName}
                        onClick={() => navigate(`/products/${item.urlId}`, {state : item})}>
                        {item.name}
                        {/* <Box sx={{fontSize:'15px', opacity:'0.4'}}>
                          {item.qty}
                        </Box> */}
                      </Box>
                      {
                        item.style ? 
                        <Box sx={{textAlign:'left', marginBottom:'5px',fontSize:'12px'}}>
                          ({item.style})
                        </Box> : null
                      }
                      
                      {/* <Box sx={{textAlign:'left', marginBottom:'5px', fontWeight:'450', fontSize:'15px'}}>
                        {item.qty}
                      </Box> */}

                      {
                        category.type == 'OFFER_PRODUCT' ? 
                        <>
                          <Box>
                            <Box sx={{fontSize:'12px', color:'#f47f13', borderLeft:'1px solid #eaeaea'}}>
                                <Box sx={{marginBottom:'15px'}}>Offer only for you</Box> 
                            </Box>
                              <Button variant="contained" style={styles.mainBtn} size='small' fullWidth 
                              onClick={() => navigate(`/products/${item.urlId}`)}>
                                Claim Now
                              </Button>  
                          </Box>
                        </> 
                        : 
                        <>
                          {
                            item.livePrice ? 
                            <Box sx={{fontSize:'10px', opacity:'0.5'}}>
                              Starting From
                            </Box> : null
                          }

                          <Box sx={{textAlign:'left', marginBottom:'5px', fontSize:'20px', display:'flex', alignItems:'end'}}>
                            ₹ {item.livePrice || item.price}
                            {
                              item.enableBogo ? null : 
                              <Box sx={{fontSize:'13px', marginLeft:'5px', opacity:'0.2'}}>
                              {/* {
                                item.mrp ? <s>₹ {item.mrp}</s> : null
                              } */}
                              </Box> 
                            }
                          
                            {/* <Box sx={{fontSize:'12px', marginLeft:'5px', color:'#f47f13', borderLeft:'1px solid #eaeaea', paddingLeft:'5px'}}>
                            {
                              item?.enableBogo ? 
                                <Box sx={{marginBottom:'5px'}}>Buy One Get One FREE</Box> : 
                                <>{item.mrp ? <>{Math.trunc(((item.mrp - (item.livePrice || item.price)) / item.mrp) * 100)} % Off</>  : null}</>
                            }                    
                            </Box> */}
                          </Box>

                          {
                            cartData && cartData[item.id] && cartData[item.id].count ?
                            <Box style={styles.incCont}>
                              <Box sx={{border:'1px solid #dddddd', 
                                        display:'flex', 
                                        borderRadius:'5px', 
                                        
                                        background:'white', border:'1px solid #c3c3c3'}}>
                                <Box onClick={() => modifyCart(item, false)}
                                  sx={{padding:'5px 10px 5px 10px', fontSize:'15px', cursor:'pointer'}}>
                                  -
                                </Box>
                                <Box sx={{padding:'5px 10px', 
                                          borderRight:'1px solid #bababa', 
                                          borderLeft:'1px solid #bababa', fontSize:'15px',
                                          background:'#a4243d !important', color:'white'}}>
                                  {cartData[item.id].count}
                                </Box>
                                <Box  onClick={() => modifyCart(item, true)}
                                  sx={{padding:'5px 10px 5px 10px', fontSize:'15px', cursor:'pointer'}}>
                                  +
                                </Box>
                              </Box>
                            </Box> : 
                            <Box sx={{textAlign:'right'}}>
                              {
                                item.stockQty == 0 ?
                                <Button variant='outlined' style={styles.mainBtn} size='small' fullWidth disabled sx={{opacity:'0.6'}}>
                                  Out of stock
                                </Button> :
                                <Button variant="contained" style={styles.mainBtn} size='small' fullWidth 
                                onClick={() => navigate(`/products/${item.urlId}`)}>
                                  Shop Now
                                </Button>  
                              }      
                            </Box>
                          }
                        
                        </>
                      }

                      
                      
                     



                    </div>
                  </Box>)
                })
              }
              </Box>
            
            </Box>
          })
        }

        <Box style={styles.whyccc}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <div style={styles.contentCont}>
                <div>
                  <img src={SteriodFreeImg} style={styles.contentImg} />
                </div>
                <div>
                  With an average bunch of 200+ country chickens and an ample amount of farm time to roam free and munch on 
                  hydroponics, our chickens are anything but cooped up.
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <div style={styles.contentCont}>
                <div>
                  <img src={FreeRangeHens} style={styles.contentImg} />
                </div>
                <div>
                  Just like we don’t force-feed our children, 
                  we don’t force-feed our chickens with any syringes since it might lead to physical asphyxiation.
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={4} md={4} lg={4}>
              <div style={styles.contentCont}>
                <div>
                  <img src={NoForceFeeding} style={styles.contentImg} />
                </div>
                <div>
                  We believe country chickens are healthiest and happiest when they’re allowed to live
                  without being pumped full of antibiotics, hormones & steroids.
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
        {
          Capacitor.getPlatform() == 'web'? <Footer /> : null
        }
      </div>
      }
    </Box>
    
    <React.Fragment key={'bottom'}>
      <Drawer
        anchor={isDesktop ? 'right' : 'bottom'}
        open={anchor}
        onClose={toggleDrawer(false)}
      >
        {list('bottom')}
      </Drawer>
    </React.Fragment>

    <React.Fragment key={'left'}>
      <Drawer
        anchor={'left'}
        open={sideNavAnchor}
        onClose={toggleSideNavDrawer(false)}
      >
        <Box sx={{width:'60vw', padding: Capacitor.getPlatform() == 'ios' ? '5vh 4vw 0 4vw' : '4vw', background:'#a4243d', height:'100%', color:'#FFF0D9'}}>
         
          <Box sx={{fcolor:'#FFF0D9', 
                    fontSize:'20px', padding:'10px 5vw', cursor:'pointer'}}
                    onClick={() => goToProfile()}>

            My Orders
          </Box>
          


          <Box style={styles.mobMenuItem}
            onClick={() => navigate('/recipies')}>
            Recipes
          </Box>
          
          <Box style={styles.mobMenuItem} sx={{borderTop:'1px solid #FFF0D9', marginTop:'10px'}}
            onClick={() => navigate('/contactus')}>
            Contact Us
          </Box>

          <Box style={styles.mobMenuItem} onClick={() => navigate('/faqs')}>
            FAQ's
          </Box>

        </Box>
        <Box sx={{textAlign:'center', background:'#a4243d', color:'#FFF0D9', padding:'5px 0'}}>
          v{ process.env.REACT_APP_VERSION }
        </Box>
  
      </Drawer>
    </React.Fragment>

    </motion.div>
  )
}

export default Home
