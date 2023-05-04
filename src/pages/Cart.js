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
    marginTop:'10px'
  }
}

function Cart() {

  const navigate = useNavigate()

  const { updateCart, getCartData, clearCart, isDesktop } = useContext(CommonContext)
  const { isUserLoggedIn } = useContext(AuthContext)
  const [cartData, setCartData] = useState({})
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchCartData()
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

  const fetchCartData = async() => {
    setCartData(await getCartData())
  }


  return (
    <motion.div
    initial={{opacity:0}} 
    animate={{opacity:1}}>
    <Box sx={{padding:'4vw', maxWidth:'500px'}}>
    {
      loading ? <ComponentLoader /> : 
      <Box sx={{maxWidth:'500px', marginTop:'5vh'}}>
        <Box sx={{fontSize:'25px'}}>
          Cart Items
        </Box>
        {
          (!cartData || Object.keys(cartData).length < 3) ?
          <Box style={styles.shadowBox}>
            No items in your cart
          </Box> : 
          <Box style={styles.shadowBox}>
          {
            Object.keys(cartData).map((item, index) => {
              return <Box key={index}>{
                item == 'totalCount' || item == 'totalAmount' ? 
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
                            {cartData[item].extras.skinType || null}
                          </Box>
                          <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'14px', borderRadius:'5px'}}>
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
                      <Box>
                       x {cartData[item].count}
                      </Box>
                      <Box>
                        ₹ {cartData[item].price * cartData[item].count}
                      </Box>
                    </Box>
                  </Box>

                </Box>
              }
              </Box>
            })
          }
          <Box sx={{padding:'20px 15px'}}>
            <Box sx={{borderTop:'1px solid #ebebeb',display:'flex', paddingTop:'20px', justifyContent:'space-between', alignItems:'center', fontSize:'13px'}}>
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
        </Box>
        }      
      </Box>
    }
    </Box>
    </motion.div>
  )
}

export default Cart
