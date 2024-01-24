import { React, useContext, useEffect, useState, useCallback } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import { addNewAddress, editAddressApi, getNearestStoreDetails, logAction } from '../services/api';
import { getFirebaseError } from '../services/error-codes';
import { AuthContext } from '../contexts/AuthContext';
import  ComponentLoader from '../components/ComponentLoader'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { useForm, Controller } from "react-hook-form";
import { useLocation } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext';
import { Geolocation } from '@capacitor/geolocation';
import TextField from '@mui/material/TextField';
import NavHeader from '../components/NavHeader';


const styles = {
  titleCont : {
    fontSize : '25px',
    marginBottom:'10px',
    fontFamily:'Foregen',
    color:'#404040'
  }
}

const placesLibrary = ["places"]


function EditAddress() {

  const containerStyle = {
    width: '80vw',
    maxWidth:'560px',
    height: '400px'
  }

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const [map, setMap] = useState(null)
  const [searchResult, setSearchResult] = useState("Result: none")
  const [latLong, setLatLong] = useState({})
  const location = useLocation()

 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries: placesLibrary
  })

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(location.state.latLong)
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
 

  useEffect(() => {
    logAction('PAGE_VIEW', 'editAddress')
    window['currentLocation'] = undefined
  }, [])

  const editAddress = async(data)=>{
    
    const addressData = {
      addressId     : location.state.addressId,
      userName      : data.userName,
      houseDetails  : data.houseDetails,
      streetDetails : data.streetDetails,
      landmark      : data.landmark,
      pincode       : data.pincode,
      userId        : location.state.userId,
      latLong       : latLong
    }

    showLoader()

    const resp = await getNearestStoreDetails(addressData)

    if (!resp.branchId || !resp.locCode) {
      showAlert(<><b>We regret to inform you that delivery is not available for the selected address.</b><br /><br /> Please note that we deliver within a maximum radius of 8km and the selected address lies beyond our delivery range.</>)
      hideLoader()
      return
    } 

    editAddressApi(addressData).then(() => {

        showSnackbar("Address updated successfully")
        hideLoader()
        window.history.back()
    }).catch((error) => {
      showAlert("Failed to update address")
      hideLoader()
    })
  }


  return (
      <Box  sx={{padding:'4vw', maxWidth:'600px', marginTop:'7vh'}}>
        <NavHeader />
   
        <Box sx={{display:'flex', flexDirection:'column'}}>
        
        <Box style={styles.titleCont}>
         Edit Address Details
        </Box>
            
          <Box sx={{padding:'10px', background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}> 
          <form onSubmit={handleSubmit(editAddress)}>
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
                defaultValue={location.state.userName??''}
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
                defaultValue={location.state.houseDetails??''}
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
                defaultValue={location.state.streetDetails??''}
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
                defaultValue={location.state.landmark??''}
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
                defaultValue={location.state.pincode??''}
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
              
            <Button onClick={() => window.history.back()} sx={{mr:2}} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update 
            </Button>
          </form>
            
          </Box>
        </Box> 
      </Box>
  )
}

export default EditAddress