import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { createNewOrder } from '../services/api';
import { CommonContext } from '../contexts/CommonContext';
import { getFirebaseError } from '../services/error-codes';
import ComponentLoader from '../components/ComponentLoader';

const styles = {
  cartCont : {
    display : 'flex',
    padding:'20px',
    alignItems:'center'
  },
  cartImg : {
    width : '100px',
    height : '100px',
    borderRadius:'20px'
  },
  shadowBox : {
    background : 'white',
    // borderRadius : '13px',
    boxShadow : '0px 0px 10px 0px #eaeaea'
  }
}

function OrderSummary() {

  const navigate = useNavigate()
  const location = useLocation()
  const { getUserId, getCustomerId } = useContext(AuthContext)
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const [loading, setLoading] = useState(true)

  const [timeSlots, setTimeSlots] = useState([
    {
      id : 7,
      time : '7:30 AM - 8:30AM'
    },
    {
      id : 8,
      time : '8:30 AM - 9:30AM'
    },
    {
      id : 9,
      time : '9:30 AM - 10:30AM'
    },
    {
      id : 17,
      time : '5:30 PM - 6:30PM'
    },
    {
      id : 18,
      time : '6:30 PM - 7:30PM'
    },
    {
      id : 19,
      time : '7:30 PM - 8:30PM'
    },
    {
      id : 20,
      time : '8:30 PM - 9:30PM'
    }
  ])

  useEffect(() => {
    console.log("===", location.state)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const placeOrder = async() => {

    let orderData = {
      userId         : await getUserId(),
      timeStamp      : Date.now(),
      status         : 'pending',
      addressDetails : location.state.addressDetails,
      totalCount     : location.state.itemDetails.totalCount,
      totalAmount    : location.state.itemDetails.totalAmount,
      paymentMode    : location.state.paymentMode,
      customerId     : await getCustomerId(),
      deliveryDate   : location.state.delDate,
      deliverySlot   : location.state.delSlotId
    } 

    let ordersObj = JSON.parse(JSON.stringify(location.state.itemDetails))
    delete ordersObj.totalAmount
    delete ordersObj.totalCount
    orderData.orderTitle  = ordersObj[Object.keys(ordersObj)[0]].name

    orderData.itemDetails = Object.values(ordersObj)
    showLoader()
    createNewOrder(orderData).then((response) => {
      navigate('/orderStatus', {state:response, replace:true})
      hideLoader()
    }).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error.errorCode))
    })  
  }

  return (
    <Box sx={{padding:'4vw', maxWidth:'500px', marginTop:'5vh'}}>
      {
        loading ? 
        <ComponentLoader /> : 
        <Box>
      <Box sx={{fontSize:'20px', fontWeight:'700', marginBottom:'10px'}}>
        Order Summary
      </Box>

      <Box sx={{margin:'20px 0 10px 5px', fontSize:'18px',color:'#a4243d', marginTop:'20px'}}>
        Item Details
      </Box>
      <Box style={styles.shadowBox}> 
      {
          Object.keys(location.state.itemDetails).map((item, index) => {
            return <Box key={index} >{
              item == 'totalCount' || item == 'totalAmount' ? 
              null : 
              <Box key={index} style={styles.cartCont} 
                sx={{borderBottom: index != (Object.keys(location.state.itemDetails).length - 3) ? '1px solid #eaeaea' :  null}}>
                <Box sx={{width:'70%'}}>
                  {location.state.itemDetails[item].name} ({location.state.itemDetails[item].qty})
                  {
                    location.state.itemDetails[item].extras ? 
                    <Box sx={{display:'flex', flexDirection:'column'}}>
                      <li> 
                        {location.state.itemDetails[item].extras.skinType}
                      </li>
                      <li> 
                        {location.state.itemDetails[item].extras.flavourType} Flavour
                      </li>
                      <li> 
                        {location.state.itemDetails[item].extras.cutType} Cut
                      </li>
                    </Box> : null
                  }
                </Box>
                
                <Box sx={{width:'10%'}}>
                  x {location.state.itemDetails[item].count}
                </Box>
                <Box sx={{width:'20%', textAlign:'center'}}>
                  ₹ {location.state.itemDetails[item].price * location.state.itemDetails[item].count}
                </Box>
              </Box>
            }
            </Box>
          })
        }
        </Box>

        <Box sx={{margin:'30px 0 10px 5px', fontSize:'18px', color:'#a4243d'}}>
          Delivery Details
        </Box>
        <Box style={styles.shadowBox}>
          <Box sx={{padding:'15px', marginBottom:'25px'}}>

            <Box sx={{ marginBottom:'5px', display:'flex'}}>
              <Box sx={{width:'50px', fontSize:'18px',}}>
                Date 
              </Box>
              <Box>
                : {location.state.delDate}
              </Box>
            </Box>
            <Box sx={{ display:'flex'}}>
              <Box sx={{width:'50px', fontSize:'18px',}}>
                Slot 
              </Box>
              <Box>
                : {timeSlots.filter((slot) => slot.id == location.state.delSlotId)[0].time}
              </Box>
            </Box>

            <Box sx={{marginTop:'18px', fontSize:'18px'}}>
              Address :
            </Box>
            <Box sx={{marginBottom:'5px', marginTop:'5px'}}>
              {location.state.addressDetails.userName}
            </Box>
            <Box>
              {location.state.addressDetails.houseDetails}, {location.state.addressDetails.streetDetails}
            </Box>
            <Box>
              {location.state.addressDetails.landmark}
            </Box>
            <Box>
              {location.state.addressDetails.pincode}
            </Box>   
          </Box>
        </Box>  

        <Box sx={{margin:'30px 0 10px 5px', fontSize:'18px',color:'#a4243d'}}>
          Bill Details
        </Box>
        <Box style={styles.shadowBox} sx={{marginBottom:'40px'}}> 
          <Box sx={{display:'flex', justifyContent:'space-between', padding:'15px 15px'}}>
            <Box>
              Item Total 
            </Box>
            <Box>
              ₹ {location.state.itemDetails.totalAmount}
            </Box>
          </Box>
          
          <Box sx={{display:'flex', justifyContent:'space-between', padding:'0px 15px 15px 15px'}}>
            <Box>
              Delivery Fee 
            </Box>
            <Box>
              ₹ 35
            </Box>
          </Box>
          
          <Box sx={{display:'flex', justifyContent:'space-between', padding:'15px 15px', borderTop:'1px solid #eaeaea'}}>
            <Box>
              To Pay
            </Box>
            <Box sx={{fontWeight:'bold'}}>
              ₹ {location.state.itemDetails.totalAmount + 35}
            </Box>
          </Box>
        </Box> 

        {
          location.state.paymentMode === 'online' ? 
          <Button fullWidth onClick={() => navigate(`/makePayment`, {state : location.state, replace:true})} variant="contained">
            Make Payment 
          </Button> : 
          <Button fullWidth onClick={() => placeOrder()} variant="contained">
            Place Order 
          </Button>
        }
        
      </Box>

      }
        
    </Box>
  )
}

export default OrderSummary
