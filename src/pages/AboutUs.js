import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ComponentLoader from '../components/ComponentLoader';
import { Grid } from '@mui/material';

import Hygenic from '../assets/hygienic.png'
import Premium from '../assets/premium-meat.png'
import Protocol from '../assets/red-protocol.png'
import Exprerience from '../assets/experince.png'
import Suri from '../assets/suri.png'
import Saikesh from '../assets/saikesh.png'
import Sami from '../assets/sami.png'
import HowWeStarted from '../assets/how-we-started.png'

const styles = {
  featImg : {
    width : '250px',
    borderRadius:'15px'
  },
  itemCont : {
    display: 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    textAlign:'justify',
    maxWidth:'500px',
    fontSize:'18px',
    marginBottom:'30px'
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
    marginBottom:'30px'
  }
}

function AboutUs() {

  const [loading, setLoading] = useState(false)

  return (
    <Box sx={{padding:'4vw', marginTop:'5vh'}}>
      {
        loading ?
        <ComponentLoader /> : 
        <Box>
          <Box sx={{fontSize:'25px', marginTop:'20px'}}>
            About Us
          </Box>

          <Grid container sx={{padding:'4vw'}}>
            <Box style={styles.portCont}>
              <Box>
                <img src={HowWeStarted} style={styles.portImg} />
              </Box>
              <Box sx={{display:'flex', flexDirection:'column', marginLeft:'20px'}}>
                <Box mb={1} sx={{color:'#a4243d', fontFamily:'Foregen', fontSize:'30px'}}>
                  OUR HUMBLE BEGINNING
                </Box>
                <Box>
                  Our journey began in 2009. It's when Mr. Hemambar Reddy realizes his love and desire to raise Country Chickens. With his insightful knowledge regarding them and how the meat industry should work, he joined hands with Mr. Saikesh & Mr. Sami to bring about Country Chicken Co. Our collective goal has always been to support local farmers and bring natural, wholesome Country Chickens to each home in India. After 12 years in the business, we produce some of the highest quality Country Chicken meat. And our mission continues to create a healthier future.                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid container>
            <Grid xs={12} sm={12} md={6} lg={6} sx={{display:'flex', justifyContent:'center'}}>
              <Box style={styles.itemCont}>
                <Box>
                  <img src={Hygenic} style={styles.featImg} />
                </Box>
                <Box>
                  Our farms and meat processing strictly follows ICAR & NCR meat standards to ensure that you get nothing but the highest quality of organic meat possible.
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} sx={{display:'flex', justifyContent:'center'}}>   
            <Box style={styles.itemCont}>
              <Box>
                <img src={Premium} style={styles.featImg} />
              </Box>
              <Box>
                Country Chicken Co's meat is nutritious and flavourful at the same time. We never use antibiotics, added hormones, or steroids on our chickens.
              </Box>
            </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} sx={{display:'flex', justifyContent:'center'}}>   
            <Box style={styles.itemCont}>
              <Box>
                <img src={Protocol} style={styles.featImg} />
              </Box>
              <Box>
               Our highest standard of caring for our Country Chickens means all of them to spend more time outside and living their lives as nature intended them to.              
             </Box>
             </Box>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6} sx={{display:'flex', justifyContent:'center'}}>   
            <Box style={styles.itemCont}>
              <Box>
                <img src={Exprerience} style={styles.featImg} />
              </Box>
              <Box>
                With intensive knowledge at hand, we constantly strive to provide you and your loved ones with premium quality organic meat that you grew up with or wish to include in your health-conscious lifestyle.            
              </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{fontSize:'25px', marginTop:'20px'}}>
            Our Team
          </Box>
          <Grid container sx={{padding:'4vw'}}>

            <Grid xs={12} sm={12} md={12} lg={12} sx={{display:'flex', justifyContent:'center'}}>
              <Box style={styles.portCont}>
                <Box>
                  <img src={Saikesh} style={styles.portImg} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', marginLeft:'20px'}}>
                  <Box mb={1} sx={{color:'#a4243d', fontFamily:'Foregen', fontSize:'30px'}}>
                    G SAIKESH GOUD , Founder-CEO
                  </Box>
                  <Box>
                    A BTech & MTech graduate from IIT BHU (VARANASI), Saikesh comes with eight years of business experience in fourteen different states of India, and a diverse professional background. With his strongest assets being his tremendous exposure, experience in retail brands and a great network of high net worth individuals, he packs quite a punch! His business profile houses impressive names like Ploughmen Innovations Pvt Ltd, Cornquest Foods Pvt Ltd & Venagro Nutri Foods Pvt Ltd.             
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} sx={{display:'flex', justifyContent:'center'}}>
              <Box style={styles.portCont}>
                <Box>
                  <img src={Sami} style={styles.portImg} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', marginLeft:'20px'}}>
                  <Box mb={1} sx={{color:'#a4243d', fontFamily:'Foregen', fontSize:'30px'}}>
                    MOHD SAMI UDDIN , Co-Founder-COO
                  </Box>
                  <Box>
                    With five years of demonstrated experience in multiple fields, Sami flaunts a plethora of talents and techniques. He is equipped with diverse knowledge in sales, marketing, leadership skills, negotiating, retail marketing, event management and digital marketing, among other equally crucial skills. He is a calculated risk taker under whose mentorship, many students thrived in financial literacy.             
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} sx={{display:'flex', justifyContent:'center'}}>
              <Box style={styles.portCont}>
                <Box>
                  <img src={Suri} style={styles.portImg} />
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', marginLeft:'20px'}}>
                  <Box mb={1} sx={{color:'#a4243d', fontFamily:'Foregen', fontSize:'30px'}}>
                    SURI BABU, Farmers’ Man
                  </Box>
                  <Box>
                    A farmers’ man, working tirelessly to improve the lives of country chicken farmers. Has a 20 years experience in poultry industry and has risen to be one of the biggest wholesale trader of country chicken in India. Directly and indirectly associated with 15,000+ farmers across several states of India.
                  </Box>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>

      }
    </Box>
  )
}

export default AboutUs