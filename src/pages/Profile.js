import { React, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { getFirebaseError } from '../services/error-codes';
import { AuthContext } from '../contexts/AuthContext';
import  ComponentLoader from '../components/ComponentLoader'
import { CommonContext } from '../contexts/CommonContext';
import { getUiProductsData, getUserProductOrders, getUserProfileData, logAction } from '../services/api';
import { Paper } from '@mui/material';
import NavHeader from '../components/NavHeader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
  const [specifications, setSpecifications] = useState({})

  useEffect(() => {
    logAction('PAGE_VIEW', 'profile')
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

    const userData = {
      customerId : await getCustomerId()
    }

    getUserProductOrders(userData).then((response) => {
      setOrders(getUiProductsData(response))
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      showAlert(getFirebaseError(error))
    })
  }  

  return (
    <Box sx={{padding:'4vw', maxWidth:'550px', marginTop:'7vh'}}>
    {
      loading ? <ComponentLoader /> : 
      <Box>  
        <NavHeader />
        <Box sx={{fontSize:'25px', fontFamily:'Foregen'}}>
          PROFILE
        </Box>
        <Box style={styles.shadowBox}>
          <Box sx={{display:'flex', flexDirection:'column', padding:'10px'}}>
            <Box sx={{marginBottom:'5px', fontSize:'25px', fontWeight:'bold', textTransform:'capitalize'}}>
              {profileData.f_name} 
            </Box>
            <Box sx={{marginBottom:'5px'}}>
              {profileData.phone}
            </Box>
            <Box sx={{marginBottom:'5px', border:'1px solid #bfbfbf', padding:'10px', margin:'10px 0', borderRadius:'5px',
                      display:'flex', justifyContent:'space-between'}} 
              onClick={() => navigate('/myAddresses')}>
              My Addresses
              <ChevronRightIcon />
            </Box>
          </Box>
        </Box>

        <Box sx={{display:'flex', marginTop:'20px'}}>
          <Box>
            <Button variant='outlined' onClick={() => logout()}>Logout</Button>
          </Box>
        </Box>
        
        <Box sx={{fontSize:'25px', fontFamily:'Foregen', marginTop:'25px'}}>
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
                    {item.uiProducts && item.uiProducts[0]?.name.charAt(0).toUpperCase() + item.uiProducts[0]?.name.substr(1).toLowerCase()}
                  </Box>
                  {/* <Box mb={1} sx={{fontWeight:'bold'}}>
                    {item.itemDetails.totalCount}
                  </Box> */}
                  <Box mb={1} sx={{fontWeight:'bold'}}>
                   ₹ {item.order_amount + item.shipping_cost}
                  </Box>
                  <Box mb={1} sx={{fontSize:'10px'}}>
                    {/* {new Date(item.timeStamp).toLocaleString()} */}
                    {item.order_date}
                  </Box>
                  <Box mb={1} sx={{textTransform:'capitalize'}}>
                    Order ID : {item.order_id}
                  </Box>  
                  <Box mb={1} sx={{textTransform:'capitalize', color:'#a4243d'}}>
                    Status : {item.order_status}
                  </Box>  
                  <Box sx={{textAlign:'right', borderTop:'1px solid #bfbfbf', paddingTop:'10px', color:'#a4243d', cursor:'pointer'}}
                    onClick={() => navigate('/orderDetails', {state : item})}>
                    {
                      item.order_status == 'delivered' ? 
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
