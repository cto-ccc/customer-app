import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBlogData, logAction } from '../services/api';
import ComponentLoader from '../components/ComponentLoader';
import Box from '@mui/material/Box';
import {Helmet} from "react-helmet";
import NavHeader from '../components/NavHeader';

function Blog() {

  const { id }   = useParams()
  const [loading, setLoading]      = useState(true)
  const [blogdet, setBlogDet]      = useState('')

  const getBlogDetails = async() => {
    const resp = await getBlogData(id)
    setBlogDet(resp.blog)
    setLoading(false)
  }

  useEffect(() => {
    logAction('BLOG', id)
    getBlogDetails()
  }, [])

  return (
    <Box sx={{padding:'4vw', marginTop:'7vh', paddingBottom:'8vh'}}>
    {
      loading ? 
      <ComponentLoader /> : 
      <Box>
        <Helmet>
          {/* <title>{metaData[id].title}</title>
          <meta name='description' content={metaData[id].description} />
          <meta name='keywords' content={metaData[id].keywords} /> */}
        </Helmet>
        <NavHeader />
        <Box>
          <div dangerouslySetInnerHTML={{__html: blogdet}} />
        </Box>
      </Box>
    }
    </Box>
  )
}

export default Blog