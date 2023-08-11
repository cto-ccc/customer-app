import React, { useContext, useEffect, useState } from 'react'
import { Box, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import CatFreeRange1 from '../assets/land-cat-freerange.png'
import CatVillageBirds1 from '../assets/land-cat-village.png'
import CatMarinates1 from '../assets/land-cat-marinates.png'
import CatEggs1 from '../assets/land-cat-eggs.png'
import CatPickles1 from '../assets/land-cat-pickle.png'
import CatNutrisoft1 from '../assets/land-cat-nutrisoft.png'
import NavHeader from '../components/NavHeader'
import { logAction } from '../services/api'
import ComponentLoader from '../components/ComponentLoader'

const styles = {

  posterCont : {
    textAlign:'center',
    borderRadius:'10px',
    boxShadow:'0px 0px 10px 0px #eaeaea',
    margin:'0 5px'
  },
  topCatCont : {
    display:'inline-grid', 
    marginBottom:'20px',
    gridTemplateColumns: 'auto auto',
    width:'92vw',
    padding:'0 4vw'
  },
  posterImg : {
    width:'100%',
    height:'140px',
    marginBottom:'10px',
    boxShadow:'0 0 5px 0px #b3b1b1',
    borderRadius:'2px'
  }
}

function AllCategories() {

  const { isDesktop } = useContext(CommonContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // fetchCartData()
    logAction('ALL_CATEGORIES', 'cart')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {
        loading ? 
        <Box sx={{padding:'4vw'}}> <ComponentLoader /> </Box>
         :
        <>
        <NavHeader />
 
         <Box sx={{padding: isDesktop ? '3vw 3vw 1vw 2vw' : '10vh 4vw 4vw 4vw' , fontSize:'20px', fontWeight:'bold', display:'grid', color:'#a4243d'}}>
           Categories
         </Box>
 
         <Box sx={isDesktop ? styles.topCatContDesk : styles.topCatCont}>
           <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
             onClick={() => navigate('/categories/nutrisoft-chicken')}>
             <img src={CatNutrisoft1} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
             {/* Nutrisoft Chicken */}
           </Box>
           <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
             onClick={() => navigate('/categories/free-range-birds')}>
             <img src={CatFreeRange1} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
             {/* Free Range Birds */}
           </Box>
           <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
             onClick={() => navigate('/categories/village-birds')}>
             <img src={CatVillageBirds1} style={isDesktop ? styles.posterImgDesk : styles.posterImg} />
             {/* Village Birds */}
           </Box>
           <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
             onClick={() => navigate('/categories/eggs')}>
             <img src={CatEggs1} style={isDesktop ? styles.posterImgDesk : styles.posterImg}/>
             {/* Eggs */}
           </Box>
           <Box style={isDesktop ? styles.posterContDesk : styles.posterCont} 
             onClick={() => navigate('/categories/pickles')}>
             <img src={CatPickles1} style={isDesktop ? styles.posterImgDesk : styles.posterImg}/>
             {/* Pickles */}
           </Box>
           <Box style={isDesktop ? styles.posterContDesk : styles.posterCont}>
             <img src={CatMarinates1} style={isDesktop ? styles.posterImgDesk :  styles.posterImg}/>
             {/* Marinates */}
           </Box>
         </Box>
     </>
      }
    </>

  )
}

export default AllCategories