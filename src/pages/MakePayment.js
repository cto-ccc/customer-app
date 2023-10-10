import React, { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getFirebaseError } from '../services/error-codes';
import { createNewOrder, getDeliveryCharge, getTimeSlots, logAction } from '../services/api';
// import { Checkout } from 'capacitor-razorpay';
import PaymentFailed from '../assets/payment-failed.png'
import { Capacitor } from '@capacitor/core';
import CashfreePaymentBridge from '../components/CashfreePaymentBridge';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import Loading from '../assets/loading.gif'


const styles = {
  paymentLogo : {
    width:'200px'
  }
}

function MakePayment() {

  const location = useLocation()
  
  const { showLoader, hideLoader, showAlert, showSnackbar, isDesktop, couponCacheData } = useContext(CommonContext)
  const { getUserId, getCustomerId } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [checkPayment, setCheckPayment] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    logAction('PAGE_VIEW', 'make-payment')
    initiatePaymentWithCashFree()
  }, [])

  async function getOrderData() {
    let orderData = {
      userId         : await getUserId(),
      timeStamp      : Date.now(),
      status         : 'pending',
      addressDetails : location.state.addressDetails,
      totalCount     : location.state.itemDetails.totalCount,
      totalAmount    : location.state.itemDetails.totalAmount,
      storeDetails   : location.state.storeDetails,
      paymentMode    : location.state.paymentMode,
      deliveryType   : location.state.delType,
      totalDiscount  : location.state.totalDiscount,
      customerId     : await getCustomerId(),
      deliveryDate   : location.state.delDate,
      deliverySlot   : location.state.delSlotId,
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
    return orderData
  }

  async function initiatePaymentWithCashFree() {

    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/createCashFreeOrder`, {
      "method"  : "POST",
      "headers" : {
        "content-type"  : "application/json",
        "accept"        : "application/json"
      },
      "body": JSON.stringify({
        amount       : location.state.itemDetails.totalAmount + getDeliveryCharge(location.state.delType),
        mobileNo     : await getUserId(),
        customerId   : await getCustomerId(),
        platform     : Capacitor.getPlatform(),
        orderDetails : await getOrderData(),
        version      : process.env.REACT_APP_VERSION
      })
    }).then((response) => response.json())
      .then(function(data) { 
        
        const unsub = onSnapshot(doc(db, "transactions", data.order_id), (doc) => {
            const txnData = doc.data()
            
            if (txnData?.status == 'PAYMENT_SUCCESS') {
              hideLoader()
              navigate('/orderStatus', {state:{orderId : txnData.pranaOrderId, orderData : JSON.parse(txnData.orderData)}, replace:true})
            } else if (txnData?.status == 'PAYMENT_FAILED') {
              setLoading(false)
            }
        })
   
        const success = (data) => {
          //Not handling here
          // placeOrder(data.transaction.transactionId)
          setCheckPayment(true)
        }

        const failure = (data) => {
          setLoading(false)
        }

        const dropConfig = {
          "components": [
              "order-details",
              "upi",
              "card",
              "app",
              "netbanking",
              "paylater"
          ],
          "onSuccess": success,
          "onFailure": failure,
          "style": {
              "backgroundColor" : "#ffffff",
              "color"           : "#a4243d",
              "fontFamily"      : "Lato",
              "fontSize"        : "14px",
              "errorColor"      : "#ff0000",
              "theme"           : "light", 
          }
        }

        if (Capacitor.getPlatform() == 'web') {

          const cashfree = new window.Cashfree(data.payment_session_id)
          cashfree.drop(document.getElementById("payment-form"), dropConfig)
        } else {

          initiatePaymentThroughBridge({paymentSessionId : data.payment_session_id, orderId : data.order_id})
        }
    })
    .catch((error) => console.log(error))
  }

  const initiatePaymentThroughBridge = async(data) => {
    
    const resp = await CashfreePaymentBridge.initiatePayment(data)

    if (resp.status == 'SUCCESS') {

      const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/getCashfreePaymentId`, {
        "method"  : "POST",
        "headers" : {
          "content-type"  : "application/json",
          "accept"        : "application/json"
        },
        "body": JSON.stringify({
          orderId : data.orderId
        })
      }).then((response) => response.json())
      .then(function(data) { 
        //Not handling here
        // placeOrder(data[0].cf_payment_id)
        setCheckPayment(true)
      }).catch((error) => 
        console.log("Error in processing payment")
      )
    } else {
      setLoading(false)
    }
  }

  return (
    <Box sx={{minHeight:'80vh', marginTop:'10vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {
        loading ?
        <Box>
          {
            checkPayment ? 
            <Box sx={{padding:'4vw', fontSize:'23px', display:'flex', flexDirection:'column'}}>
              <Box sx={{textAlign:'center'}}>
                <img src={Loading} />
              </Box>
              Checking payment status... Please wait. Do not refresh or close the page
            </Box> :
            <>
              <Box sx={{padding:'4vw', fontSize:'25px', display:'flex', flexDirection:'column', zIndex:1, position:'fixed'}}>
                <Box sx={{textAlign:'center'}}>
                  <img src={Loading} />
                </Box>
                Initiating payment... Please wait.
              </Box>
              <Box sx={{zIndex:2, position:'relative'}}>
               <div id="payment-form" className={isDesktop ? 'gateway-cont-desk' : 'gateway-cont-mob' }></div>
              </Box>
            </>
          }
        </Box> : 
        <Box sx={{textAlign:'center'}}>
          <Box sx={{mb:2}}>
            <img src={PaymentFailed} style={styles.paymentLogo}/>
          </Box>
          <h2>
            Payment Failed
          </h2>
          {/* TODO remove navigate */}
          <Button variant='contained' onClick={() => navigate(-2)}>
            Go to home
          </Button>
        </Box>
      }
    </Box>
  )
}

export default MakePayment
