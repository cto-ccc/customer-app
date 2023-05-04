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


const styles = {
  whyccc: {
    background:'black',
    color:'white',
    display:'flex',
    padding:'2vw',
    textAlign:'center',
    flexDirection:'column'
  },
  contentCont : {

  },
  storeIcon : {
    width:'200px',
    height:'70px',
    border:'1px solid white',
    borderRadius:'20px' 
  },
  extraImg : {
    maxHeight:'120px',
    marginBottom:'20px',
    maxWidth:'350px'
  },
}

function Footer() {
  return (
    <Box style={styles.whyccc}>
      <Box sx={{height:'250px', background:'black'}}>
         <Box sx={{background:'black', height:'250px', display:'flex', flexDirection:'column', backgroundSize:'cover', alignItems:'center', justifyContent:'center'}}>
          <img src={CccLogo} style={styles.extraImg} />
          <img src={RaisedByNature} style={styles.extraImg}/>
        </Box>
      </Box>
    <Grid container spacing={2} sx={{width:'100%', marginTop:'25px'}}>

      <Grid xs={12} sm={4} md={2} lg={2}>
        <div style={styles.contentCont}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{fontSize:'20px', fontWeight:'bold', marginBottom:'10px', textAlign:'start', marginLeft:'4vw'}}>
              Resources
            </Box>
            <Box sx={{marginLeft:'4vw'}}>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                About Us
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Our Recipies
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                Contact Us
              </Box>
            </Box>
          </Box>
        </div>
      </Grid>

      <Grid xs={12} sm={4} md={4} lg={4}>
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

      <Grid xs={12} sm={4} md={3} lg={3}>
        <div style={styles.contentCont}>
          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{fontSize:'20px', fontWeight:'bold', marginBottom:'10px', textAlign:'start', marginLeft:'4vw'}}>
              Connect With Us
            </Box>
            <Box sx={{marginLeft:'4vw'}}>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <FacebookIcon sx={{marginRight:'10px'}} />
                Facebook
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <InstagramIcon sx={{marginRight:'10px'}}/>
                Instagram
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <WhatsAppIcon sx={{marginRight:'10px'}}/>
                WhatsApp
              </Box>
              <Box sx={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                <LinkedInIcon sx={{marginRight:'10px'}}/>
                LinkedIn
              </Box>
            </Box>
          </Box>
        </div>
      </Grid>


      <Grid xs={12} sm={4} md={3} lg={3}>
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
          <div>
            2023 Country Chicken Co. All rights reserved.
          </div>
        </div>
      </Grid>
    </Grid>

  </Box>
  )
}

export default Footer
