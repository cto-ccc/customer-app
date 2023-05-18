import ChickenWalking from '../assets/chickenwalking.gif'
import OrderSuccess from '../assets/ordersuccess.gif'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonContext } from '../contexts/CommonContext';
import { LocalNotifications } from '@capacitor/local-notifications';
import ItemsSummary from '../components/ItemsSummary';

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
    background : 'white',
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
    console.log("===========", location.state)
    clearCart()
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
    navigate(-3)
  }

  return (
    <Box sx={{background:'white', height:'100vh', padding:'0 4vw', display:'flex', justifyContent:'center'}}>
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        {
          showLoading ? 
          <Box>
            <img src={ChickenWalking} style={styles.loadImg}/>
            <Box sx={{textAlign:'center'}}>
              Confirming order.. Please wait
            </Box>
          </Box>
           : 
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <img src={OrderSuccess} style={styles.successImg} />
            <Box sx={{fontSize:'35px', fontWeight:'bold', textAlign:'center'}}>
              Order Placed Successfully
            </Box>
            <Box style={styles.shadowBox} sx={{margin:'20px 0', fontSize:'19px'}}>

              <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{width:'40%', marginBottom:'5px'}}>
                  Order ID
                </Box>
                <Box>
                  {location.state.orderId.orderId}
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
                onClick={() => navigate('/profile')}>
                View All Orders
              </Button>
            </Box>
            <Button variant='contained' onClick={() => goHome()}>
                Go to Home Page
            </Button>
          </Box>
         
        }
      </Box>


    </Box>
  )
}

export default OrderStatus