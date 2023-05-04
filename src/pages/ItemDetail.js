import { React, useContext, useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { getImgMap } from '../services/api';


const styles = {
  prodImg : {
    width:'100%',
    height:'250px',
    borderRadius:'5px 5px 0 0',
    borderBottom:'1px solid #eaeaea'
  }
}
function ItemDetail() {

  const location = useLocation()

  useEffect(() => {
    console.log("====", location.state)
  })
  return (
    <Box sx={{padding:'4vw', marginTop:'5vh'}}>
      <Box sx={{padding:'10px', border:'1px solid #eaeaea', boxShadow:'0 0 5px 5px #eaeaea'}}>
        <Box>
          <img src={getImgMap()[location.state.imgUrl]} style={styles.prodImg}/>
        </Box>
        <Box sx={{fontSize:'20px', fontWeight:'600', mt:2, mb:1}}>
          {location.state.name}
        </Box>
        <Box sx={{fontSize:'17px', mb:1}}>
          {location.state.qty}
        </Box>
        <Box sx={{display:'flex',alignItems:'baseline',  mb:1}}>
          <Box sx={{fontSize:'20px', mr:1}}>
            ₹ {location.state.price} 
          </Box>
          <Box sx={{fontSize:'15px'}}>
            <s>₹ {location.state.mrp}</s> 
          </Box>
        
        </Box>
        <Box sx={{whiteSpace:'pre-line', textAlign:'justify', wordBreak:'break-word'}}>
          {location.state.description}
        </Box>
      </Box>
    </Box>
  )
}

export default ItemDetail