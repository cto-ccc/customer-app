import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllCCCBlogs, getBlogData, logAction } from '../services/api';
import ComponentLoader from '../components/ComponentLoader';
import Box from '@mui/material/Box';
import {Helmet} from "react-helmet";
import NavHeader from '../components/NavHeader';
import Grid from '@mui/material/Unstable_Grid2';


const styles = {
  productGridCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  productItem : {
    margin:'10px',
    width:'90%',
    background:'white',
    borderRadius:'5px',
    boxShadow:'0px 0px 5px 2px #eaeaea',
    cursor:'pointer',
    padding:'20px',
    minHeight:'50px',
    fontSize:'20px',
    fontWeight:'600'
  },
}

function AllBlogs() {

  const [loading, setLoading]      = useState(true)
  const [blogs, setAllBlogs]       = useState('')
  const navigate = useNavigate()

  const getAllBlogs = async() => {
    const resp = await getAllCCCBlogs()
    console.log("=======", resp)
    setAllBlogs(resp)
    setLoading(false)
  }

  useEffect(() => {
    logAction('ALL_BLOG')
    getAllBlogs()
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
        <h2>
          All Blogs
        </h2>
        <Grid container>
            {
              blogs.map((blogItem) => {
              return <Grid xs={12} sm={6} md={4} lg={3} style={styles.productGridCont} key={blogItem.id}
                onClick={() => navigate(`/blog/${blogItem.id}`)}>
                <Box style={styles.productItem}>
                 {blogItem.title}
                </Box>
              </Grid>
              })
            }
          </Grid>
      </Box>
    }
    </Box>
  )
}

export default AllBlogs