import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ComponentLoader from '../components/ComponentLoader';
import { Grid } from '@mui/material';


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

  const [videoData, setVideoData] = useState([
    {
      url : 'https://www.youtube.com/embed/F6l2E631Hd0',
      id : 1
    },
    {
      url : 'https://www.youtube.com/embed/52tKR3RkHro',
      id : 2
    },
    {
      url : 'https://www.youtube.com/embed/t__O2836Pak',
      id : 3
    },
    {
      url : 'https://www.youtube.com/embed/nXgtsknIPvY',
      id : 4
    },
    {
      url : 'https://www.youtube.com/embed/SPfE1gXBRhc',
      id : 5
    },
    {
      url : 'https://www.youtube.com/embed/F6l2E631Hd0',
      id : 6
    }
  ])
  
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
            videoData.map((video, index) => {
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