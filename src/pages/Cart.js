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


const styles = {
  cartCont : {
    display : 'flex',
    padding:'10px'
  },
  cartImg : {
    width : '60px',
    height : '40px',
    borderRadius:'10px',
    marginRight:'10px',
    border:'1px solid #eaeaea'
  },
  shadowBox : {
    background : 'white',
    // borderRadius : '13px',
    boxShadow : '0px 0px 10px 0px #eaeaea',
    padding:'5px',
    margin:'15px'
    // width:'100%'
  },
  shadowBoxDesk : {
    background : 'white',
    // borderRadius : '13px',
    boxShadow : '0px 0px 10px 0px #eaeaea',
    padding:'5px',
    marginTop:'18px'
  },
  cartOfferImg : {
    width:'100%',
    height:'200px',
    marginTop:'10px'
  }
}

function Cart() {

  const navigate = useNavigate()

  const { updateCart, getCartData, clearCart, isDesktop, cartData } = useContext(CommonContext)
  const [instructions, setInstructions] = useState('')
  const { isUserLoggedIn } = useContext(AuthContext)
  // const [cartData, setCartData] = useState({})
  const [loading, setLoading] = useState(true)
  const [offerProds, setOfferProds] = useState([
    {
      name : 'Brown Eggs',
      price : 79,
      mrp:149,
      id : 'C041',
      qty : '6 Pack',
      imgUrl : 'EggsLogo',  
      urlId : 'brown-eggs-6pack',

      preferredBy:'Everyone',
      healthBenefits:'Strengthens immunity, good for the heart, aids in building strong muscles and helps gain healthy skin & hair',
  
      stockQty : 1,

      description:'Our free-range eggs are produced by happy, pasture-raised hens and are 100% hormone and antibiotic-free. They are rich in essential nutrients and proteins that promote good health, including stronger immunity, healthier skin and hair, and stronger muscles. We do not use any yolk colour enhancers, and we conduct rigorous quality checks on all our feed ingredients to ensure that you get the best quality eggs possible.\n\nNaturally Nourishing Free-Range Eggs, produced by happy, pasture-raised hens. These 100% hormone and antibiotic-free eggs offer numerous health benefits.Packed with omega 3 fatty acids, Vitamin B12,Vitamin B2, Vitamin D, vitamin E, Calcium and iron. with We ensure the finest, nutrient-rich feed without using any yolk color enhancers, resulting in exceptional and authentic eggs. Experience the wholesome goodness of ethically sourced eggs with every delicious bite.'
    },
    {
      name : 'Brown Eggs',
      mrp : 450,
      price:269,
      id : 'C042',
      qty : '30 Pack',
      imgUrl : 'ThirtyEggsLogo',
      urlId : 'brown-eggs',

      stockQty : 1,
      
      preferredBy:'Everyone',
      healthBenefits:'Strengthens immunity, good for the heart, aids in building strong muscles and helps gain healthy skin & hair',
  
  
      description:'Our free-range eggs are produced by happy, pasture-raised hens and are 100% hormone and antibiotic-free. They are rich in essential nutrients and proteins that promote good health, including stronger immunity, healthier skin and hair, and stronger muscles. We do not use any yolk colour enhancers, and we conduct rigorous quality checks on all our feed ingredients to ensure that you get the best quality eggs possible.\n\nNaturally Nourishing Free-Range Eggs, produced by happy, pasture-raised hens. These 100% hormone and antibiotic-free eggs offer numerous health benefits.Packed with omega 3 fatty acids, Vitamin B12,Vitamin B2, Vitamin D, vitamin E, Calcium and iron. with We ensure the finest, nutrient-rich feed without using any yolk color enhancers, resulting in exceptional and authentic eggs. Experience the wholesome goodness of ethically sourced eggs with every delicious bite.'
    },
  ])


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
      navigate('/auth')
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
        <Box sx={{fontSize:'25px'}}>
          Cart Items
        </Box>
        {
          (!cartData || Object.keys(cartData).length < 4) ?
          <Box sx={{background:'white', padding:'20px', mt:2}}>
            No items in your cart
          </Box> : 
          <Grid container rowSpacing={2} columnSpacing={4}>
            <Grid item style={isDesktop ? styles.shadowBoxDesk : styles.shadowBox} xs={12} sm={12} md={6} lg={6}>
            {
              Object.keys(cartData).map((item, index) => {
                return <Box key={index}>{
                  item == 'totalCount' || item == 'totalAmount' || item == 'totalDiscount' ? 
                  null : 
                  <Box key={index} style={styles.cartCont}>

                    <Box>
                      <img src={getImgMap()[cartData[item].imgUrl]} style={styles.cartImg}/>
                    </Box>

                    <Box sx={{width:'100%'}}>
                      <Box sx={{fontSize:'18px', color:'#a4243d', fontWeight:'500'}}>
                        {cartData[item].name}
                      </Box>
                      {
                        cartData[item].extras ?
                        <Box sx={{display:'flex', flexDirection:'column'}}>

                          <Box sx={{display:'flex'}}>
                            <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'14px', borderRadius:'5px'}}>
                              {cartData[item].extras.skinType == 'withskin' ? 'With Skin' : 'Skinless'}
                            </Box>
                            <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'14px', borderRadius:'5px', textTransform:'capitalize'}}>
                              {cartData[item].extras.cutType || null} Cut
                            </Box>
                            <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'14px', borderRadius:'5px', textTransform:'capitalize'}}>
                              {cartData[item].extras.boneType == 'withBones' ? 'With Bone' : 'Boneless'} 
                            </Box>
                          </Box>
                          
                            { cartData[item].extras.flavourType == 'normal' ? null : 
                              <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'14px', borderRadius:'5px', width:'fit-content'}}>
                                Smoked & Turmeric (+15 /-)
                              </Box>
                            }
                                            
                        </Box> : null
                      }

                      <Box sx={{display:'flex', justifyContent:'space-between', padding:'10px 0px 10px 0'}}>
                        <Box sx={{display:'flex', fontSize:'13px', alignItems:'center'}}>
                          <Box sx={{minWidth:'50px', marginRight:'10px', display:'flex', alignItems:'center'}}>
                            {cartData[item].qty}
                          </Box>
                          
                          <Box sx={{display:'flex', alignItems:'center', marginLeft:'15px', fontSize:'13px'}}>
                            <Box sx={{border:'1px solid #eaeaea', padding:'0 7px', cursor:'pointer'}}
                              onClick={() => updateCart(cartData[item], false)}>
                              -
                            </Box>
                            <Box sx={{padding:'0px 7px'}}>
                              {cartData[item].count}
                            </Box>
                            <Box sx={{border:'1px solid #eaeaea', padding:'0 7px', cursor:'pointer'}}
                              onClick={() => updateCart(cartData[item], true)}>
                              +
                            </Box>
                          
                          </Box>
                        </Box>

                        <Box sx={{display:'flex', alignItems:'baseline'}}>
                          <Box sx={{fontSize:'10px', marginRight:'7px'}}>
                            <s>₹  {cartData[item].mrp * cartData[item].count}</s> 
                          </Box>
                          <Box>
                            ₹ {cartData[item].price * cartData[item].count}
                          </Box>
                          
                        </Box>
                      </Box>
                    </Box>

                  </Box>
                }
                </Box>
              })
            }

    
            <Box sx={{padding:'10px', margin:'10px 0', border:'1px solid lightgreen', color:'green', fontWeight:'bold', textAlign:'center', fontSize:'13px'}}>
              Congratulations! You have saved ₹{cartData.totalDiscount} /-
            </Box>
            <Box sx={{padding:'20px 15px'}}>
              <Box sx={{borderTop:'1px solid #ebebeb',display:'flex', paddingTop:'20px', justifyContent:'space-between', alignItems:'center', fontSize:'13px', opacity:'0.5'}}>
                <Box>
                  Delivery Charge
                </Box>
                <Box>
                  ₹ {getDeliveryCharge()}
                </Box>
              </Box>
            </Box>
            <Box sx={{padding:'0px 15px 10px 15px'}}>
              <Box sx={{borderTop:'1px solid #b1b1b1',display:'flex', paddingTop:'20px', justifyContent:'space-between', alignItems:'center'}}>
                <Box>
                  Total Amount
                </Box>
                <Box sx={{fontWeight:'bold'}}>
                  ₹ {cartData.totalAmount + getDeliveryCharge()} 
                </Box>
              </Box>
            </Box>

            <Box sx={{padding:'20px'}}>
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

            <Box sx={{padding:'20px'}}>
              <Button fullWidth onClick={() => checkout()} variant="contained">
                Checkout 
              </Button>
            </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <img src={CartOffer} style={styles.cartOfferImg} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <ProductCard products={offerProds} cartData={cartData}>
                  </ProductCard>
                </Grid>
              </Grid>
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
