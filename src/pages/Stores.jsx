import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Unstable_Grid2';
import NavHeader from '../components/NavHeader';
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

  const openLink = (linkUrl) => {
    window.open(linkUrl, "_blank")
  }
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FManikonda.png?alt=media&token=9aade931-8371-446f-8b18-c52d041b539d"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                    Manikonda
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                    H.No :2-3-1, Shivapuri Colony, Muppas Panchavati Colony, Manikonda Jagir, Hyderabad, Telangana 500089
                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/jPd7QJC5tAAdnRnm7")}>
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FPragathi%20Nagar.png?alt=media&token=0db5b37b-d485-45cd-a3f7-80f573be2f1c"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Pragati Nagar
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  Shop No - G2, Plot No: 1361, Lakshmi Nilayam, Pragathi Nagar Rd, beside Bhasyam School, Kukatpally, Hyderabad, Telangana 500090                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/2MmaF9HL9UeFiJ599")}>
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FKothapet.png?alt=media&token=1cc0cb4a-7efb-464a-95c8-a8667d26915b"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Kothapet
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  1-2-84/6/NR,Dachepally Prameela HeavenKothapet, to, New Nagole Main Rd, Hyderabad, Telangana 500035                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/62cKPSGy8iX28d297")}>
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FKPHB.png?alt=media&token=30d27978-0865-48ae-89a9-2ced4e25be2f"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  KPHB
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  plot no : 324,vijayan residency,venkatramana colony,Gokul Plot, Kukatpally Housing Board Colony, Hyderabad, Telangana 500072
                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/MBF7iwkk2v2uKviC7")}>
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FSainikpuri.png?alt=media&token=44443809-75cd-4573-8912-2aff2d9417b0"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Sainikpuri
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  Plot No : 46, Survey NO:218/1, Country chicken Co, House number 37-10/6/1, Defence Colony, Sainikpuri, Telangana 500094
                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/MvHGzau6FYYtoLwL8")}>
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FChandanagar.png?alt=media&token=88157d20-b313-43dd-bd25-bed69d1decb6"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Chandanagar
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  Plot No 2, Country Chicken Co, 111/22 & 23, Manjeera Pipeline Rd, Engineers Enclave, Chanda Nagar, Hyderabad, Telangana 500050                  
                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/TjkqL8hUNwb43ufG9")}>
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
                  <img src={"https://firebasestorage.googleapis.com/v0/b/countrychickenadmin.appspot.com/o/static_files%2FAttapur.png?alt=media&token=11c238af-319a-412f-aa80-a995b863d415"} style={styles.productImg}/>
                </Box>
                <div style={styles.productDescCont}>
                  <Box sx={styles.prodName}>
                  Attapur
                  </Box>
                  <Box sx={{textAlign:'left', margin:'10px 0', fontWeight:'450', fontSize:'15px', textAlign:'center'}}>
                  Appartments, KRITAN VIEW, COUNTRY CHICKEN CO, NEAR, Janapriya Utopia Rd, Hyderguda, Rajendra Nagar Mandal, Attapur, Hyderabad, Telangana 500048                 
                  </Box>  
                  <Box sx={{textAlign:'center'}}>
                    <Button sx={{...btnCurvedStyle, marginTop:'10px'}}
                      onClick={() => openLink("https://maps.app.goo.gl/uMd2VvJ5uyLXE1hG6")}>
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