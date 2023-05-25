import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadApple from './assets/download-apple.png'
import DownloadGoogle from './assets/download-google.png'
import CccLogo from './assets/ccc-logo.png'
import RaisedByNature from './assets/raised-by-nature.png'
import FooterBg from './assets/footer-bg.png'
import { useContext } from 'react';
import { CommonContext } from './contexts/CommonContext';
import { useNavigate } from 'react-router-dom';

const styles = {
  whyccc: {
    color:'black',
    display:'flex',
    padding:'2vw',
    textAlign:'center',
    flexDirection:'column',
    background:`url(${FooterBg})`, 
    backgroundSize:'cover',
    padding:'80px 0 10px 0px'
  },
  whycccDesk : {
    color:'black',
    display:'flex',
    padding:'2vw',
    textAlign:'center',
    flexDirection:'column',
    background:`url(${FooterBg})`, 
    backgroundSize:'cover',
    padding:'80px 0 0px 0px',
    height:'550px'
  },
  contentCont : {
    
  },
  storeIcon : {
    width:'200px',
    height:'70px',
    // border:'1px solid white',
    borderRadius:'20px' 
  },
  extraImg : {
    maxHeight:'120px',
    marginBottom:'20px',
    maxWidth:'350px'
  },
}

function Footer() {

  const navigate = useNavigate()

  const {isDesktop} = useContext(CommonContext)

  const openUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <Box style={isDesktop ? styles.whycccDesk : styles.whyccc}>
      <Box sx={{height:'150px', }}>
         <Box sx={{ height:'150px', display:'flex', flexDirection:'column', backgroundSize:'cover', alignItems:'center', justifyContent:'center'}}>
          <img src={CccLogo} style={styles.extraImg} />
          <img src={RaisedByNature} style={styles.extraImg}/>
        </Box>
      </Box>
    <Grid container spacing={2} sx={{width:'100%', marginTop:'30px'}}>

      <Grid xs={12} sm={4} md={3} lg={3}>
        <div style={styles.contentCont}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{fontSize:'20px', fontWeight:'bold', marginBottom:'10px', textAlign:'start', marginLeft:'4vw'}}>
              Resources
            </Box>
            <Box sx={{marginLeft:'4vw'}}>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => navigate('/aboutUs')}>
                About Us
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => navigate('/recipies')}>
                Our Recipies
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => navigate('/contactUs')}>
                Contact Us
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => navigate('/termsAndConditions')}>
                Terms And Conditions
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => navigate('/privacyPolicy')}>
                Privacy Policy
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => navigate('/refundPolicy')}>
                Cancellation / Refund Policy
              </Box>
            </Box>
          </Box>
        </div>
      </Grid>

      <Grid xs={12} sm={4} md={3} lg={3}>
        <div style={styles.contentCont}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{fontSize:'20px', fontWeight:'bold', marginBottom:'10px', textAlign:'start', marginLeft:'4vw'}}>
              Our Chickens
            </Box>
            <Box sx={{marginLeft:'4vw'}}>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Tender Telangana Country Chicken 
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Mysore Queen Country Chicken
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Classic Andhra Country Chicken
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Warrior Country Chicken
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Kadaknath Andhra Country Chicken
              </Box>
            </Box>
          </Box>
        </div>
      </Grid>

      <Grid xs={12} sm={4} md={2} lg={2}>
        <div style={styles.contentCont}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{fontSize:'20px', fontWeight:'bold', marginBottom:'10px', textAlign:'start', marginLeft:'4vw'}}>
              Connect With Us
            </Box>
            <Box sx={{marginLeft:'4vw'}}>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => openUrl('https://www.facebook.com/Countrychickenco/')}>
                <FacebookIcon sx={{marginRight:'10px'}} />
                Facebook
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => openUrl('https://www.instagram.com/countrychickenco/')}>
                <InstagramIcon sx={{marginRight:'10px'}}/>
                Instagram
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => openUrl('https://api.whatsapp.com/send/?phone=7386661281&text&type=phone_number&app_absent=0')}>
                <WhatsAppIcon sx={{marginRight:'10px'}}/>
                WhatsApp
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px', cursor:'pointer'}}
                onClick={() => openUrl('https://www.linkedin.com/company/74350758/admin/')}>
                <LinkedInIcon sx={{marginRight:'10px'}}/>
                LinkedIn
              </Box>
            </Box>
          </Box>
        </div>
      </Grid>


      <Grid xs={12} sm={4} md={2} lg={2}>
        <div style={styles.contentCont}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{fontSize:'20px', fontWeight:'bold', marginBottom:'10px', textAlign:'start', marginLeft:'4vw'}}>
              Download Our Apps
            </Box>
            <Box sx={{marginLeft:'4vw'}}>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <img src={DownloadGoogle} style={styles.storeIcon} />
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <img src={DownloadApple} style={styles.storeIcon} />
              </Box>
            </Box>
          </Box>
        </div>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} mt={3}>
        <div style={styles.contentCont}>
          <Box sx={{color:'white', marginTop:'70px'}}>
            2023 Country Chicken Co. All rights reserved.
          </Box>
        </div>
      </Grid>
    </Grid>

  </Box>
  )
}

export default Footer
