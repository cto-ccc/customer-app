import { TextField, Button, Box, createMuiTheme, InputLabel, useTheme, FormControl, Paper, MenuItem } from '@mui/material'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import ComponentLoader from '../components/ComponentLoader';
import { useContext, useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getClientDetails, updateOrderStatus } from '../services/api';
import { CommonContext } from '../contexts/CommonContext';

const styles = {
  circleIcon : {
    borderRadius:'10px',
    padding:'8px',
    // background:'#a4243d',
    color:'#a4243d',
    border:'1px solid #a4243d'
  }
}

function OrderDetails() {

  const location = useLocation()
  const [loading, setLoading]         = useState(false)
  const [orderStatus, setOrderStatus] = useState(null)
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)


  useEffect(() => {
    console.log("==========>>>", location.state)

  }, [])  


  function callMe(number) {
    window.open(`tel:${number}`, '_self');
  }

  return (
    <Box sx={{padding:'4vw', marginTop:'5vh', maxWidth:'550px'}}>
      {
        loading ? <ComponentLoader /> :
        <Box>
          <Box mb={2} sx={{fontSize:'20px'}}>
          Order Details
        </Box>

        <Paper sx={{padding:'15px', marginBottom:'15px', marginTop:'10px'}}>

          <Box sx={{display:'flex', fontWeight:'bold'}} mb={1}>
            <Box sx={{width:'50%'}}>
              Item Name
            </Box>
            <Box sx={{width:'15%'}}>
              Price
            </Box>
            <Box sx={{width:'15%', textAlign:'center'}}>
              Qty
            </Box>
            <Box sx={{width:'20%'}}>
              Total
            </Box>
          </Box>

          {
            location.state.products.map((item, index) => {
              return <Box key={index} sx={{display:'flex'}} mb={1}>
                <Box sx={{width:'50%'}}>
                  {item.name}
                </Box>
                <Box sx={{width:'15%'}}>
                  {item.price}
                </Box>
                <Box sx={{width:'15%', textAlign:'center'}}>
                  {item.quantity}
                </Box>
                <Box sx={{width:'20%'}}>
                  {item.quantity * item.price}
                </Box>
              </Box>
            })
          }

          <Box sx={{display:'flex', fontWeight:'bold', borderTop:'1px solid #eaeaea'}} mt={2} pt={2}>
            <Box sx={{width:'50%'}}>
              Total
            </Box>
            <Box sx={{width:'15%'}}>

            </Box>
            <Box sx={{width:'15%', textAlign:'center'}}>
              {
                location.state.products.length
              }
            </Box>
            <Box sx={{width:'20%'}}>
              {
                location.state.order_amount
              }
            </Box>
          </Box>
        </Paper>   
        
        <Paper sx={{padding:'15px', fontSize:'17px'}}>
        <Box sx={{display:'flex', marginBottom:'5px'}}>
            <Box sx={{width:'40%'}}>
              Order Date
            </Box>
            <Box>
              : {location.state.order_date}
            </Box>
          </Box>
          <Box sx={{display:'flex', marginBottom:'10px'}}>
            <Box sx={{width:'40%'}}>
              Order Status
            </Box>
            <Box>
            : {location.state.order_status}
            </Box>
          </Box>
          <Box sx={{display:'flex', marginBottom:'10px'}}>
            <Box sx={{width:'40%'}}>
              Payment Mode
            </Box>
            <Box>
              : {location.state.paymentMode == 'cash_on_delivery' ? 'Cash on delivery' : 'Online'}
            </Box>
          </Box>
          <Box sx={{display:'flex'}}>
            <Box sx={{width:'40%'}}>
              Delivery status 
            </Box>
            {
              location.state.deliveryDetails ? 
              <Box>

              </Box> : 
              <Box>
                : Not assigned
              </Box>
            }
          </Box>

          <Box sx={{display:'flex'}}>
            <Box sx={{width:'40%'}}>
              Delivery Address 
            </Box>
            <Box sx={{width:'60%', marginLeft:'15px'}}>
              {
                location.state.shippingAddressDataa[0].contact_person_name + ', ' 
                +  location.state.shippingAddressDataa[0].address + ', ' 
                +  location.state.shippingAddressDataa[0].city + ', '
                + location.state.shippingAddressDataa[0].state + ', '
                + location.state.shippingAddressDataa[0].zip
              }
            </Box>

          </Box>

        </Paper>
        </Box>
      }
        
    </Box>
  )
}

export default OrderDetails
