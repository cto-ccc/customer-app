import React from 'react'
import Box from '@mui/material/Box';
import Village2 from '../assets/village2.png'
import Village1 from '../assets/village1.png'
import LandingBanner from '../assets/landing-banner.png'
import LandingDel from '../assets/land-delivery.png'
import LandingDown from '../assets/landing-down.png'
import { Button, Grid } from '@mui/material';
import LandCont1 from '../assets/land-cont1.png'
import LandCont2 from '../assets/land-cont2.png'
import LandCont3 from '../assets/land-cont3.png'

import CatFreeRange from '../assets/land-cat-freerange.png'
import CatVillageBirds from '../assets/land-cat-village.png'
import CatMarinates from '../assets/land-cat-marinates.png'
import CatEggs from '../assets/land-cat-eggs.png'
import CatPickles from '../assets/land-cat-pickle.png'
import CatNutrisoft from '../assets/land-cat-nutrisoft.png'
import DownloadApple from '../assets/download-apple.png'
import DownloadGoogle from '../assets/download-google.png'
import DownloadApp from '../assets/lan-down-app.png'
import { Capacitor } from '@capacitor/core';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { btnCurvedStyle } from '../services/api';


const styles = {
  mainBody : {
    background : '#FFF0D9'
  },
  topBgImg : {
    width:'40vw',
    height:'50vh'
  },
  landBanner : {
    width:'55vw',
    position:'absolute',
    top:'15vh',
    height:'50vh'
  },
  circle : {
    height:'auto',
    width:'auto',
    borderRadius:'50%',
    padding:'15px',
    background:'#A4243D',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginRight:'20px'
  },
  subIc : {
    height:'40px',
    width:'40px'
  },
  portImg : {
    width : '350px',
    borderRadius:'15px',
  },
  portCont : {
    display: 'flex',
    alignItems : 'center',
    textAlign:'justify',
    fontSize:'18px',
    marginBottom:'30px',
    justifyContent:'space-between'
  },
  catImg : {
    width:'30%',
    height:'230px',
    cursor:'pointer'
  },
  storeIcon : {
    width:'200px',
    height:'70px',
    borderRadius:'20px',
    cursor:'pointer' 
  },
  downImg : {
    width:'-webkit-fill-available',
    height:'100%'
  }
}
function Landing() {

  const navigate = useNavigate()

  const openUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <Box style={styles.mainBody}>

      <Box>

        <Box sx={{display:'flex', justifyContent:'center', width:'100%'}}>
          <img src={LandingBanner} style={styles.landBanner} />
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', paddingTop:'15vh'}}>
          <img src={Village1} style={styles.topBgImg}/>
          <img src={Village2} style={styles.topBgImg}/>
        </Box>
        
      </Box>
      

      <Box sx={{display:'flex', width:'80vw', margin:'50px 10vw 70px 10vw', alignItems:'center'}}>
        <Box style={styles.circle}>
          <img src={LandingDel} style={styles.subIc}/>
        </Box>
        <Box sx={{width:'40vw', mr:4}}>
          <Box sx={{fontWeight:'bold'}}>
            Live Cut, Swiftly Delivered to Your Doorstep
          </Box>
          <Box>
            Delight in our live-cut meat delivered to your door, ready to elevate your favourite recipes.
          </Box>
        </Box>

        <Box style={styles.circle}>
          <img src={LandingDown} style={styles.subIc}/>
        </Box>

        <Box sx={{width:'40vw'}}
          onClick={() => openUrl('https://play.google.com/store/apps/details?id=com.countrychicken.customerapp')}>
          <Box sx={{fontWeight:'bold'}}>
            Download our App
          </Box>
        <Box>
            Download our app for instant access to ordering all your favourites with just a single click.
          </Box>
        </Box>
      </Box>

      <Grid container sx={{padding:'20px 10vw'}}>
        <Box style={styles.portCont}>
        <Box sx={{display:'flex', flexDirection:'column', marginRight:'20px', color:'#a4243d', width:'40%'}}>
          <Box mb={1} sx={{ fontSize:'50px', fontFamily:'Foregen', textAlign:'left'}}>
            Natural, <br /> Nutritious, <br /> Delicious - That's Country Chicken Co. for You
          </Box>
          <Box>
          Experience the true taste of tradition with our authentic Natu Kodi, carefully sourced from the finest farms and backyard farmers, raised the way nature intended.          </Box>
          </Box>
          <div class="lan-iframe">
            <iframe
              src='https://www.youtube.com/embed/0X2er6KZWjw'>
            </iframe>
          </div>
        </Box>
      </Grid>

      <Grid container sx={{padding:'20px 10vw'}}>
        <Box style={styles.portCont}>
          <Box>
            <img src={LandCont1} style={styles.portImg} />
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', marginLeft:'20px', color:'#a4243d'}}>
            <Box mb={1} sx={{ fontSize:'30px', fontFamily:'Foregen'}}>
              RAISED BY NATURE
            </Box>
            <Box>
              Introducing our exceptional chickens - a delicious delight that cares for your well-being. With a strong focus on health, we proudly offer free-range chickens, raised without antibiotics, steroids, or force-feeding. Savour the delightful taste and make a wholesome choice for you and your loved ones.          
            </Box>
        </Box>
        </Box>
      </Grid>

      <Grid container sx={{padding:'20px 10vw'}}>
        <Box style={styles.portCont}>
        <Box sx={{display:'flex', flexDirection:'column', marginRight:'20px', color:'#a4243d', textAlign:'right'}}>
          <Box mb={1} sx={{ fontFamily:'Foregen', fontSize:'30px'}}>
            WORLD'S 1st ODOURLESS MEAT STORE
          </Box>
          <Box>
            Welcome to our pioneering odour-free stores, where tradition meets innovation. Enjoy a safe and pleasant shopping experience, discovering the essence of freshness in our expertly crafted processes.          </Box>
          </Box>
        <Box>
            <img src={LandCont2} style={styles.portImg} />
          </Box>
        </Box>
      </Grid>

      <Grid container sx={{padding:'20px 10vw'}}>
        <Box style={styles.portCont}>
          <Box>
            <img src={LandCont3} style={styles.portImg} />
          </Box>
          <Box sx={{display:'flex', flexDirection:'column', marginLeft:'20px', color:'#a4243d'}}>
            <Box mb={1} sx={{ fontFamily:'Foregen', fontSize:'30px'}}>
              OUR FARMERS NETWORK
            </Box>
            <Box>
              Embark on a journey to the heart of our small family farms, where 15,000 dedicated farmers deliver the finest country chicken meat. We prioritise premium quality, caring for families, yours, and the planet.            </Box>
            </Box>
        </Box>
      </Grid>

      <Box sx={{display:'flex', flexDirection:'column', padding:'70px 10vw', background:'#a4243d'}}>
        <Box sx={{textAlign:'center', fontSize:'60px', color:'#FFF0D9', marginBottom:'20px', fontFamily:'Foregen'}}>
          ORDER NOW
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', margin:'10px 0'}}>
          <img src={CatFreeRange} style={styles.catImg}
            onClick={() => navigate('/categories/free-range-birds')}/>
          <img src={CatVillageBirds} style={styles.catImg}
            onClick={() => navigate('/categories/village-birds')}/>
          <img src={CatNutrisoft} style={styles.catImg}
            onClick={() => navigate('/categories/nutrisoft-chicken')}/>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', margin:'10px 0'}}>
          <img src={CatEggs} style={styles.catImg}
          onClick={() => navigate('/categories/eggs')}/>
          <img src={CatPickles} style={styles.catImg}
          onClick={() => navigate('/categories/pickles')}/>
          <img src={CatMarinates} style={styles.catImg}/>
        </Box>
        <Box sx={{textAlign:'center', paddingTop:'20px'}}>
          <Button variant='contained' 
          sx={btnCurvedStyle}
            onClick={() => navigate('/home')}>
            Shop Now
          </Button>
        </Box>
      </Box>

      <Box sx={{fontSize:'60px', fontFamily:'Foregen', padding:'50px 10vw', textAlign:'center', color:'#a4243d'}}>
        LOVED BY 31,564 MEAT LOVERS
      </Box>

      <Box sx={{display:'flex', background:'#a4243d'}}>
        <Box sx={{width:'40%', display:'flex', flexDirection:'column', justifyContent:'center', paddingLeft:'20px'}}>
          <Box sx={{color:'#FFF0D9', paddingLeft:'15px', fontSize:'40px', marginBottom:'10px', fontFamily:'Foregen'}}>
            DOWNLOAD OUR APP
          </Box>
          <Box sx={{display:'flex'}}>
            <img src={DownloadGoogle} style={styles.storeIcon}
            onClick={() => openUrl('https://play.google.com/store/apps/details?id=com.countrychicken.customerapp')} />
            
            <img src={DownloadApple} style={styles.storeIcon}
            onClick={() => openUrl('https://apps.apple.com/in/app/country-chicken-co/id6455496228')} />
          </Box>
        </Box>
        <Box sx={{width:'60%'}}>
          <img src={DownloadApp} style={styles.downImg}/>
        </Box>
      <Box>

        </Box>
      </Box>
      
    </Box>
  )
}

export default Landing