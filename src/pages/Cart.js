import { React, useContext, useEffect, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { AuthContext } from '../contexts/AuthContext';
import ComponentLoader from '../components/ComponentLoader';
import { getImgMap } from '../services/api';
import CartOffer from '../assets/banner1.jpeg'
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '../components/ProductCard';


const styles = {
  cartCont : {
    display : 'flex',
    padding:'10px'
  },
  cartImg : {
    width : '60px',
    height : '60px',
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
  const { isUserLoggedIn } = useContext(AuthContext)
  // const [cartData, setCartData] = useState({})
  const [loading, setLoading] = useState(true)
  const [offerProds, setOfferProds] = useState([
    {
      name : 'Country Eggs',
      mrp : 149,
      price:99,
      id : 'C043',
      qty : '6 Pack',
      imgUrl : 'EggsLogo',
  
      preferredBy:'Health-Conscious Individuals',
      healthBenefits:'Contains vital nutrients – Vitamins A, B5, B12 and E, including phosphorus and iodine, helps to improve good cholesterol levels and aids weight management',
      description:'Our country eggs are the perfect addition to any healthy diet, especially for women who need essential nutrients to maintain their health. At CountryChickenCo, we source our eggs from local villages, where our country hens are free-range and only fed natural diets without any antibiotics or vaccines. Our commitment to natural farming practices ensures that our eggs are not only healthy but also sustainably produced.'
    },
    {
      name : 'Brown Eggs',
      mrp : 450,
      price:269,
      id : 'C042',
      qty : '30 Pack',
      imgUrl : 'ThirtyEggsLogo',
  
      preferredBy:'Everyone',
      healthBenefits:'Strengthens immunity, good for the heart, aids in building strong muscles and helps gain healthy skin & hair',
  
  
      description:'Our free-range eggs are produced by happy, pasture-raised hens and are 100% hormone and antibiotic-free. They are rich in essential nutrients and proteins that promote good health, including stronger immunity, healthier skin and hair, and stronger muscles. We do not use any yolk colour enhancers, and we conduct rigorous quality checks on all our feed ingredients to ensure that you get the best quality eggs possible.\n\nNaturally Nourishing Free-Range Eggs, produced by happy, pasture-raised hens. These 100% hormone and antibiotic-free eggs offer numerous health benefits.Packed with omega 3 fatty acids, Vitamin B12,Vitamin B2, Vitamin D, vitamin E, Calcium and iron. with We ensure the finest, nutrient-rich feed without using any yolk color enhancers, resulting in exceptional and authentic eggs. Experience the wholesome goodness of ethically sourced eggs with every delicious bite.'
    },
  ])


  useEffect(() => {
    // fetchCartData()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  

  const checkout = async() => {
    if(await isUserLoggedIn()) {
      navigate(`/delivery`)
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
      <Box sx={{ marginTop:'5vh'}}>
        <Box sx={{fontSize:'25px'}}>
          Cart Items
        </Box>
        {
          (!cartData || Object.keys(cartData).length < 3) ?
          <Box style={styles.shadowBox}>
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
                          </Box>
                          
                            { cartData[item].extras.flavourType == 'normal' ? null : 
                              <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'14px', borderRadius:'5px', width:'fit-content'}}>
                                Smoked & Turmeric
                              </Box>
                            }
                                            
                        </Box> : null
                      }

                      <Box sx={{display:'flex', justifyContent:'space-between', padding:'5px 10px'}}>
                        <Box sx={{display:'flex', fontSize:'13px',}}>
                          <Box mr={2} sx={{minWidth:'50px'}}>
                            {cartData[item].qty}
                          </Box>
                          <Box>
                          x {cartData[item].count}
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
                  ₹ 35
                </Box>
              </Box>
            </Box>
            <Box sx={{padding:'0px 15px 10px 15px'}}>
              <Box sx={{borderTop:'1px solid #b1b1b1',display:'flex', paddingTop:'20px', justifyContent:'space-between', alignItems:'center'}}>
                <Box>
                  Total Amount
                </Box>
                <Box sx={{fontWeight:'bold'}}>
                  ₹ {cartData.totalAmount + 35} 
                </Box>
              </Box>
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