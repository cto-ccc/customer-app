import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { createNewOrder, getDeliveryCharge, getTimeSlots } from '../services/api';
import { CommonContext } from '../contexts/CommonContext';
import { getFirebaseError } from '../services/error-codes';
import ComponentLoader from '../components/ComponentLoader';
import ItemsSummary from '../components/ItemsSummary';
import NavHeader from '../components/NavHeader';

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
  const { showLoader, hideLoader, showAlert, showSnackbar, couponCacheData } = useContext(CommonContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const placeOrder = async() => {
    window.scrollTo(0,0)
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
      deliverySlot   : getTimeSlots().filter((slot) => slot.id == location.state.delSlotId)[0].pranaId,
      totalDiscount  : location.state.totalDiscount,
      storeDetails   : location.state.storeDetails,
      instructions   : location.state.instructions,
      deliveryType   : location.state.delType,
      shippingCost   : getDeliveryCharge(location.state.delType)
    } 

    if (couponCacheData?.couponCode) {
      orderData.couponCode           = couponCacheData.couponCode
      orderData.couponDiscountAmount = couponCacheData.couponValue
      orderData.couponDiscountType   = 'discount_coupon'
    }
        
    let ordersObj = JSON.parse(JSON.stringify(location.state.itemDetails))
    delete ordersObj.totalAmount
    delete ordersObj.totalCount
    delete ordersObj.totalDiscount
    orderData.orderTitle  = ordersObj[Object.keys(ordersObj)[0]].name

    orderData.itemDetails = Object.values(ordersObj)
    showLoader()
    createNewOrder(orderData).then((response) => {
      navigate('/orderStatus', {state:{orderId : response, orderData : orderData}, replace:true})
      hideLoader()
    }).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error.errorCode))
    })  
  }

  return (
    <Box sx={{padding:'4vw', maxWidth:'600px', marginTop:'7vh'}}>
      {
        loading ? 
        <ComponentLoader /> : 
        <Box>
      <NavHeader />
      <Box sx={{fontSize:'20px', fontWeight:'700', marginBottom:'10px'}}>
        Order Summary
      </Box>

      <Box sx={{fontSize:'14px', fontWeight:'400', marginBottom:'10px'}}>
        Your order will be delivered from {location.state.storeDetails.storeName} store
      </Box>

      <Box sx={{margin:'20px 0 10px 5px', fontSize:'18px',color:'#a4243d', marginTop:'20px'}}>
        Item Details
      </Box>
      <ItemsSummary itemDetails={location.state.itemDetails} />

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
                : {getTimeSlots().filter((slot) => slot.id == location.state.delSlotId)[0].time}
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

            <Box sx={{marginTop:'18px', fontSize:'18px'}}>
              Instructions :
            </Box>
            <Box sx={{marginBottom:'5px', marginTop:'5px'}}>
              {location.state.instructions}
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
              ₹ {getDeliveryCharge(location.state.delType)} 
            </Box>
          </Box>
          
          {
            couponCacheData && couponCacheData.couponCode ?
            <Box sx={{padding:'5px 15px'}}>
              <Box sx={{borderTop:'1px solid #ebebeb',display:'flex', padding:'10px 0', justifyContent:'space-between', alignItems:'center', fontSize:'13px'}}>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  Coupon Discount [ {couponCacheData.couponCode} ]
                </Box>
                <Box>
                - ₹ {couponCacheData.couponValue}
                </Box>
              </Box>
            </Box> : null
          }

          <Box sx={{display:'flex', justifyContent:'space-between', padding:'15px 15px', borderTop:'1px solid #eaeaea'}}>
            <Box>
              To Pay
            </Box>
            <Box sx={{fontWeight:'bold'}}>
              ₹ {location.state.itemDetails.totalAmount 
                + (getDeliveryCharge(location.state.delType))
                - (couponCacheData?.couponValue || 0)}
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
