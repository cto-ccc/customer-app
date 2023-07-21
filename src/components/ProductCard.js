import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { getCustomizedProducts, getImgMap } from '../services/api';
import { CommonContext } from '../contexts/CommonContext';
import Button from '@mui/material/Button'




const styles = {
  productGridCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    margin:'20px 20px 20px 0',
  },
  productItem : {
    // margin:'10px',
    width:'100%',
    background:'white',
    borderRadius:'5px',
    boxShadow:'0px 0px 5px 2px #eaeaea'
  },
  productImg : {
    width:'100%',
    height:'180px',
    borderRadius:'5px 5px 0 0'
  },
  productDescCont : {
    padding:'15px',
    textAlign:'left',
    background:'#ffebeb',
    // borderRadius:'25px 25px 20px 20px'
  },
  incCont : {
    display : 'flex',
    justifyContent:'right',
    padding:'5px'
  },
  discountCont : {
    background:'#a4243d',
    color:'white',
    top:'10px',
    fontSize:'13px',
    boxShadow:'0 0 5px -1px white',
    padding:'5px 8px',
    width:'min-content',
    position:'absolute',
    width:'auto',
    borderRadius:'0 3px 3px 0'
  },
  prodName : {
    textAlign:'left', 
    marginBottom:'5px', 
    fontWeight:'450', 
    fontSize:'20px',
    cursor:'pointer',
    "&:hover": {
      color:'#a4243d'
    }
  }
}

function ProductCard(props) {

  const location = useLocation()
  const navigate = useNavigate()
  const { updateCart, getCartData, clearCart, isDesktop, cartData } = useContext(CommonContext)

  async function addToCart(item) {
    // if (getCustomizedProducts().includes(item.id)) {
      // setAnchor(true)
      // setSelectedItem(item)
    // } else {
      console.log("======", item)
      updateCart(item, true)
    // }
  }

  return (
    <Grid container>
    {
      props.products.map((chick) => {
      return <Grid xs={12} sm={12} md={4} lg={5} style={styles.productGridCont} key={chick.id}>
        <Box style={styles.productItem}>
          <Box sx={{textAlign:'center', height:'250px', position:'relative', cursor:'pointer', display:'flex', alignItems:'center'}}
            onClick={() => navigate(`/products/${chick.urlId}`, {state : chick})}>
            <Box sx={styles.discountCont}>
              ₹ {chick.mrp - chick.price}/- Off
            </Box>
            <img src={getImgMap()[chick.imgUrl]} style={styles.productImg}/>
          </Box>
          <div style={styles.productDescCont}>
            <Box sx={styles.prodName}
              onClick={() => navigate(`/products/${chick.urlId}`, {state : chick})}>
              {chick.name}
            </Box>
            {
              chick.style ? 
              <Box sx={{textAlign:'left', marginBottom:'5px',fontSize:'11px'}}>
                ({chick.style})
              </Box> : null
            }
            
            <Box sx={{textAlign:'left', marginBottom:'5px', fontWeight:'450', fontSize:'15px'}}>
              {chick.qty}
            </Box>
            <Box sx={{textAlign:'left', marginBottom:'5px', fontSize:'20px', display:'flex', alignItems:'end'}}>
            ₹ {chick.price} <Box sx={{fontSize:'15px', marginLeft:'5px', opacity:'0.5'}}><s>₹ {chick.mrp}</s></Box> 
            </Box>

            {
              cartData && cartData[chick.id] && cartData[chick.id].count ?
              <Box style={styles.incCont}>
                <Box sx={{border:'1px solid #dddddd', 
                          display:'flex', 
                          borderRadius:'5px', 
                          background:'white', border:'1px solid #c3c3c3'}}>
                  <Box onClick={() => updateCart(chick, false)}
                    sx={{padding:'5px 15px 5px 15px', fontSize:'20px', cursor:'pointer'}}>
                    -
                  </Box>
                  <Box sx={{padding:'5px 10px', 
                            borderRight:'1px solid #bababa', 
                            borderLeft:'1px solid #bababa', fontSize:'20px',
                            background:'#a4243d !important', color:'white'}}>
                    {cartData[chick.id].count}
                  </Box>
                  <Box  onClick={() => updateCart(chick, true)}
                    sx={{padding:'5px 15px 5px 15px', fontSize:'20px', cursor:'pointer'}}>
                    +
                  </Box>
                </Box>
              </Box> : 
              <Box sx={{textAlign:'right'}}>
                {
                  chick.stockQty == 0 ?
                  <Button variant="outlined" style={styles.mainBtn} disabled sx={{opacity:'0.6'}}>
                    Out of stock
                  </Button> : 
                  <Button variant="contained" style={styles.mainBtn} onClick={() => addToCart(chick)}>
                    Add To Cart
                  </Button>
                }
                
              </Box>
            }
            
          </div>
        </Box>
      </Grid>
      })
    }
  </Grid>
  )
}

export default ProductCard