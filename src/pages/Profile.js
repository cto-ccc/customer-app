import { React, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { getFirebaseError } from '../services/error-codes';
import { AuthContext } from '../contexts/AuthContext';
import  ComponentLoader from '../components/ComponentLoader'
import { CommonContext } from '../contexts/CommonContext';
import { getUserProductOrders, getUserProfileData } from '../services/api';
import { Paper } from '@mui/material';

const styles = {
  shadowBox : {
    background : 'white',
    padding:'10px',
    marginTop:'10px'
  }
}

function Profile() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { getUserId, getCustomerId } = useContext(AuthContext)
  const [profileData, setProfileData] = useState(null)
  const [orders, setOrders] = useState([])
  const { logout } = useContext(AuthContext)
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)


  useEffect(() => {
    getUserProfile()
  }, [])

  const getUserProfile = async() => {
    getUserProfileData(await getUserId()).then((response) => {
      setProfileData(response)
      getUserOrders()
    }).catch((error) => {
      setLoading(false)
      showAlert(getFirebaseError(error))
    })
  }

  const getUserOrders = async() => {
    // getOrdersById(await getUserId()).then((response) => {
    //   console.log(response)
    //   setOrders(response)
    //   setLoading(false)
    // }).catch((error) => {
    //   console.log(error)
    //   setLoading(false)
    //   showAlert(getFirebaseError(error))
    // })
    const userData = {
      customerId : await getCustomerId()
    }

    getUserProductOrders(userData).then((response) => {
      setOrders(response)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      showAlert(getFirebaseError(error))
    })
  }  

  return (
    <Box sx={{padding:'4vw', maxWidth:'550px', marginTop:'5vh'}}>
    {
      loading ? <ComponentLoader /> : 
      <Box>  
        <Box sx={{fontSize:'25px'}}>
          Profile
        </Box>
        <Box style={styles.shadowBox}>
          <Box sx={{display:'flex', flexDirection:'column', padding:'10px'}}>
            <Box sx={{marginBottom:'5px', fontSize:'20px', fontWeight:'bold'}}>
              {profileData.f_name} {profileData.l_name}
            </Box>
            <Box sx={{marginBottom:'5px'}}>
              {profileData.phone}
            </Box>
            <Box sx={{marginBottom:'5px'}}>
              {profileData.email}
            </Box>
          </Box>
        </Box>

        <Box sx={{display:'flex', marginTop:'20px'}}>
          {/* <Box mr={2}>
            <Button variant='contained'>View Address</Button>
          </Box> */}
          <Box>
            <Button variant='outlined' onClick={() => logout()}>Logout</Button>
          </Box>
        </Box>
        
        <Box sx={{fontSize:'23px', marginTop:'20px'}}>
          Your Order's
        </Box>
        <Box>
          {
            orders.length ? 
            <Box>
              {
                orders.map((item, index) => {
                  return <Paper sx={{display:'flex', flexDirection:'column', margin:'10px 0', padding:'10px'}}
                   key={index}>
                 
                 <Box mb={1} sx={{fontWeight:'bold'}}>
                    {item.products[0]?.name.charAt(0).toUpperCase() + item.products[0]?.name.substr(1).toLowerCase()}
                  </Box>
                  {/* <Box mb={1} sx={{fontWeight:'bold'}}>
                    {item.itemDetails.totalCount}
                  </Box> */}
                  <Box mb={1} sx={{fontWeight:'bold'}}>
                   ₹ {item.order_amount}
                  </Box>
                  <Box mb={1}>
                    {/* {new Date(item.timeStamp).toLocaleString()} */}
                    {item.order_date}
                  </Box>
                  <Box mb={1}>
                    Status : {item.order_status}
                  </Box>   
                  <Box sx={{textAlign:'right', borderTop:'1px solid #eaeaea', paddingTop:'10px', color:'#a4243d', cursor:'pointer'}}
                    onClick={() => navigate('/orderDetails', {state : item})}>
                    {
                      item.status == 'DELIVERED' ? 
                      'View Order' : 'Track Order'
                    }
                  </Box>          
                </Paper>
                })
              }
            </Box> : 
            <Paper sx={{padding:'20PX 0', textAlign:'center', marginTop:'10px'}}>
              No orders found
            </Paper>
          }
        </Box>

      </Box>
    }
    </Box>
  )
}

export default Profile
