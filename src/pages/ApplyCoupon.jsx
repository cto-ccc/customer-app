import React from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useForm } from "react-hook-form";

function ApplyCoupon() {

  const { register : registerCoupon, handleSubmit : submitCoupon, reset : resetCoupon, formState : {errors:errorsCoupon} } = useForm()

  const verifyCoupon = (couponData) => {
    console.log("=======", couponData)
  }

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