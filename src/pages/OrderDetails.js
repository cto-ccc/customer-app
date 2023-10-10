import { TextField, Button, Box, createMuiTheme, InputLabel, useTheme, FormControl, Paper, MenuItem } from '@mui/material'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import ComponentLoader from '../components/ComponentLoader';
import { useContext, useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getClientDetails, logAction, updateOrderStatus } from '../services/api';
import { CommonContext } from '../contexts/CommonContext';
import NavHeader from '../components/NavHeader';

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
    logAction('PAGE_VIEW', 'order-details')
  }, [])  


  function callMe(number) {
    window.open(`tel:${number}`, '_self');
  }

  return (
    <Box sx={{padding:'4vw', marginTop:'7vh', maxWidth:'550px'}}>
      {
        loading ? <ComponentLoader /> :
        <Box>
        <NavHeader />
        <Box mb={2} sx={{fontSize:'25px', fontFamily:'Foregen'}}>
          ORDER DETAILS
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
            <Box sx={{width:'20%', textAlign:'right'}}>
              Total
            </Box>
          </Box>

          {
            location.state.uiProducts.map((item, index) => {
              return <Box key={index} sx={{display:'flex'}} mb={1}>
                <Box sx={{width:'50%', textTransform:'capitalize'}}>
                  {item.name.toLowerCase()}
                  
                  {/* <Box>
                    {Object.keys(location.state.specifications).length > 0 ? 
                     Object.keys(location.state.specifications[item.product_code]).map((spec, index) => {
                        return <Box sx={{fontSize:'12px', textTransform:'capitalize'}} key={index}>
                          <li>
                            {location.state.specifications[item.product_code][spec].name.toLowerCase()}
                          </li>
                          </Box>
                      }) : null
                    }
                  </Box> */}
                </Box>
                <Box sx={{width:'15%'}}>
                ₹{item.price}
                </Box>
                <Box sx={{width:'15%', textAlign:'center'}}>
                  {item.quantity}
                </Box>
                <Box sx={{width:'20%', textAlign:'right'}}>
                ₹ {item.quantity * item.price}
                </Box>
              </Box>
            })
          }

          <Box sx={{display:'flex', borderTop:'1px solid #eaeaea', justifyContent:'space-between'}} mt={2} pt={2}>
            <Box sx={{width:'50%'}}>
            Coupon Discount
            </Box>
            <Box sx={{width:'15%'}}>

            </Box>
            <Box sx={{width:'20%', textAlign:'right'}}>
            - ₹ {
                (location.state?.coupon_discount_amount || 0)
              }
            </Box>
          </Box>

          <Box sx={{display:'flex', justifyContent:'space-between'}} mt={1}>
            <Box sx={{width:'50%'}}>
            Delivery Cost 
            </Box>
            <Box sx={{width:'15%'}}>

            </Box>
            <Box sx={{width:'20%', textAlign:'right'}}>
             ₹ {
                location.state.shipping_cost
              }

            </Box>
          </Box>



          <Box sx={{display:'flex', fontWeight:'bold', borderTop:'1px solid #eaeaea'}} mt={2} pt={2}>
            <Box sx={{width:'50%'}}>
              Total
            </Box>
            <Box sx={{width:'15%'}}>

            </Box>
            <Box sx={{width:'15%', textAlign:'center'}}>
              {
                location.state.uiProducts.length
              }
            </Box>
            <Box sx={{width:'20%', textAlign:'right'}}>
             ₹ {
                location.state.order_amount + location.state.shipping_cost
              }
            </Box>
          </Box>
        </Paper>   
        
        <Paper sx={{padding:'15px', fontSize:'17px'}}>
          <Box sx={{display:'flex', marginBottom:'5px'}}>
            <Box sx={{width:'40%'}}>
              Order ID
            </Box>
            <Box>
              : {location.state.order_id}
            </Box>
          </Box>
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
            <Box sx={{textTransform:'capitalize', color:'#a4243d'}}>
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
       

          <Box sx={{display:'flex', flexDirection:'column'}}>
            <Box sx={{width:'60%', marginTop:'10px'}}>
              Delivery Address: 
            </Box>
            <Box sx={{width:'100%', marginTop:'2px'}}>
              { location.state.shippingAddressDataa.length > 0 &&
                location.state.shippingAddressDataa[0].contact_person_name + ', ' 
                +  location.state.shippingAddressDataa[0].address + ', ' 
                +  location.state.shippingAddressDataa[0].city + ', '
                + location.state.shippingAddressDataa[0].state + ', '
                + location.state.shippingAddressDataa[0].zip
              }
            </Box>
          </Box>

          {
            location.state.deliveryPersonInfo?.length ?
            <Box sx={{mb:2, mt:2}}>
              <Box>
                Delivery Partner Assigned :                     
              </Box>
              <Box>
                { location.state.deliveryPersonInfo[0].firstName + ' ' + location.state.deliveryPersonInfo[0].lastName}
              </Box>
              <Box>
                { location.state.deliveryPersonInfo[0].phone}
              </Box>
            </Box> : null
          } 

          {/* {
            location.state.deliveryPersonInfo.length ? 
            <Box sx={{display:'flex', mt:1}}>
            <Box sx={{width:'40%'}}>
              Delivered By 
            </Box>
              <Box>
                : {location.state.deliveryPersonInfo[0].firstName + ' ' + location.state.deliveryPersonInfo[0].lastName}
              </Box>
            </Box> : null
          } */}

  

        </Paper>
        </Box>
      }
        
    </Box>
  )
}

export default OrderDetails
