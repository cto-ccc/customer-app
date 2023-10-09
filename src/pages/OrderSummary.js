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
      deliverySlot   : location.state.delSlotId,
      totalDiscount  : location.state.totalDiscount,
      storeDetails   : location.state.storeDetails,
      instructions   : location.state.instructions,
      deliveryType   : location.state.delType,
      shippingCost   : getDeliveryCharge(location.state.delType)
    } 

    if (location.state.itemDetails?.bogoDiscount) {
      orderData.couponCode           = 'BOGO'
      orderData.couponDiscountAmount = location.state.itemDetails.bogoDiscount
      orderData.couponDiscountType   = 'discount_coupon'
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
    delete ordersObj.bogoDiscount
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
      <Box sx={{fontSize:'25px', marginBottom:'10px', color:'#404040', fontFamily:'Foregen'}}>
        Order Summary
      </Box>

      <Box sx={{fontSize:'14px', fontWeight:'400', marginBottom:'10px'}}>
        Your order will be delivered from {location.state.storeDetails.storeName} store
      </Box>
      <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d', mt:3}}>
        ITEM DETAILS
      </Box>
      <ItemsSummary itemDetails={location.state.itemDetails} />

        <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d', mt:3}}>
          DELIVERING TO
        </Box>
        <Box sx={{padding:'15px', color:'#404040', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
          <Box>

            <Box sx={{marginBottom:'5px', fontWeight:'bold'}}>
              {location.state.addressDetails.userName}
            </Box>
            <Box SX={{fontSize:'15px'}}>
              {location.state.addressDetails.houseDetails}, {location.state.addressDetails.streetDetails},
              {location.state.addressDetails.landmark}, {location.state.addressDetails.pincode}
            </Box>

          </Box>
        </Box>  

        <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d', mt:3}}>
          DELIVERY SLOT
        </Box>
        <Box sx={{padding:'15px', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px', color:'#404040'}}>
          {location.state.delDate}, {location.state.delSlotTime}

          <Box>
          {
              location.state.instructions ? 
              <>
                <Box sx={{marginBottom:'5px', marginTop:'5px'}}>
                  {location.state.instructions}
                </Box>
              </> : null
            }
          </Box>
        </Box>

        <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d', mt:3}}>
          BILL DETAILS
        </Box>
        <Box sx={{padding:'15px', mb:4, background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}> 
          <Box sx={{display:'flex', justifyContent:'space-between', color:'#404040'}}>
            <Box>
              Item Total 
            </Box>
            <Box>
              ₹ {Number(location.state.itemDetails.totalAmount) +  Number(location.state.itemDetails.totalDiscount) + Number(location.state.itemDetails.bogoDiscount)}
            </Box>
          </Box>

          {
            location.state.itemDetails?.bogoDiscount ? 
              <Box sx={{display:'flex', justifyContent:'space-between', padding:'5px 0', color:'#404040'}}>
                <Box>
                  BOGO Discount
                </Box>
                <Box sx={{color:'#a4243d'}}>
                  -₹{location.state.itemDetails.bogoDiscount}
                </Box>
              </Box> : null
          }

          {
            location.state.itemDetails?.totalDiscount ? 
              <Box sx={{display:'flex', justifyContent:'space-between', padding:'5px 0', color:'#404040'}}>
                <Box>
                  Discount on MRP
                </Box>
                <Box sx={{color:'#a4243d'}}>
                  -₹{location.state.itemDetails.totalDiscount}
                </Box>
              </Box> : null
          }
          
          <Box sx={{display:'flex', justifyContent:'space-between', padding:'5px 0', color:'#404040'}}>
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

          <Box sx={{display:'flex', justifyContent:'space-between',  borderTop:'1px solid #eaeaea', padding:'5px 0'}}>
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
