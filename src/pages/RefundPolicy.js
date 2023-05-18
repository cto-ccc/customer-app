import { Box, Card } from '@mui/material'
import React from 'react'

function RefundPolicy() {
  return (
    <Box sx={{padding:'4vw', maxWidth:'600px', marginTop:'5vh'}}>

    <h1>Cancellation /Refund Policy</h1>

      <Card sx={{padding:'10px'}}>
      We are using Razorpay (razorpay.com) to process payments in our website/app.
        <br /><br />
       As per the refund policy of Razorpay (https://razorpay.com/docs/payment-gateway/refunds/), if the contributor opts to avail refund, the amount will be reversed to the original payment method used in making the payment.
       <br /><br />
        For example, if a credit card was used to make the payment, the refund will be pushed to the same credit card. Razorpay does not charge any processing fee for refund. However, the transaction fee and GST levied by Razorpay at the time of payment capture will not be reversed to your account.
<br /><br />
Depending on the bank’s processing time, it can take 5-7 business days for the refunds to reflect in the customer’s bank account or card balance.
      </Card>
    </Box>
  )
}

export default RefundPolicy