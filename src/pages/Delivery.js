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
import { addNewAddress, getAllUserAddress, getNearestStoreDetails, logAction } from '../services/api';
import { getFirebaseError } from '../services/error-codes';
import { AuthContext } from '../contexts/AuthContext';
import  ComponentLoader from '../components/ComponentLoader'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const styles = {
  titleCont : {
    fontSize : '25px',
    marginBottom:'10px'
  },
  shadowBox : {
    background : 'white',
    padding:'20px',
    marginTop:'10px'
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
  const [latLong, setLatLong] = useState({lat : 17.3850, lng : 78.4867})
  const [searchResult, setSearchResult] = useState("Result: none")

  const [selectedAddrIndex, setSelectedAddrIndex] = useState(null)

  const [delSlot, setDelSlot] = useState(null)
  const [delDate, setDelDate] = useState('Today')
  const [storeDetails, setStoreDetails] = useState(null)

  const [filteredSlots, setFilteredSlots] = useState([])
  const [timeSlots, setTimeSlots] = useState([
    {
      id : 7,
      time : '7:30 AM - 8:30AM'
    },
    {
      id : 8,
      time : '8:30 AM - 9:30AM'
    },
    {
      id : 9,
      time : '9:30 AM - 10:30AM'
    },
    {
      id : 17,
      time : '5:30 PM - 6:30PM'
    },
    {
      id : 18,
      time : '6:30 PM - 7:30PM'
    },
    {
      id : 19,
      time : '7:30 PM - 8:30PM'
    },
    {
      id : 20,
      time : '8:30 PM - 9:30PM'
    }
  ])

  const onDelDateChange = (event, newDate) => {
    setDelSlot(null)
    setDeliverySlots(newDate)
    setDelDate(newDate)
  }

  const changeDeliverySlot = (newSlot) => {
    setDelSlot(newSlot)
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCK7GQwFpewtRosu4F4n8xNShe-sDeAd48",
    libraries: placesLibrary
  })

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(window['currentLocation']);
    map.fitBounds(bounds);
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
      const place = searchResult.getPlace();
      // console.log("===", place.geometry.location.lat(), place.geometry.location.lng())
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      // console.log(place);

      window['currentLocation'] = {
        lat : place.geometry.location.lat(),
        lng : place.geometry.location.lng()
      }
      setLatLong(window['currentLocation'])

      // console.log(`Name: ${name}`);
      // console.log(`Business Status: ${status}`);
      // console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      showAlert("Please enter address for map", "error")
    }
  }

  useEffect(() => {
    logAction('PAGE_VIEW', 'delivery')
    setDeliverySlots('Today')
    printCurrentPosition()
    getUserAddress()
  }, [])

  const setDeliverySlots = (date) => {
    if (date == 'Today') {
      const today = new Date()
      setFilteredSlots(timeSlots.filter((slot) => slot.id > today.getHours() + 1).map((item) => item.id))
    } else {
      setFilteredSlots(timeSlots.map((item) => item.id))
    }
  }

  const printCurrentPosition = async() => {

    const coordinates = await Geolocation.getCurrentPosition().catch((err) => {
      //User denied location permission
    })

    setLatLong({
      lat : coordinates?.coords.latitude || 17.3850,
      lng : coordinates?.coords.longitude || 78.4867
    })
    window['currentLocation'] = {
      lat : coordinates?.coords.latitude || 17.3850,
      lng : coordinates?.coords.longitude || 78.4867
    }
  }

  const getUserAddress = async() => { 

    getAllUserAddress(await getUserId()).then((response) => {
      setAddress(response)
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

    if (!latLong) {
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
      storeDetails   : storeDetails,
      itemDetails    : await getCartData()
    }
    navigate(`/orderSummary`, {state : summaryProps, replace:true})
  }

  const handleAddressChange = async(event) => {

    event.preventDefault()

    showLoader()
    const resp = await getNearestStoreDetails(address[event.target.value].latLong)
    hideLoader()

    if (!resp.branchId || !resp.locCode) {
      showAlert("Sorry, Country Chicken Co delivery is currently unavailable for the selected address.")
      return
    } 

    setSelectedAddrIndex(event.target.value)
    setStoreDetails(resp)
    setDeliveryAddress(address[event.target.value])
  }

  const handlePaymentChange = async(event) => {
    setPaymentMode(event.target.value)
  }

  return (
    <motion.div
      initial={{opacity:0}} 
      animate={{opacity:1}}>
    <Box sx={{padding:'4vw', maxWidth:'600px', marginTop:'5vh'}}>

    {
      loading ? <ComponentLoader /> :
    
      <Box>
        <Box style={styles.shadowBox}>
        <Box style={styles.titleCont}>
          Delivery Details
        </Box>
            <RadioGroup onChange={handleAddressChange} value={selectedAddrIndex}>
            {
              address.map((address, index) => {
                return <Box key={index}>
                  <Box sx={{display:'flex', borderBottom:'1px solid #eaeaea', padding:'10px 0'}}>
                    <FormControlLabel value={index} control={<Radio />} label={
                      <Box>
                        <Box>
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
              
              <Box> 
              <form onSubmit={handleSubmit(onFormSubmit)}>
              <Autocomplete onLoad={onAutoCompleteLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search for your location"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `32px`,
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
              <Box mb={3}>
           
                  {
                    isLoaded ? 
                    (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        onLoad={onLoad}
                        center={latLong}
                        options={{mapTypeControl: false, fullscreenControl:false, minZoom:15}}
                        onUnmount={onUnmount}
                      >
                        <Marker position={latLong} draggable={true} onDrag={(e) => mapPositionChanged(e.latLng) } />                             
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

        <Box mt={3} sx={{padding:'10px 20px 10px 20px', background:'white'}}>
          <Box sx={{mb:1, fontSize:'18px'}}>
            Delivery Date
          </Box>
          <ToggleButtonGroup
            color="primary"
            value={delDate}
            exclusive
            onChange={onDelDateChange}
          >
            <ToggleButton  sx={{textTransform:'none'}} value="Today">Today</ToggleButton>
            <ToggleButton  sx={{textTransform:'none'}} value="Tomorrow">Tomorrow</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box mb={3} sx={{padding:'20px 20px', background:'white'}}>
          <Box sx={{mb:1, fontSize:'18px'}}>
            Delivery Slot
          </Box>
          <Select
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
          </Select>
        </Box>

        <Box sx={{margin:'30px 0'}} style={styles.shadowBox}>
          <Box style={styles.titleCont}>
            Payment Details
          </Box>
          <FormControl onChange={handlePaymentChange}>
            <RadioGroup defaultValue="online">
              <Box sx={{display:'flex', flexDirection:'column'}}>
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
