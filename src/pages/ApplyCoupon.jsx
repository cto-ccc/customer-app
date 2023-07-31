import React, {useEffect} from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useForm } from "react-hook-form";
import { getCoupons } from '../services/api';

function ApplyCoupon() {

  const { register : registerCoupon, handleSubmit : submitCoupon, reset : resetCoupon, formState : {errors:errorsCoupon} } = useForm()

  const verifyCoupon = (couponData) => {
    console.log("=======", couponData)
  } 

  const getUserCoupons = async() => {
    const params = {
      customerId : '8179198780'
    }
    const resp = await getCoupons(params)
    console.log("==========", resp)
  }

  useEffect(() => {
    getUserCoupons()
  }, [])

  return (
    <Box sx={{padding:'4vw'}}>
      <form onSubmit={submitCoupon(verifyCoupon)}>
        <h3>Coupons</h3>
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
        </Box>
        <Button type="submit" variant="contained" color="primary" id='sign-in-button'>
          Check Coupon
        </Button>
      </form>
      </Box>
  )
}

export default ApplyCoupon