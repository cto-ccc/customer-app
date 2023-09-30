import { React, useContext, useEffect, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext';
import ComponentLoader from '../components/ComponentLoader';
import { getDeliveryCharge, getImgMap, logAction } from '../services/api';
import CartOffer from '../assets/cart-offer.png'
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '../components/ProductCard';
import NavHeader from '../components/NavHeader';
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ItemsSummary from '../components/ItemsSummary';

const styles = {
  cartCont : {
    display : 'flex',
    padding:'10px',
    flexDirection:'column'
  },
  shadowBox : {
    background : 'none',
    // borderRadius : '13px',
    // boxShadow : '0px 0px 10px 0px #eaeaea',
    padding:'5px',
    margin:'10px',
    // width:'100%'
  },
  shadowBoxDesk : {
    // background : 'white',
    // borderRadius : '13px',
    // boxShadow : '0px 0px 10px 0px #eaeaea',
    // boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)'
    padding:'5px',
    marginTop:'18px',
    width:'55%'
  },
  cartOfferImg : {
    width:'100%',
    height:'200px',
    marginTop:'10px'
  }
}

function Cart() {

  const navigate = useNavigate()

  const { updateCart, getCartData, clearCart, isDesktop, cartData, getCouponData, couponCacheData, clearCouponData } = useContext(CommonContext)
  const [instructions, setInstructions] = useState('')
  const { isUserLoggedIn } = useContext(AuthContext)
  // const [cartData, setCartData] = useState({})
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // fetchCartData()
    logAction('PAGE_VIEW', 'cart')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  

  const checkout = async() => {
    if(await isUserLoggedIn()) {
      navigate(`/delivery`, {state : {instructions : instructions}})
    } else {
      navigate('/auth', {state : {navToCart : true}})
    }
  }

  // const fetchCartData = async() => {
  //   console.log("======", await getCartData())
  //   setCartData(await getCartData())
  // }


  return (
    <motion.div
    initial={{opacity:0}} 
    animate={{opacity:1}}>
    <Box sx={{padding:'4vw'}}>
    {
      loading ? <ComponentLoader /> : 
      <Box sx={{ marginTop:'7vh'}}>
        <NavHeader />
        <Box sx={{fontSize:'25px', fontFamily:'Foregen'}}>
          Cart Items
        </Box>
        {
          (!cartData || Object.keys(cartData).length < 5) ?
          <Box sx={{background:'white', padding:'20px', mt:2}}>
            No items in your cart
          </Box> 
          : 
          <Grid container rowSpacing={2} columnSpacing={4}>
           
            <Grid item style={isDesktop ? styles.shadowBoxDesk : styles.shadowBox} xs={12} sm={12} md={6} lg={6}>

            {/* Product List Container */}
            <ItemsSummary itemDetails={cartData} />
            {/* <Box sx={{padding:'10px', margin:'10px 0', border:'1px solid lightgreen', color:'green', fontWeight:'bold', textAlign:'center', fontSize:'13px'}}>
              Congratulations! You have saved ₹{cartData.totalDiscount} /-
            </Box> */}

            {
              isDesktop ? 
              <Box sx={{fontSize:'20px', fontFamily:'Foregen', mt:3}}>
                DELIVERY INSTRUCTIONS
              </Box> : null
            }
            

            <Box sx={{padding:'10px', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px', mt: isDesktop ? 1 : 2}}>
              <TextField
                placeholder="Add Delivery Instructions"
                multiline
                value={instructions}
                rows={2}
                onChange={(event) => {setInstructions(event.target.value)}}
                fullWidth
                maxRows={4}
              />
            </Box>
            
            <Box>

              {
                cartData.bogoDiscount ? 
                <>
                  <Box sx={{display:'flex', alignItems:'center', border:'1px solid #F47F13', borderRadius:'10px', 
                              justifyContent:'center', margin:'20px 0 0 0', padding:'10px', background: '#F47F13'}}>

                      <Box sx={{color:'white', fontFamily:'Foregen', width:'50%'}}>
                        COUPON APPLIED : BOGO
                      </Box>
                      <Box  sx={{color:'white', width:'50%', textAlign:'right', fontSize:'12px'}}>
                       You just got 1Kg FREE Country Chicken
                      </Box>
                    </Box>
                </> : <>
                  {
                    couponCacheData && couponCacheData.couponCode ?
                    <Box sx={{padding:'5px 15px'}}>
                      <Box sx={{borderTop:'1px solid #ebebeb',display:'flex', paddingTop:'20px', justifyContent:'space-between', alignItems:'center', fontSize:'13px'}}>
                        <Box sx={{display:'flex', alignItems:'center'}}
                          onClick={() => clearCouponData()}>
                          Coupon Discount [ {couponCacheData.couponCode} ]
                          <HighlightOffIcon sx={{fontSize:'15px', marginLeft:'10px'}}/>
                        </Box>
                        <Box>
                        - ₹ {couponCacheData.couponValue}
                        </Box>
                      </Box>
                    </Box> : 
                    <Box onClick={() => navigate('/applyCoupon')}
                      sx={{ padding:'10px', cursor:'pointer', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px',
                          display:'flex', justifyContent:'space-between', marginTop:'20px', fontFamily:'Foregen', alignItems:'center'}}>
                      APPLY COUPONS
                      <ChevronRightIcon />
                    </Box>
                  }
                </>
              }


              <Box sx={{background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px', marginTop:'20px', padding:'10px'}}>

                <Box  sx={{fontWeight:'bold', fontFamily:'Foregen', fontSize:'12px'}}>
                  PRICE DETAILS
                </Box>

                <Box sx={{paddingTop:'8px'}}>
                  <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'11px', opacity:'0.8'}}>
                    <Box>
                      MRP
                    </Box>
                    <Box>
                      ₹{Number(cartData.totalAmount) + Number(cartData.totalDiscount) + Number(cartData.bogoDiscount ||0)}
                    </Box>
                  </Box>
                </Box>

                {
                  cartData?.bogoDiscount ? 
                  <Box sx={{paddingTop:'8px'}}>
                    <Box sx={{display:'flex',justifyContent:'space-between', alignItems:'center', fontSize:'11px', opacity:'0.8'}}>
                      <Box>
                        BOGO Discount
                      </Box>
                      <Box sx={{color:'#a4243d'}}>
                        -₹{cartData.bogoDiscount}
                      </Box>
                    </Box>
                  </Box> : null
                }

                {
                  cartData?.totalDiscount ? 
                  <Box sx={{paddingTop:'8px'}}>
                    <Box sx={{display:'flex',justifyContent:'space-between', alignItems:'center', fontSize:'11px', opacity:'0.8'}}>
                      <Box>
                        Discount on MRP
                      </Box>
                      <Box sx={{color:'#a4243d'}}>
                        -₹{cartData.totalDiscount}
                      </Box>
                    </Box>
                  </Box> : null
                }

                <Box sx={{padding:'8px 0px'}}>
                  <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'11px', opacity:'0.8'}}>
                    <Box>
                      Delivery Charge
                    </Box>
                    <Box>
                      ₹{getDeliveryCharge()}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{borderTop:'1px solid #b1b1b1',display:'flex', paddingTop:'10px', justifyContent:'space-between', alignItems:'center'}}>
                  <Box>
                    To Pay
                  </Box>
                  <Box sx={{fontWeight:'bold'}}>
                    ₹ {cartData.totalAmount + getDeliveryCharge() - (couponCacheData?.couponValue || 0)}
                  </Box>
                </Box>
                </Box>
              </Box>

            <Box sx={{padding:'20px 0'}}>
              <Button fullWidth onClick={() => checkout()} variant="contained">
                Checkout 
              </Button>
            </Box>
            </Grid>

          </Grid>
        }      
      </Box>
    }
    </Box>
    </motion.div>
  )
}

export default Cart
