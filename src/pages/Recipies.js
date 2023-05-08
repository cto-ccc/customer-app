import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ComponentLoader from '../components/ComponentLoader';
import { Grid } from '@mui/material';
import { getRecepieVideos } from '../services/api';


const styles = {
  productItem : {
    margin:'10px',
    background:'white',
    borderRadius:'20px',
    boxShadow:'0px 0px 5px 2px #eaeaea',
    width:'fit-content',
    padding:'20px'
  }
}

function Recipeies() {

  const [loading, setLoading] = useState(false)


  
  useEffect(() => {

  }, [])
  

  return (
    <Box sx={{padding:'4vw', marginTop:'5vh'}}>
      {
        loading ?
        <ComponentLoader /> : 
        <Box>
          <Box sx={{fontSize:'25px', marginTop:'20px'}}>
            Our Recipies
          </Box>
           <Grid container>
           {
            getRecepieVideos().map((video, index) => {
              return(
              <Grid xs={12} sm={12} md={6} lg={6}  key={index}>
                  <Box key={index} style={styles.productItem}>
                    <div class="recipie-iframe">
                      <iframe
                        src={video.url}>
                      </iframe>
                    </div>
                  </Box>
                </Grid>
              )
            })
          }
          </Grid>
        </Box>
      }
    </Box>
  )
}

export default Recipeies