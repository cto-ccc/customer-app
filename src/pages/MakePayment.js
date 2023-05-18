import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getFirebaseError } from '../services/error-codes';
import { createNewOrder, getDeliveryCharge, getTimeSlots } from '../services/api';
import { Checkout } from 'capacitor-razorpay';
import PaymentFailed from '../assets/payment-failed.png'

const styles = {
  paymentLogo : {
    width:'200px'
  }
}

function MakePayment() {

  const location = useLocation()
  
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { getUserId, getCustomerId } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    initiatePayment()
  }, [])


  const payWithRazorpay = async(orderId) => {
    const options = {
      key         : `${process.env.REACT_APP_RAZORPAY_KEY}`,
      amount      : location.state.itemDetails.totalAmount,
      description : 'Buy Fresh Chicken Online',
      image       : 'https://countrychickenco.in/download/logo/icon.png',
      order_id    : orderId,
      currency    : 'INR',
      name        : 'Country Chicken Co',
      prefill: {
        contact   : location.state.addressDetails.userId
      },
      theme: {
        color     : '#a4243d'
      }
    }
    try {
      let data = (await Checkout.open(options))
      placeOrder(data.response.razorpay_payment_id)
      //Handle payment success
      console.log("Payment success", data)
    } catch (error) {
      //Handle payment failure
      console.log("Payment failed : ", error)
      setLoading(false)
    }
  }

  const placeOrder = async(txnId) => {

    let orderData = {
      userId         : await getUserId(),
      timeStamp      : Date.now(),
      status         : 'pending',
      addressDetails : location.state.addressDetails,
      totalCount     : location.state.itemDetails.totalCount,
      totalAmount    : location.state.itemDetails.totalAmount,
      paymentMode    : location.state.paymentMode,
      customerId     : await getCustomerId(),
      txnId          : txnId,
      deliveryDate   : location.state.delDate,
      deliverySlot   : getTimeSlots().filter((slot) => slot.id == location.state.delSlotId)[0].pranaId
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

  async function initiatePayment() {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/createRazorpayOrder`, {
      "method"  : "POST",
      "headers" : {
        "content-type"  : "application/json",
        "accept"        : "application/json"
      },
      "body": JSON.stringify({
        amount   : location.state.itemDetails.totalAmount + getDeliveryCharge(),
        currency : "INR",
        receipt  : "Country Chicken Co Payment"
      })
    }).then((response) => response.json())
    .then(function(data) { 
      payWithRazorpay(data.id)
    })
    .catch((error) => console.log(error))
  }

  return (
    <Box sx={{minHeight:'80vh', marginTop:'10vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {
        loading ?
        <Box>
          Loading... Please Wait
        </Box> : 
        <Box sx={{textAlign:'center'}}>
          <Box sx={{mb:2}}>
            <img src={PaymentFailed} style={styles.paymentLogo}/>
          </Box>
          <h2>
            Payment Failed
          </h2>
          <Button variant='contained' onClick={() => navigate(-2)}>
            Go to home
          </Button>
        </Box>
      }
    </Box>
  )
}

export default MakePayment
