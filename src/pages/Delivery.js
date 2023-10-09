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
import { addNewAddress, getAllUserAddress, getBranchInfo, getNearestStoreDetails, getUserDeliveryData, logAction } from '../services/api';
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


const styles = {
  titleCont : {
    fontSize : '25px',
    marginBottom:'10px',
    fontFamily:'Foregen',
    color:'#404040'
  }
}

const placesLibrary = ["places"];


function Delivery() {

  const containerStyle = {
    width: '80vw',
    maxWidth:'560px',
    height: '400px'
  };

  const navigate = useNavigate()

  const [showNewAddress, setShowNewAddress] = useState(false)
  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { getUserId } = useContext(AuthContext)
  const [newAddressDetail, setNewAddressDetail] = useState({})
  const [deliveryAddress, setDeliveryAddress] = useState(null)
  const [paymentMode, setPaymentMode] = useState('online')
  const { getCartData } = useContext(CommonContext)
  const [loading, setLoading] = useState(true)
  const [address, setAddress] = useState([])
  const [latLong, setLatLong] = useState({})
  const location = useLocation()
  const [searchResult, setSearchResult] = useState("Result: none")

  const [selectedAddrIndex, setSelectedAddrIndex] = useState(null)

  const [delSlot, setDelSlot] = useState(null)
  const [delType, setDelType] = useState('delivery')
  const [delDate, setDelDate] = useState('Today')
  const [storeDetails, setStoreDetails] = useState(null)
  const [map, setMap] = useState(null)

  const [allDeliverySlots, setAllDeliverySlots] = useState([])
  const [filteredSlots, setFilteredSlots] = useState([])

  const onDelDateChange = (event, newDate) => {
    setDelSlot(null)
    setDelDate(newDate)
    if (!selectedAddrIndex) return
    // setDeliverySlots(newDate)
    showLoader()
    fetchBranchInfo(newDate, storeDetails.branchId)
  }

  const changeDeliverySlot = (newSlot) => {
    setDelSlot(newSlot)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCK7GQwFpewtRosu4F4n8xNShe-sDeAd48",
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

  useEffect(() => {
    logAction('PAGE_VIEW', 'delivery')
    getUserAddress()
    window['currentLocation'] = undefined
  }, [])

  // const setDeliverySlots = (date) => {
  //   console.log('=========', date)
  //   setFilteredSlots(allDeliverySlots.filter((slot) => slot.delTime == date))
  //   console.log("==========", allDeliverySlots.filter((slot) => slot.delTime == date))
  // }

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


  const getUserAddress = async() => { 

    getUserDeliveryData(await getUserId()).then((response) => {
      setAddress(response.addresses)
      // setAllDeliverySlots(response.timeSlots)
      // setFilteredSlots(response.timeSlots.filter((slot) => slot.delTime == delDate))
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      showAlert(getFirebaseError(error))
    })  
  }

  const onFormSubmit = async(data) => {
    data.userId    = await getUserId()
    data.timeStamp = Date.now()
    data.latLong   = latLong
   
    if (!latLong.lat || !latLong.lng) {
      showAlert("Please select your delivery location on map to add address.")
      return
    }

    showLoader()
    addNewAddress(data, false).then((response => {
      getUserAddress()
      hideLoader()
    })).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error))
    })    

    reset()
    setShowNewAddress(false)
  }

  const closeAddNewAddrForm = async() => {
    setShowNewAddress(false)
    reset()
  }

  const confirmOrder = async() => {
    if (!deliveryAddress) {
      showSnackbar("Please select an address to continue", "error")
      return
    }

    if (!delSlot) {
      showSnackbar("Please select a delivery slot", "error")
      return
    }

    if (!delDate) {
      showSnackbar("Please select a delivery date", "error")
      return
    }

    const summaryProps = {
      addressDetails : deliveryAddress,
      paymentMode    : paymentMode,
      delSlotId      : delSlot,
      delDate        : delDate,
      delSlotTime    : filteredSlots.filter((slot) => slot.id == delSlot && slot.delTime == delDate)[0].time,
      delType        : delType,
      storeDetails   : storeDetails,
      itemDetails    : await getCartData(),
      instructions   : location?.state?.instructions
    }
    navigate(`/orderSummary`, {state : summaryProps, replace:true})
  }

  const handleAddressChange = async(event) => {

    event.preventDefault()

    showLoader()
    const resp = await getNearestStoreDetails(address[event.target.value].latLong)
    
    if (!resp.branchId || !resp.locCode) {
      showAlert("Sorry, Country Chicken Co delivery is currently unavailable for the selected address.")
      return
    } 
    
    setSelectedAddrIndex(event.target.value)
    setStoreDetails(resp)
    setDeliveryAddress(address[event.target.value])

    await fetchBranchInfo('Today', resp.branchId)

    hideLoader()
  }

  const fetchBranchInfo = async(deliveryDate, branchId) => {
    const branchInfo = await getBranchInfo({
      userId       : await getUserId(),
      branchId     : branchId,
      deliveryDate : deliveryDate,
      timeStamp    : Date.now()
    })
    setFilteredSlots(branchInfo.slots)
    setDelSlot(null)
    setDelDate(deliveryDate)
    hideLoader()
  }

  const handlePaymentChange = async(event) => {
    setPaymentMode(event.target.value)
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
          Delivery Details
        </Box>
            <RadioGroup onChange={handleAddressChange} value={selectedAddrIndex}>
            {
              address.map((address, index) => {
                return <Box key={index}>
                  <Box sx={{padding:'10px', margin:'5px 0', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
                    <FormControlLabel value={index} control={<Radio/>} label={
                      <Box sx={{fontSize:'15px', color:'#404040', fontFamily:'Sans'}}>
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
                      </Box>
                    } />                  
                  </Box>                                                           
                </Box>
              })
            }
            </RadioGroup>

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
                      required: "Required field"
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
            <Box sx={{marginTop:'10px'}}>
              <Button onClick={() => setShowNewAddress(true)} variant="outlined">Add new address</Button>
            </Box>
          }       
        </Box>


        <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d', mt:4}}>
          SELECT DELIVERY SLOT
        </Box>

        <Box mb={3}  sx={{padding:'15px 10px', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
        
          <Box sx={{mb:2}}>
            <ToggleButtonGroup
                color="primary"
                value={delDate}
                exclusive
                onChange={onDelDateChange}
              >
              <ToggleButton  sx={{textTransform:'none', padding:'3px 20px', 
                             color: delDate == 'Today' ? 'white !important' : 'black !important',
                             background: delDate == 'Today' ? '#a4243d !important' : 'FFF5E8 !important'}} value="Today">Today</ToggleButton>
              <ToggleButton  sx={{textTransform:'none', padding:'3px 20px',
                              color: delDate == 'Tomorrow' ? 'white !important' : 'black !important',
                              background: delDate == 'Tomorrow' ? '#a4243d !important' : 'FFF5E8 !important'}} value="Tomorrow">Tomorrow</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* {
            delDate == 'Today' ? 
            <Box sx={{background:'white', padding:'10px'}}>
              <Box mb={2}>
              Due to an exceptionally high demand, we've temporarily run out of stock.
                </Box>

              <Box sx={{color:'#a4243d', fontSize:'20px'}}>
                Please select a slot for tomorrow to continue order.
              </Box>
            

          </Box> :  */}
          <Select
              labelId="demo-select-small"
              placeholder="Delivery Time"
              fullWidth
              value={delSlot}
              onChange={(e) => changeDeliverySlot(e.target.value)}>

               {
                selectedAddrIndex ? 
                filteredSlots.map((item) => {
                  return ( 
                    <MenuItem key={item.id} disabled={item.isDisabled} value={item.id}>
                      {item.time} {item.isDisabled ? '(Not Available)' : null}
                    </MenuItem> 
                  )
                }) 
                :
                <MenuItem disabled={true} >
                  Please select an address to add slot
                </MenuItem> 
               } 

            </Select>

          {/* } */}

          {/* <Select
            labelId="demo-select-small"
            placeholder="Delivery Time"
            fullWidth
            value={delSlot}
            onChange={(e) => changeDeliverySlot(e.target.value)}>
            {
              timeSlots.map((item) => {
                return (
                  <MenuItem key={item.id} disabled={filteredSlots.indexOf(item.id) == -1} value={item.id}>
                    {item.time} {filteredSlots.indexOf(item.id) == -1 ? '(Not Available)' : null}
                  </MenuItem>
                )
              })
            }
          </Select> */}
        </Box>


        <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d'}}>
          SELECT DELIVERY TYPE
        </Box>
        <Box mb={3} sx={{padding:'10px', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
          
          <Select
            labelId="demo-select-small"
            placeholder="Delivery Time"
            fullWidth
            value={delType}
            onChange={(e) => setDelType(e.target.value)}>

            <MenuItem key="delivery" value="delivery">
              Home delivery 
            </MenuItem>
            <MenuItem key="self_pickup" value="self_pickup">
              Self pickup from store 
            </MenuItem>

          </Select>
        </Box>

        <Box sx={{mb:1, fontSize:'20px', fontFamily:'Foregen', color:'#a4243d'}}>
        PAYMENT MODE
        </Box>
        <Box sx={{padding:'10px', mb:3, background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
          <FormControl onChange={handlePaymentChange}>
            <RadioGroup defaultValue="online">
              <Box sx={{display:'flex', flexDirection:'column', color:'#404040'}}>
                <FormControlLabel value="online" control={<Radio />} label={
                  <Box>
                    Online Payment   
                  </Box>
                }/>
                <FormControlLabel value="cod" control={<Radio />} label={
                  <Box>
                    Cash On Delivery  
                  </Box>
                }/>
              </Box>
                                  
            </RadioGroup>
          </FormControl>
        </Box>
      <Box>
        <Button fullWidth onClick={() => confirmOrder()} variant="contained">
          Confirm
        </Button>
      </Box>
      </Box>
    }
    </Box>
    </motion.div>
  )
}

export default Delivery
