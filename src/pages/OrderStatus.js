import ChickenWalking from '../assets/chickenwalking.gif'
import OrderSuccess from '../assets/ordersuccess.gif'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonContext } from '../contexts/CommonContext';
import { LocalNotifications } from '@capacitor/local-notifications';
import ItemsSummary from '../components/ItemsSummary';
import { deleteCartDataFromFb } from '../services/api';
import { Capacitor } from '@capacitor/core';

const styles = {
  loadImg : {
    width:'350px',
    height:'350px',
    alignSelf:'center',
    marginTop:'10vh'
  },
  successImg : {
    width:'200px',
    height:'200px'
  },
  shadowBox : {
    background : '#FFF0D9',
    borderRadius : '13px',
    boxShadow : '0px 0px 10px 0px #eaeaea',
    width:'80vw',
    maxWidth:'500px',
    padding:'20px'
  }
}

function OrderStatus() {

  const [showLoading, setShowLoading] = useState(true)
  const { clearCart } = useContext(CommonContext)

  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    clearCart()
    deleteCartDataFromFb(location.state.orderData.userId)
    setTimeout(() => {
      LocalNotifications.schedule({notifications : [{
        title : 'CountryChickenCo',
        body : 'Your order has been placed successfully !',
        id : location.state.orderId
      }]})
      setShowLoading(false)
    }, 3000)
  }, [])

  const goHome = async() => {
    window.history.replaceState(null, null, "/")
    navigate('/')
  }

  const goToProfile = async() => {
    window.history.replaceState(null, null, "/profile")
    navigate('/profile')
  }

  return (
    <Box sx={{padding:'0 4vw', display:'flex', justifyContent:'center'}}>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        {
          showLoading ? 
          <Box>
            <img src={ChickenWalking} style={styles.loadImg}/>
            <Box sx={{textAlign:'center', mb:4, fontSize:'20px'}}>
              Confirming order.. Please wait
            </Box>
          </Box>
           : 
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'14vh'}}>
            <img src={OrderSuccess} style={styles.successImg} />
            <Box sx={{fontSize:'35px', fontFamily:'Foregen',color:'#a4243d', textAlign:'center'}}>
              Order Placed Successfully
            </Box>
            <Box style={styles.shadowBox} sx={{margin:'20px 0', fontSize:'19px'}}>

              <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{width:'40%', marginBottom:'5px'}}>
                  Order ID
                </Box>
                <Box sx={{color:'#a4243d'}}>
                  {location.state.orderId}
                </Box>
              </Box>

              <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{width:'40%', marginBottom:'5px'}}>
                  Status
                </Box>
                <Box>
                  Pending
                </Box>
              </Box>

              <Box sx={{margin:'10px 0'}}>
                <ItemsSummary  itemDetails={location.state.orderData.itemDetails} />
              </Box>

   
              <Button variant='outlined'
                onClick={() => goToProfile()}>
                View All Orders
              </Button>
            </Box>
            <Button variant='contained' onClick={() => goHome()} sx={{mb:4}}>
                Go to Home Page
            </Button>
          </Box>
         
        }
      </Box>


    </Box>
  )
}

export default OrderStatus