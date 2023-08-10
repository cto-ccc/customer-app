import React, {useEffect} from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useForm } from "react-hook-form";
import { getCoupons } from '../services/api';
import { useState, useContext } from 'react';
import ComponentLoader from '../components/ComponentLoader';
import { CommonContext } from '../contexts/CommonContext';
import NavHeader from '../components/NavHeader';

function ApplyCoupon() {

  const { register : registerCoupon, handleSubmit : submitCoupon, reset : resetCoupon, formState : {errors:errorsCoupon} } = useForm()
  const [loading, setLoading] = useState(true)
  const [coupons, setCoupons] = useState([])
  const { showLoader, cartData, addCouponToCart, showAlert, hideLoader } = useContext(CommonContext)


  const verifyCoupon = async(couponData) => {
    // showLoader()
    let userCoupon = false
    coupons.map((coupon) => {
      userCoupon = coupon.couponCode == couponData.couponCode ? coupon : false
    })

    if (userCoupon) {

      let couponReduction = 0

      if (userCoupon.discount_type == 'percentage') {
        couponReduction = Math.trunc((cartData.totalAmount / 100) * userCoupon.discount) 
        couponReduction = (couponReduction > userCoupon.maxDiscount) ?  userCoupon.maxDiscount : couponReduction
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

  const getUserCoupons = async() => {
    //TODO
    const params = {
      customerId : '0'
    }
    const resp = await getCoupons(params)
    setCoupons(resp.coupons)
    setLoading(false)
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
                  return (
                    <Box key={coupon.iD} sx={{
                          border:'1px solid #8f8f8f', borderRadius:'10px', padding:'20px', display:'flex', 
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