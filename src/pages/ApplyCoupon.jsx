import React, {useEffect} from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useForm } from "react-hook-form";
import { getCoupons, getUserProductOrders, getUserProfileData } from '../services/api';
import { useState, useContext } from 'react';
import ComponentLoader from '../components/ComponentLoader';
import { CommonContext } from '../contexts/CommonContext';
import NavHeader from '../components/NavHeader';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'

function ApplyCoupon() {

  const { register : registerCoupon, handleSubmit : submitCoupon, reset : resetCoupon, formState : {errors:errorsCoupon} } = useForm()
  const [loading, setLoading] = useState(true)
  const [coupons, setCoupons] = useState([])
  const { showLoader, cartData, addCouponToCart, showAlert, hideLoader, hideAlert, showSnackbar } = useContext(CommonContext)
  const { isUserLoggedIn, getUserId, getCustomerId } = useContext(AuthContext)
  const navigate = useNavigate()

  const verifyCoupon = async(couponData) => {
    // showLoader()
    let userCoupon = false
    coupons.map((coupon) => {
      if (coupon.couponCode == couponData.couponCode) userCoupon =  coupon 
    })

    if (couponData.couponCode == 'HEALTHYEATS') {
      if (cartData['C090']) {
        const resp = await checkCouponEligibility(couponData.couponCode)
        if (resp) {
          userCoupon = {
            discount_type   : 'flat',
            couponReduction : 200,
            couponCode      : 'HEALTHYEATS'
          }
        } else {
          return
        }
      } else {
        showAlert('Coupon not applicable for items in the cart')
        return
      }
    }

    if (couponData.couponCode == 'HEALTHYEGGS') {
      if (cartData['C091']) {
        const resp = true
        if (resp) {
          userCoupon = {
            discount_type   : 'flat',
            couponReduction : 150,
            couponCode      : 'HEALTHYEGGS'
          }
        } else {
          return
        }
      } else {
        showAlert('Coupon not applicable for items in the cart')
        return
      }
    }

    if (userCoupon) {

      let couponReduction = 0

      if (userCoupon.discount_type == 'percentage') {
        couponReduction = Math.trunc((cartData.totalAmount / 100) * userCoupon.discount) 
        couponReduction = (couponReduction > userCoupon.maxDiscount) ?  userCoupon.maxDiscount : couponReduction
      } else {
        couponReduction = userCoupon.couponReduction
      }

      const addedCoupon = {
        couponCode  : userCoupon.couponCode,
        couponValue : couponReduction
      }
   
      await addCouponToCart(addedCoupon)
      setTimeout(() => {
        window.history.back()
      },[2000])

      showAlert("Coupon Applied Successfully")
      
    } else {
      showAlert("Invalid coupon code. Please enter a valid one")
    }
    hideLoader()
  } 

  const checkCouponEligibility = (couponCode) => {
    return new Promise(async(resolve, reject) => {
      showLoader()
      if (await isUserLoggedIn()) {

        getUserProfileData(await getUserId()).then(async(response) => {
          if (response?.timeStamp) {
            const orders = await getUserOrders()
            
            if (orders) {
              if ((couponCode == 'HEALTHYEATS' && cartData['C090'])
                  || (couponCode == 'HEALTHYEGGS' && cartData['C091'])) 
              { 
                resolve(true)
              } else {
                showAlert("Coupon not applicable for items in your cart")
              }
            }
            hideLoader()
          } else {
            showAlert("Coupon valid for only new users")
            hideLoader()
            resolve(false)
          }
        }).catch((error) => {
          hideLoader()
          resolve(false)
        })
      } else {
        hideLoader()      
        showAlert(<>
          Please signup / login to use this coupon 
          <Button variant='contained' sx={{marginTop:'10px'}}
            onClick={() => navToAuth()}> Login / Signup </Button> 
          </>)
        resolve(false)
      }
    })
  }

  const getUserOrders = async() => {

    const userData = {
      customerId : await getCustomerId()
    }

    return new Promise(async(resolve, reject) => {
      getUserProductOrders(userData).then((response) => {
        if (response.length) {
          showAlert('Invalid Coupon. This coupon is valid only on first order')
          resolve(false) 
        } else {
          resolve(true)
        }
      }).catch((error) => {
        resolve(false)
      })
    })
 
  }  

  const getUserCoupons = async() => {
    //TODO
    const params = {
      customerId : '0'
    }
    let resp = await getCoupons(params)
    if (cartData['C090']) {
      resp.coupons.push({
        couponCode  : 'HEALTHYEATS',
        couponValue : 200,
        couponTitle : 'HEALTHYEATS'
      })
    } else if (cartData['C091']) {
      resp.coupons.push({
        couponCode  : 'HEALTHYEGGS',
        couponValue : 150,
        couponTitle : 'HEALTHYEGGS'
      })
    }
    setCoupons(resp.coupons)
    setLoading(false)
  }

  const navToAuth = async() => {
    if (await isUserLoggedIn()) {
      hideAlert()
      showSnackbar("Login successfull, continue to order")
    } else {
      hideAlert()
      navigate('/auth')
    }
  }

  useEffect(() => {
    getUserCoupons()
  }, [])

  return (
    <Box sx={{padding:'4vw'}}>
      <NavHeader />
      {
        loading ? 
        <ComponentLoader /> :
        <Box sx={{maxWidth:'600px', marginTop:'7vh'}}>
          <form onSubmit={submitCoupon(verifyCoupon)}>
            <h3>Apply Coupon</h3>
            <Box mb={3}>
              <TextField
                placeholder="Enter coupon code"
                label="Coupon Code"
                variant="outlined"
                fullWidth
                type="text"
                autoComplete='off'
                name="couponCode"
                {...registerCoupon("couponCode", {
                  required: "Required field"})}
                error={Boolean(errorsCoupon?.couponCode)}
                helperText={errorsCoupon?.couponCode?.message}
              />
              <Button type="submit" variant="contained" color="primary" 
                sx={{marginTop:'15px'}}>
                Check Coupon
              </Button>
            </Box>
            <h3>Available Coupons</h3>
            <Box>
              {
                coupons.length ?
                coupons.map((coupon) => {
                  if (!coupon.hideCoupon)
                  return (
                    <Box key={coupon.iD} sx={{
                          border:'1px solid #8f8f8f', borderRadius:'10px', padding:'20px', display:'flex', 
                          marginBottom:'10px',
                          justifyContent:'space-between', alignItems:'center'}}>
                      <Box sx={{width:'60%'}}>
                        {coupon.couponTitle}
                      </Box>
                      <Box sx={{width:'30%', textAlign:'right'}}>
                        <Button variant='contained' onClick={() => verifyCoupon({couponCode : coupon.couponCode})}>Apply</Button>
                      </Box>
                    </Box>
                  ) 
                }) : 
                <Box>
                  No Coupons Found
                </Box>
              }
            </Box>
          </form>
        </Box>
      }
      </Box>
  )
}

export default ApplyCoupon