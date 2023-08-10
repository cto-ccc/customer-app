import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ComponentLoader from '../components/ComponentLoader';
import { Grid } from '@mui/material';
import { getRecepieVideos, logAction } from '../services/api';
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

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [recipieData, setRecipieData] = useState([{
    title : 'Kullu Country Chicken Curry',
    id : 'kullu-country-chicken-curry',
    imgUrl : 'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fkallu-country-chicken.png?alt=media&token=b88efdc7-f1d8-41e1-be5a-55598cb3349c'
  },
  {
    title : 'Ginger Country Chicken',
    id:'ginger-country-chicken',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fgigner-country-chicken.png?alt=media&token=47fb0e48-e9f1-4f68-9ed0-5c938da8b330'
  },
  {
    title:'Country Chicken Biryani',
    id:'country-chicken-biryani',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fcountry-chicken-biryani.png?alt=media&token=f51ff155-1345-4b04-9867-72ea2311f7d1'
  },
  {
    title:'Nellore Country Chicken Pulusu',
    id:'nellore-country-chicken-pulusu',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fnellore-country-chicken-pulusu.png?alt=media&token=f7146f17-fedb-4a72-95f2-654650b58ba2'
  },
  {
    title:'Rayalseema Country Chicken Vepudu',
    id:'rayalseema-country-chicken-vepudu',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Frayalaseems-country-chicken-vepudu.png?alt=media&token=e9cc3176-aaa7-4d23-8d1a-0f671d8b0223'
  },
  {
    title:'Country Chicken RajuGari Pulao',
    id:'country-chicken-rajugari-pulao',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fcountry-chicken-raju-pulao.png?alt=media&token=3dd59364-b2c0-44ee-84c6-d205df0e7d93'
  },
  {
    title:'Country Chicken Roast',
    id:'country-chicken-roast',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fcountry-chicken-roast.png?alt=media&token=55d2a1f6-9ec4-4575-8ca6-1f4c4cde433d'
  },
  {
    title:'Dum Country Chicken',
    id:'dum-country-chicken',
    imgUrl:'https://firebasestorage.googleapis.com/v0/b/countrychickenco.appspot.com/o/recipies%2Fdum-country-chicken.png?alt=media&token=3ac4b684-1e99-4505-9d4a-18c57d9f6c63'
  }
  ])


  
  useEffect(() => {
    logAction('PAGE_VIEW', 'recipes')
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