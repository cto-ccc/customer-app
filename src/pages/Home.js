import SteriodFreeImg from '../assets/antibiotic-and-steriod-free-hens.png'
import FreeRangeHens from '../assets/free-range-hens.png'
import NoForceFeeding from '../assets/no-force-feeding-hens.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ComponentLoader from '../components/ComponentLoader'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { TextField } from '@mui/material'

import Eggs from '../assets/eggs.png'
import HomeBanner1 from '../assets/banner1.png'
import HomeBanner2 from '../assets/banner2.png'
import HomeBanner3 from '../assets/banner3.png'

import HomeBanner4 from '../assets/desk-banner1.png'
import HomeBanner5 from '../assets/desk-banner2.png'
import HomeBanner6 from '../assets/desk-banner3.png'
import OfferBanner1 from '../assets/offer-banner1.png'
import OfferBanner2 from '../assets/offer-banner2.png'

import Marinates from '../assets/cat-marinates.png'
import CatEggs from '../assets/cat-eggs.png'
import CatPickles from '../assets/cat-pickle.png'
import CatNutrisoft from '../assets/cat-nutrisoft.png'
import CccLogo from '../assets/ccc-logo.png'
import RaisedByNature from '../assets/raised-by-nature.png'


import MysoreQueen from '../assets/mysore-queen.png'
import Kadaknath from '../assets/kadaknath.png'
import Warrior from '../assets/warrior.png'
import TenderChicken from '../assets/tender-chicken.png'
import PicklesLogo from '../assets/pickle.png'
import EggsLogo from '../assets/eggs.png'
import ThirtyEggsLogo from '../assets/thirty-eggs.png'

import CatFreeRange from '../assets/cat-freerange.png'
import CatVillageBirds from '../assets/cat-villagebirds.png'

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

import * as React from 'react';
import { getCustomizedProducts, getImgMap, getLanding, getMetaData, logAction } from '../services/api';
import { Capacitor } from '@capacitor/core';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';


const styles = {
  navbar : {
    height : '10vh',
    borderBottom : '1px solid #b1b1b1',
    position:'fixed',
    top:'0',
    left:'0',
    width:'92vw',
    background:'white',
    zIndex:'2',
    boxShadow: '0px 0px 5px 0px #7e7e7e',
    padding:'0 4vw',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  },
  mainContent : {
    height : '100vh',
    paddingTop:'10vh'
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
    background:'white',
    borderRadius:'5px',
    width:'220px',
    height:'315px',
    boxShadow:'0px 0px 5px 2px #eaeaea'
  },

  productItemDesk : {
    margin:'10px',
    background:'white',
    borderRadius:'5px',
    width:'230px',
    height:'330px',
    // marginRight:'25px',
    boxShadow:'0px 0px 5px 2px #eaeaea'
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
    padding:'15px',
    height:'120px',
    textAlign:'left',
    alignItems:'center',
    background:'#ffebeb',
    borderRadius:'0px 0px 5px 5px',
    display:'grid',
    position:'relative',
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
    width:'200px',
    height:'7.5vh',
    cursor:'pointer'
  },
  posterImg : {
    width:'100px',
    height:'100px',
    marginBottom:'10px',
    boxShadow:'0 0 5px 0px #b3b1b1',
    borderRadius:'2px'
  },
  posterImgDesk : {
    width:'75%',
    marginBottom:'10px',
    boxShadow:'0 0 5px 0px #b3b1b1',
    borderRadius:'2px'
  },
  posterCont : {
    padding:'10px',
    textAlign:'center',
    width:'300px',
    background:'#ffebeb',
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
    background : 'wheat',
    color:'#a4243d',
    borderRadius:'10px',
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
    alignItems:'baseline'
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
    borderRadius:'3px'
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
    display:'flex', width:'100vw', overflowX:'scroll', marginBottom:'20px'
  },
  topCatContDesk : {
    display:'flex', justifyContent:'center', padding:'0 10px', marginBottom:'6vw'
  }
}

function Home() {

  const navigate = useNavigate()
  const { updateCart, cartData, isDesktop } = useContext(CommonContext)
  const { isUserLoggedIn, getCustomerIdFromCache } = useContext(AuthContext)
  const [anchor, setAnchor] = useState(false)
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

  const printCurrentPosition = async() => {
    getLanding(navigator.userAgent).then((resp) => {
      setItemsData(resp)
      let allCatItems = []
      resp.forEach((item) => {
        allCatItems = allCatItems.concat(item.data)
      })
      setAllItemsData(allCatItems)
      setLoading(false)
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

  const list = (anchor) => (
    <Box sx={{padding:'4vw'}}>
      <Box sx={{fontSize:'20px', fontWeight:'600', mb:2}}>
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
                Skinless <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹100/-)</Box>  
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
          Pieces Cut
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
          onClick={() => addItemFromExtras()}>
          Add Item
        </Button>
      </Box>

    </Box>
  )


  useEffect(() => {
    logAction('PAGE_VIEW', 'home')
    printCurrentPosition()
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
      <Box style={styles.navbar}>
        <Box>
          <Box onClick={() => navigate('/')}>
            <img src={HomeLogo} style={styles.homeLogo}/>
          </Box>
        </Box>
        {
          isDesktop ? 
          <Box sx={{display:'flex'}}>
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
                    autoFocus
                    onChange={(event) => {
                      searchProductsEvent(event.target.value);
                    }}
                  />
                  <CloseIcon onClick={() => closeSearch()} sx={{cursor:'pointer', marginLeft:'10px'}}/>
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
                
              </Box> : 
              <Box p={2} onClick={() => setShowSearchBar(true)} style={styles.navItem}>
                <SearchIcon />
              </Box>
            }
            <Box p={2} onClick={() => navigate('/')} style={styles.navItem}>
              Home
            </Box>
            <Box p={2} onClick={() => navigate('/aboutUs')} style={styles.navItem}>
              About Us
            </Box>
            <Box p={2} onClick={() => navigate('/recipies')} style={styles.navItem}>
              Our Recipes
            </Box>
            <Box onClick={() => goToProfile()} p={2} style={styles.navItem}>
            { getCustomerIdFromCache() ? 'My Orders' : 'Login / Signup'} 
            </Box>
            <Box p={2} onClick={() => navigate('/cart')} style={styles.cartCont}>
              <ShoppingCartIcon 
                sx={{fontSize:'18px', paddingRight:'5px', marginRight:'5px', color:'#a4243d'}} />
              Cart
            </Box>
          </Box> : 
          <Box sx={{display:'flex'}}>
              {
                showSearchBar ?  
                <Box>
                <Box sx={{display:'flex', alignItems:'center', padding:'0 10px', width:'80vw',
                   position:'absolute', left:0, top:0, height:'10vh', background:'white',justifyContent:'flex-end'}}>
                  <TextField
                    size='small'
                    placeholder="Search Products"
                    variant="outlined"
                    type="text"
                    autoComplete='off'
                    name="searchProducts"
                    autoFocus
                    fullWidth
                    onChange={(event) => {
                      searchProductsEvent(event.target.value);
                    }}  
                  />
                  <CloseIcon onClick={() => closeSearch()} sx={{cursor:'pointer', marginLeft:'10px'}}/>
                </Box>
                {
                  filteredItemsData.length ?
                  <Box sx={{display:'flex', position:'absolute', top:'10vh', left:0,
                    background:'white', width:'100vw', justifyContent:'flex-start', flexDirection:'column' }}>
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
                </Box> : <Box onClick={() => setShowSearchBar(true)}>
                  <SearchIcon style={styles.userLogo} sx={{marginRight:'10px'}}/>
                  </Box>
              }
            
            <img src={User} style={styles.userLogo} onClick={() => goToProfile()}/>
          </Box>
        }
        </Box>

      {
        loading ?
        <Box sx={{padding:'4vw'}}>
          <ComponentLoader />
        </Box>
         :
        <div style={isDesktop ? styles.mainContentDesk : styles.mainContent}>

        <Box>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{delay:3500, disableOnInteraction: false}}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={isDesktop ? HomeBanner4 : HomeBanner1} style={isDesktop ? styles.bannerImgDesk : styles.bannerImg} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={isDesktop ? HomeBanner5 : HomeBanner2} style={isDesktop ? styles.bannerImgDesk : styles.bannerImg} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={isDesktop ? HomeBanner6 : HomeBanner3} style={isDesktop ? styles.bannerImgDesk : styles.bannerImg} />
            </SwiperSlide>
          </Swiper>
        </Box>
        
        <Box sx={{padding: isDesktop ? '2vw 3vw 2vw 9vw' : '20px 4vw' , fontSize:'20px', fontWeight:'bold'}}>
          Top Categories
        </Box>
        <Box sx={isDesktop ? styles.topCatContDesk : styles.topCatCont}>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/nutrisoft-chicken')}>
            <img src={CatNutrisoft} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
            Nutrisoft Chicken
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/free-range-birds')}>
            <img src={CatFreeRange} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
            Free Range Birds
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/village-birds')}>
            <img src={CatVillageBirds} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
            Village Birds
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/eggs')}>
            <img src={CatEggs} style={isDesktop ? styles.posterImgDesk : styles.posterImg}/>
            Eggs
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
            onClick={() => navigate('/categories/pickles')}>
            <img src={CatPickles} style={isDesktop ? styles.posterImgDesk : styles.posterImg}/>
            Pickles
          </Box>
          <Box style={isDesktop ? styles.posterContDesk : styles.posterCont}>
            <img src={Marinates} style={isDesktop ? styles.posterImgDesk :  styles.posterImg}/>
            Marinates
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
              <Box>
                {category.title}
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
                      <Box sx={styles.discountCont}>
                        {Math.trunc(((item.mrp - item.price) / item.mrp) * 100)}% Off
                      </Box>
                      <img src={getImgMap()[item.imgUrl]} style={isDesktop ? styles.productImgDesk : styles.productImg}/>
                    </Box>
                    <div style={styles.productDescCont}>
                      <Box sx={styles.prodName}
                        onClick={() => navigate(`/products/${item.urlId}`, {state : item})}>
                        {item.name}
                      </Box>
                      {
                        item.style ? 
                        <Box sx={{textAlign:'left', marginBottom:'5px',fontSize:'12px'}}>
                          ({item.style})
                        </Box> : null
                      }
                      
                      <Box sx={{textAlign:'left', marginBottom:'5px', fontWeight:'450', fontSize:'15px'}}>
                        {item.qty}
                      </Box>
                      <Box sx={{textAlign:'left', marginBottom:'5px', fontSize:'16px', display:'flex', alignItems:'end'}}>
                      ₹ {item.price} <Box sx={{fontSize:'13px', marginLeft:'5px', opacity:'0.5'}}><s>₹ {item.mrp}</s></Box> 
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
                            <Button variant='outlined' style={styles.mainBtn} size='small' disabled sx={{opacity:'0.6'}}>
                              Out of stock
                            </Button> :
                            <Button variant="contained" style={styles.mainBtn} size='small' onClick={() => addToCart(item)}>
                              Add To Cart
                            </Button>  
                          }
                          
                        </Box>
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

    </motion.div>
  )
}

export default Home
