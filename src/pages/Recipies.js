import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ComponentLoader from '../components/ComponentLoader';
import { Grid } from '@mui/material';
import { getAllRecipiesData, getRecepieVideos, logAction } from '../services/api';
import NavHeader from '../components/NavHeader';
import { useNavigate } from 'react-router-dom';


const styles = {
  productItem : {
    margin:'10px',
    background:'#a4243d',
    borderRadius:'5px',
    boxShadow:'0px 0px 5px 2px #eaeaea',
    width:'fit-content',
    fontFamily:'Foregen',
    display:'flex',
    flexDirection:'column',
    width:'80%',
    alignItems:'center',
    cursor:'pointer'
  },
  recImg : {
    height:'400px',
    borderRadius:'5px',
    width:'100%'
  }
}

function Recipeies() {

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [recipieData, setRecipieData] = useState([])

  const getRecipiesData = async() => {
    const resp = await getAllRecipiesData()
    setRecipieData(resp.recipies)
    setLoading(false)
  }
  useEffect(() => {
    logAction('PAGE_VIEW', 'recipes')
    getRecipiesData()
  }, [])
  
  return (
    <Box sx={{padding:'4vw', marginTop:'5vh'}}>
      {
        loading ?
        <ComponentLoader /> : 
        <Box>
          <NavHeader />
          <Box sx={{fontSize:'60px', marginTop:'20px', fontFamily:'Foregen', color:'#a4243d'}}>
            Our Recipes
          </Box>
           <Grid container>
           {
            recipieData.map((recipie, index) => {
              return(
              <Grid xs={12} sm={12} md={4} lg={3}  key={index}>
                  <Box key={index} style={styles.productItem}
                      onClick={() => navigate(`/recipieDetails/${recipie.id}`)}>
                    
                      <img src={recipie.imgUrl} style={styles.recImg} />
                      <Box sx={{ padding:'10px 5px', color:'#FFF0D9', textAlign:'center', fontSize:'20px', width:'60%'}}>
                        {recipie.title}
                      </Box>
                      
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