import { React, useContext, useEffect, useState, useCallback } from 'react'
import { Geolocation } from '@capacitor/geolocation';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import { useForm, Controller } from "react-hook-form";
import { Preferences } from '@capacitor/preferences';
import { CommonContext } from '../contexts/CommonContext';
import { motion } from 'framer-motion'
import { addNewAddress, deleteAddress, editAddressApi, getAllUserAddress, getBranchInfo, getNearestStoreDetails, getUserDeliveryData, logAction } from '../services/api';
import { getFirebaseError } from '../services/error-codes';
import { AuthContext } from '../contexts/AuthContext';
import  ComponentLoader from '../components/ComponentLoader'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Capacitor } from '@capacitor/core';
import NavHeader from '../components/NavHeader';
import { useLocation } from 'react-router-dom'
import { setUserId } from 'firebase/analytics';


const styles = {
  titleCont : {
    fontSize : '25px',
    marginBottom:'10px',
    fontFamily:'Foregen',
    color:'#404040'
  }
}

const placesLibrary = ["places"];


function MyAddresses() {

  const containerStyle = {
    width     : '80vw',
    maxWidth  : '560px',
    height    : '400px'
  }

  const navigate = useNavigate()

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { getUserId } = useContext(AuthContext)
  const [newAddressDetail, setNewAddressDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState([])
  const [latLong, setLatLong] = useState({})
  const [map, setMap] = useState(null)
  const location = useLocation()
  const [searchResult, setSearchResult] = useState("Result: none")
  const [showNewAddress, setShowNewAddress] = useState(false)

  useEffect(() => {
    logAction('PAGE_VIEW', 'myaddresses')
    window['currentLocation'] = undefined
    getUserAddress()
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries: placesLibrary
  })

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(window['currentLocation'])
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const mapPositionChanged = (e) => {
    setLatLong({
      lat : e.lat(),
      lng : e.lng()
    })
  }

  const requestForLocPermission = async() => {
    await Geolocation.requestPermissions('location').then((resp) => {
      if (resp.location == 'granted')
        printCurrentPosition()
      else 
        showAlert("Location permission is disabled. Please enable location to continue")
    }).catch((err) => {
      showAlert("Location permission is disabled. Please enable location to continue")
    })
  }

  const printCurrentPosition = async() => {

    await Geolocation.getCurrentPosition()
     .then((resp) => {
       // console.log("current position is : ", resp.coords)
       setLatLong({
         lat : resp.coords.latitude,
         lng : resp.coords.longitude
       })
       window['currentLocation'] = {
         lat : resp.coords.latitude,
         lng : resp.coords.longitude
       }      
     })
     .catch((err) => {
       requestForLocPermission()
     })
   }

  function onAutoCompleteLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {

    if (searchResult != null) {

      const place = searchResult.getPlace()
      window['currentLocation'] = {
        lat : place.geometry.location.lat(),
        lng : place.geometry.location.lng()
      }
      setLatLong(window['currentLocation'])
    } else {
      showAlert("Please enter address for map", "error")
    }
  }


  const getUserAddress = async() => { 
    getUserDeliveryData(await getUserId()).then((response) => {
      setAddress(response.addresses)
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      showAlert(getFirebaseError(error))
    })  
  }

  const onFormSubmit = async(data) => {

    data.houseDetails  = data.houseDetails.replace("'", "")
    data.landmark      = data.landmark.replace("'", "")
    data.streetDetails = data.streetDetails.replace("'", "")

    data.userId    = await getUserId()
    data.timeStamp = Date.now()
    data.latLong   = latLong
   
    if (!latLong.lat || !latLong.lng) {
      showAlert("Please select your delivery location on map to add address.")
      return
    }

    showLoader()
    addNewAddress(data, false).then((response => {
      showSnackbar("Address added successfully !")
      getUserAddress()
      hideLoader()
      setShowNewAddress(false)
    })).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error))
    })    
    reset()
  }

  const closeAddNewAddrForm = async() => {
    setShowNewAddress(false)
    reset()
  }

  const handleDeleteAddr = (address) => {
    showLoader()
    deleteAddress(address, false).then((response => {
      showSnackbar("Address deleted successfully !")
      getUserAddress()
      hideLoader()
    })).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error))
    })    
  }

  return (
    <motion.div
      initial={{opacity:0}} 
      animate={{opacity:1}}>
    <Box sx={{padding:'4vw', maxWidth:'600px', marginTop:'7vh'}}>

    {
      loading ? <ComponentLoader /> :
    
      <Box>
        <NavHeader />
        <Box>
        <Box style={styles.titleCont}>
          Address Details
        </Box>
            
            {
              address.map((address, index) => {
                return <Box key={index}>
                  <Box sx={{padding:'10px', margin:'10px 0', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
                      <Box sx={{fontSize:'17px', color:'#404040', fontFamily:'Sans'}}>
                        <Box sx={{fontWeight:'700'}}>
                          {address.userName}
                        </Box>
                        <Box>
                          {address.houseDetails}, {address.streetDetails}
                        </Box>
                        <Box>
                          {address.landmark}
                        </Box>
                        <Box>
                          {address.pincode}
                        </Box>
                        <Box sx={{marginTop:'1rem'}}>
                          <Button size='small' onClick={() => navigate('/editAddress', {state:address})} variant='outlined'>Edit</Button>
                          <Button size='small' sx={{ml:1}} onClick={() => handleDeleteAddr(address)} variant='outlined'>Delete</Button>
                        </Box>   
                      </Box>
                  </Box>                                                           
                </Box>
              })
            }
            
          {
            showNewAddress ? 
            <Box sx={{display:'flex', flexDirection:'column'}}>
              <Box sx={{mt:2, mb:2}}>
                Add New address
              </Box>
              
              <Box sx={{padding:'10px', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}> 
              <form onSubmit={handleSubmit(onFormSubmit)}>
              <Autocomplete onLoad={onAutoCompleteLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search for your location"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `40px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    marginBottom:'20px',
                    outline: `none`,
                    textOverflow: `ellipses`
                  }}
                />
              </Autocomplete>
              <Button variant='outlined' size='small' onClick={() => printCurrentPosition()}>Use Current Location</Button>
              <Box mb={3} mt={2}>
           
                  {
                    isLoaded ? 
                    (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        onLoad={onLoad}
                        center={window['currentLocation']}
                        options={{mapTypeControl: false, fullscreenControl:false, minZoom:15}}
                        onUnmount={onUnmount}
                      >
                        <Marker position={window['currentLocation']} draggable={true} onDrag={(e) => mapPositionChanged(e.latLng) } />                             
                      </GoogleMap>
                  ) : <></>
                  }
                </Box>

                <Box mb={3}>
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    defaultValue={newAddressDetail.userName}
                    name="userName"
                    {...register("userName", {
                      required: "Required field"
                    })}
                    error={Boolean(errors?.userName)}
                    helperText={errors?.userName?.message}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    label="Flat, House no, Apartment"
                    variant="outlined"
                    fullWidth
                    defaultValue={newAddressDetail.houseDetails}
                    name="houseDetails"
                    {...register("houseDetails", {
                      required: "Required field"
                    })}
                    error={Boolean(errors?.houseDetails)}
                    helperText={errors?.houseDetails?.message}
                  />
                </Box>
                

                <Box mb={3}>
                  <TextField
                    label="Area, Street, City"
                    variant="outlined"
                    fullWidth
                    defaultValue={newAddressDetail.streetDetails}
                    name="streetDetails"
                    {...register("streetDetails", {
                      required: "Required field"
                    })}
                    error={Boolean(errors?.streetDetails)}
                    helperText={errors?.streetDetails?.message}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    placeholder="Enter Landmark"
                    label="Landmark"
                    variant="outlined"
                    fullWidth
                    defaultValue={newAddressDetail.landmark}
                    name="landmark"
                    {...register("landmark", {
                      required: "Required field"
                    })}
                    error={Boolean(errors?.landmark)}
                    helperText={errors?.landmark?.message}
                  />
                </Box>

                <Box mb={3}>
                  <TextField
                    label="Pincode"
                    ariant="outlined"
                    fullWidth
                    defaultValue={newAddressDetail.pincode}
                    name="pincode"
                    {...register("pincode", {
                      required: "Required field",
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: "Invalid pincode. Pincode must be 6 digits",
                      }
                    })}
                    error={Boolean(errors?.pincode)}
                    helperText={errors?.pincode?.message}
                  />
                </Box>
                  
                <Button onClick={() => closeAddNewAddrForm()} sx={{mr:2}} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save 
                </Button>
              </form>
                
              </Box>
            </Box> :  
            <Box sx={{marginTop:'20px'}}>
              <Button onClick={() => setShowNewAddress(true)} variant="contained">Add new address</Button>
            </Box>
          }        
        </Box>
      
      </Box>
    }
    </Box>
    </motion.div>
  )
}

export default MyAddresses
