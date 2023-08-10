import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2';
import NavHeader from '../components/NavHeader';
import StoreTbnl from '../assets/store-tbnl.png'
import { btnCurvedStyle } from '../services/api';

const styles = {
  productItem : {
    margin:'10px',
    width:'80%',
    background:'white',
    borderRadius:'5px',
    boxShadow:'0px 0px 5px 2px #eaeaea'
  },
  productGridCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  productImg : {
    width:'100%',
    height:'300px',
    borderRadius:'5px 5px 0 0'
  },
  productDescCont : {
    padding:'15px',
    textAlign:'left',
    background:'#a4243d',
    color:'white'
  },
  prodName : {
    textAlign:'center',
    fontFamily:'Foregen',
    fontSize:'30px'
  }
}

function Stores() {
  return (
    <Box sx={{padding:'4vw', marginTop:'7vh', paddingBottom:'8vh'}}>

      <NavHeader />
      <Box sx={{color:'#a4243d', fontSize:'40px', ml:2,mb:1, fontFamily:'Foregen'}}>
        OUR STORES
      </Box>

      <Grid container>

           <Grid xs={12} sm={6} md={4} lg={4} style={styles.productGridCont}>
              <Box style={styles.productItem}>
                <Box sx={{textAlign:'center', height:'300px', position:'relative', cursor:'pointer', display:'flex', alignItems:'center' }}
                  >
                  <img src={StoreTbnl} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                    Manikonda
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                    H.No :2-3-1, Shivapuri Colony, Muppas Panchavati Colony, Manikonda Jagir, Hyderabad, Telangana 500089
                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}>
                      Find Store  
                    </Button>  
                  </Box>          
                </div>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={4} lg={4} style={styles.productGridCont}>
              <Box style={styles.productItem}>
                <Box sx={{textAlign:'center', height:'300px', position:'relative', cursor:'pointer', display:'flex', alignItems:'center' }}
                  >
                  <img src={StoreTbnl} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Pragati Nagar
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  Shop No - G2, Plot No: 1361, Lakshmi Nilayam Pragathi Nagar, Next to Bhasyam School, Kukatpally, Hyderabad, Telangana 500090                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}>
                      Find Store  
                    </Button>  
                  </Box>          
                </div>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={4} lg={4} style={styles.productGridCont}>
              <Box style={styles.productItem}>
                <Box sx={{textAlign:'center', height:'300px', position:'relative', cursor:'pointer', display:'flex', alignItems:'center' }}
                  >
                  <img src={StoreTbnl} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Kothapet
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  1-2-84/6/NR,Dachepally Prameela Heaven, Kothapet, New Nagole Main Road, Hyderabad, Telangana 500035                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}>
                      Find Store  
                    </Button>  
                  </Box>          
                </div>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={4} lg={4} style={styles.productGridCont}>
              <Box style={styles.productItem}>
                <Box sx={{textAlign:'center', height:'300px', position:'relative', cursor:'pointer', display:'flex', alignItems:'center' }}
                  >
                  <img src={StoreTbnl} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  KPHB
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  Plot No 324, Vijayan Residency, Venkatramana Colony, Gokul Plot, Kukatpally Housing Board Colony, Hyderabad                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}>
                      Find Store  
                    </Button>  
                  </Box>          
                </div>
              </Box>
            </Grid>

          </Grid>

    </Box>
  )
}

export default Stores