import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBlogData, getRecipieData, logAction } from '../services/api';
import ComponentLoader from '../components/ComponentLoader';
import Box from '@mui/material/Box';
import {Helmet} from "react-helmet";
import NavHeader from '../components/NavHeader';

const styles = {
  metaItem : {
    display:'flex',
    flexDirection:'column', 
    margin:'0 20px'
  }
}

function RecipieDetail() {

  const { id }   = useParams()
  const [loading, setLoading]            = useState(true)
  const [recipieDet, setRecipieDet]      = useState(null)

  const getBlogDetails = async() => {
    const resp = await getRecipieData(id)
    console.log("======", resp)
    if (resp)
      setRecipieDet(resp)
    setLoading(false)
  }

  useEffect(() => {
    logAction('RECIPE_DETAIL', id)
    getBlogDetails()
  }, [])


  return (
    <Box sx={{padding:'4vw', marginTop:'7vh', paddingBottom:'8vh', maxWidth:'700px'}}>
    {
      loading || !recipieDet ? 
      <ComponentLoader /> : 
      <Box>
        <Helmet>
          {/* <title>{metaData[id].title}</title>
          <meta name='description' content={metaData[id].description} />
          <meta name='keywords' content={metaData[id].keywords} /> */}
        </Helmet>
        <NavHeader />
        <Box sx={{fontFamily:'Foregen', fontSize:'50px', color:'#a4243d', marginBottom:'20px'}}>
          {recipieDet.title}
        </Box>
        <Box>
          <img src={recipieDet.imgUrl} />
        </Box>

        <Box sx={{border:'1px solid #a4243d', borderRadius:'10px', display:'flex', flexDirection:'column', padding:'20px',
                  marginTop:'20px', width:'fit-content', flexDirection:'column'}}>
            
           <Box sx={{display:'flex', borderBottom:'1px solid #a4243d', paddingBottom:'20px'}}>

            <Box style={styles.metaItem}>
              <Box>
                Prep Time:
              </Box>
              <Box>
                {recipieDet.cookingData['prepTime']}
              </Box>
            </Box>

            <Box style={styles.metaItem}>
              <Box>
                Cooking Time:
              </Box>
              <Box sx={{fontWeight:'300'}}>
                {recipieDet.cookingData['cookingTime']}
              </Box>
            </Box>

            <Box style={styles.metaItem}>
              <Box>
                Total Time:
              </Box>
              <Box sx={{fontWeight:'300'}}>
                {recipieDet.cookingData['totalTime']}
              </Box>
            </Box>

            <Box style={styles.metaItem}s>
              <Box>
                Servings:
              </Box>
              <Box sx={{fontWeight:'300'}}>
                {recipieDet.cookingData['servings']}
              </Box>
            </Box>

          </Box>

          <Box sx={{padding:'20px 15px 10px 15px', color:'#a4243d', fontSize:'20px'}}>
            Nutritional Facts (Per Serving)
          </Box>

          <Box sx={{display:'flex'}}>

            <Box style={styles.metaItem}>
              <Box>
                {recipieDet.nutritionalData['calories']}
              </Box>
              <Box>
                Calories
              </Box>
            </Box>

            <Box style={styles.metaItem}>
              <Box>
                {recipieDet.nutritionalData['protien']}
              </Box>
              <Box sx={{fontWeight:'300'}}>
                Protien
              </Box>
            </Box>

            <Box style={styles.metaItem}>
              <Box>
                {recipieDet.nutritionalData['carbs']}
              </Box>
              <Box sx={{fontWeight:'300'}}>
                Carbs
              </Box>
            </Box>

            <Box style={styles.metaItem}s>
              <Box>
                {recipieDet.nutritionalData['fats']}
              </Box>
              <Box sx={{fontWeight:'300'}}>
                Fats
              </Box>
            </Box>

          </Box>



          <Box>

          </Box>
        </Box>

        <Box>
            <Box sx={{fontFamily:'Foregen', fontSize:'30px', margin:'30px 0 10px 0'}}>
              Ingredients
            </Box>
            <Box>
            {
              recipieDet.ingredients.map((item) => {
                return(
                  <Box sx={{marginBottom:'3px', opacity:'0.7'}}>
                    {item}
                  </Box>
                )
              })
            }
            </Box>
        </Box>
        <Box>
            <Box sx={{fontFamily:'Foregen', fontSize:'30px', margin:'30px 0 10px 0'}}>
              Directions
            </Box>
            <Box>
            {
              recipieDet.directions.map((item, index) => {
                return(
                  <Box sx={{marginBottom:'20px'}}>
                    <Box>
                      Step {index+1}
                    </Box>
                    <Box sx={{opacity:'0.7'}}>
                    {item}
                    </Box>
                    
                  </Box>
                )
              })
            }
            </Box>
        </Box>
      </Box>
    }
    </Box>
  )
}

export default RecipieDetail