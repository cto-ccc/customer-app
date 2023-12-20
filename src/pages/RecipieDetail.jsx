import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBlogData, getRecipieData, logAction } from '../services/api';
import ComponentLoader from '../components/ComponentLoader';
import Box from '@mui/material/Box';
import {Helmet} from "react-helmet";
import NavHeader from '../components/NavHeader';
import { CommonContext } from '../contexts/CommonContext';

const styles = {
  metaItem : {
    display:'flex',
    flexDirection:'column', 
    margin:'5px 20px'
  },
  recImg : {
    width:'100%',
    height:'450px'
  }
}

function RecipieDetail() {

  const { id }   = useParams()
  const [loading, setLoading]            = useState(true)
  const [recipieDet, setRecipieDet]      = useState(null)
  const { isDesktop } = useContext(CommonContext)

  const getBlogDetails = async() => {
    const resp = await getRecipieData(id)
    if (resp)
      setRecipieDet(resp.recipieData)
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
          <img src={recipieDet.imgUrl} style={isDesktop ? null : styles.recImg} />
        </Box >

        <Box dangerouslySetInnerHTML={{__html: recipieDet.recipeData}}>

        </Box>
      </Box>
    }
    </Box>
  )
}

export default RecipieDetail