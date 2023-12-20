import React, { useContext, useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useForm } from "react-hook-form";
import { CommonContext } from '../contexts/CommonContext';
import { auth } from '../firebase'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { createNewUser, generateSignupOtp, getInputTheme, getUserData, logAction, registerToken, setUserData, unRegisterToken, updateUserData, validateUserOtp } from '../services/api';
import { getFirebaseError } from '../services/error-codes';
import {
  PushNotifications,
} from '@capacitor/push-notifications';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import HomeLogo from '../assets/home-logo.png'
import { Capacitor } from '@capacitor/core';
import { useLocation } from 'react-router-dom'


const styles = {
  homeLogo : {
    width : '80vw',
    maxWidth:'350px'
  },
  mainCont : {
    maxWidth:'500px', 
    marginTop:'15vh', 
    display:'flex', 
    justifyContent:'center', 
    flexDirection:'column'
  },
  mainContDesk : {
    marginTop:'15vh', 
    display:'flex', 
    justifyContent:'center', 
    flexDirection:'column',
    padding:'1vw 30vw 5vw 30vw'
  }
}

function Authentication(props) {

  const [showSignIn, setShowSignIn] = useState(false)
  const [mobileNo, setMobileNo] = useState(null)
  const [deviceToken, setDeviceToken] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [isNotiEnabled, setIsNotiEnabled] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [impersoning, setImpersoning] = useState(false)

  const { showLoader, hideLoader, showAlert, showSnackbar, isDesktop } = useContext(CommonContext)
  const {userLoggedIn, setUserProfileData, isUserLoggedIn} = useContext(AuthContext)

  const { register, handleSubmit, control, reset, formState : {errors:errors} } = useForm()
  const { register : registerOtp, handleSubmit : submitOtp, reset : resetOtp, formState : {errors:errorsOtp} } = useForm()
  const { register : registerUser, handleSubmit : signupUser, reset : resetSignup, formState : {errors:errorSignup} } = useForm()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    logAction('PAGE_VIEW', 'authentication')
    async function checkLogin() {
      const resp = await isUserLoggedIn()
      if (resp) {
        navigate("/home", {replace:true})
      }
    }
    checkLogin()
  }, [])
  
  const switchLogin = () => {
    setShowSignIn(!showSignIn) 
    reset()
  }

  const loginUser = (data) => {

    if (data.mobileNo == process.env.REACT_APP_CUST_CARE_NO) {
      setImpersoning(true)
      showAlert(<><b>You are now logging in as customer</b></>)
      reset()
      return
    }

    showLoader()
    setMobileNo(data.mobileNo)
    logAction('login')
    getUserData(data.mobileNo, false).then((response => {
      if (response) {
        setUserProfile(response)
        sendOtp({
          channel     : Capacitor.getPlatform(),
          mobileNo    : data.mobileNo,
          firstName   : response.f_name,
          type        : 'LOGIN'
        })
      } else {
        showAlert(<>User account is not registered. Please sign up.</>)
        hideLoader()
      }
    })).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error))
    })    
  }

  const signUpNewUser = (data) => {

    data.channel = Capacitor.getPlatform() 
    logAction('signup')
    showLoader()
    getUserData(data.mobileNo, false).then((response => {
      if (response) {
        showAlert(<>Mobile number already registered. Please login.</>)
      } else {
        subscribePushNotification()
        setUserProfile(data)
        data.type        = 'SIGN_UP'
        sendOtp(data)
      }
      hideLoader()
    })).catch((error) => {
      hideLoader()
      showAlert(getFirebaseError(error))
    })    
  }

  const sendOtp = (data) => {

    data.impersoning = impersoning
    generateSignupOtp(data).then((response) => {
      setShowOtp(true)
      hideLoader()
    }).catch((error) => {

      hideLoader()
      showAlert(error)
    })  
  }


  const subscribePushNotification = () => {

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        PushNotifications.register()
      } else {
        // Show some error
      }
      // PushNotifications.createChannel({id:'alarm', name:'alarm', importance:5,visibility:1, sound:'mysound.mp3'})
    })

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token) => {
        setDeviceToken(token.value)
        // updateUserData({deviceToken : token.value}, userProfile.phone).then(() => {
        //   console.log("Updated new device token : ", token.value)
        // }).catch((error) => {
        //   showAlert("Failed to activate notifications. Please contact admin.")
        // })

        // if (userProfile.deviceToken && userProfile.deviceToken != token.value) {

        //   unRegisterToken(userProfile.deviceToken, groups).then(async()=> {
        //     console.log("Removing device from notifications : ", userProfile.deviceToken)
        //     hideLoader()
        //   }).catch(async(error) => {
        //     hideLoader()
        //     showAlert("Some unexpected error occured")
        //   })
        // }
        // registerToken(token.value, groups).then(async()=> {
        //   console.log("Subscribing device for notifications : ", token.value)
        //   hideLoader()
        // }).catch(async(error) => {
        //   hideLoader()
        //   showAlert("Some unexpected error occured")
        // })
      }
    )

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error) => {
        console.log("Error in setting up notifications")
      }
    )
  }

  const verifyOtp = async(data) => {

    showLoader()
    const reqData = {
      mobileNo : userProfile.mobileNo,
      otp      : data.otp
    }
    validateUserOtp(reqData).then((response) => {
      if (response.err) {
        showAlert(response.err)
        hideLoader()
      } else {

        const userData = {
          userId      : userProfile.mobileNo,
          deviceToken : deviceToken,
          timeStamp   : Date.now(),
          ...userProfile
        }

        if (!showSignIn) {  

          createNewUser(userData).then((response) => {
            setUserProfileData(userData)
            userLoggedIn(userProfile.mobileNo, response.customerId)
            hideLoader()
            showSnackbar("Signup successful")
            if (location?.state?.navToCart) 
              navigate('/cart', {replace:true})
            else  
              navigate('/', {replace:true})
          }).catch((error) => {
            hideLoader()
            showAlert(getFirebaseError(error.code))
          })

        } else {

          setUserProfileData(userProfile)
          userLoggedIn(userProfile.mobileNo, userProfile.customerId)
          hideLoader()
          showSnackbar("Login successful")
          if (location?.state?.navToCart) 
            navigate('/delivery', {replace:true})
          else  
            navigate('/', {replace:true})
        }
      }
      
    }).catch((error) => {

      hideLoader()
      showAlert(error)
    })  
  }

  return (
    <Box style={isDesktop ? styles.mainContDesk : styles.mainCont}>
      <Box>
        <Box sx={{textAlign:'center', marginTop:'2vh'}}>
          <img src={HomeLogo} style={styles.homeLogo}/>
        </Box>
        {
          showOtp ? 
          <Box sx={{textAlign:'center', padding:'4vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box sx={{width:'100%'}}>
              <form onSubmit={submitOtp(verifyOtp)}>
                <h5>Enter OTP sent to your mobile number</h5>
                <Box mb={3}>
                  <TextField
                    placeholder="Enter OTP"
                    label="OTP Number"
                    variant="outlined"
                    fullWidth
                    type="number"
                    autoComplete='off'
                    name="otp"
                    {...registerOtp("otp", {
                      required: "Required field"})}
                    error={Boolean(errorsOtp?.otp)}
                    helperText={errorsOtp?.otp?.message}
                  />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth id='sign-in-button'>
                  Verify OTP
                </Button>
              </form>
            </Box> 
          </Box> : null
        }
      </Box>
      <Box>
        {
          showOtp ? null : 
          <Box>
            {
              showSignIn ?
              <Box p={2}>
                <h2>Login</h2>
                <Box>   
                  <form onSubmit={handleSubmit(loginUser)} key={1}>
                  <Box mb={3}>
                      <TextField
                        placeholder="Enter your mobile number"
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        autoComplete='off'
                        type="number"
                        name="mobileNo"
                        {...register("mobileNo", {
                          required: "Required field",
                          pattern: {
                            value: /^[7896]\d{9}$/,
                            message: "Invalid mobile number",
                          },
                        })}
                        error={Boolean(errors?.mobileNo)}
                        helperText={errors?.mobileNo?.message}
                      />
                    </Box>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Log In 
                    </Button>
                  </form>
                  <Box onClick={switchLogin} sx={{textAlign:'center', marginTop:'35px'}}>
                    <Button variant='outlined'>Create Account</Button>
                  </Box>
                </Box>  
              </Box> 
              : 
              <Box p={2}>
                <h2>Sign Up</h2>
                <form onSubmit={signupUser(signUpNewUser)} key={2}>
                  <Box mb={3}>
                    <TextField
                      placeholder="Enter your full name"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      autoComplete='off'
                      name="firstName"
                      {...registerUser("firstName", {
                        required: "Required field"
                      })}
                      error={Boolean(errorSignup?.firstName)}
                      helperText={errorSignup?.firstName?.message}
                    />
                  </Box>

                  <Box mb={3}>
                    <TextField
                      placeholder="Enter your mobile number"
                      label="Mobile Number"
                      variant="outlined"
                      fullWidth
                      autoComplete='off'
                      type="number"
                      name="mobileNo"
                      {...registerUser("mobileNo", {
                        required: "Required field",
                        pattern: {
                          value: /^[7896]\d{9}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                      error={Boolean(errorSignup?.mobileNo)}
                      helperText={errorSignup?.mobileNo?.message}
                    />
                  </Box>

                  {/* <Box mb={3}>
                    <TextField
                      placeholder="Enter your email"
                      label="Email ID"
                      variant="outlined"
                      fullWidth
                      autoComplete='off'
                      name="emailId"
                      {...registerUser("emailId", {
                        required: "Required field",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      error={Boolean(errorSignup?.emailId)}
                      helperText={errorSignup?.emailId?.message}
                    />
                  </Box> */}

                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Sign Up 
                  </Button>
                </form>
                    
                <Box onClick={switchLogin} sx={{textAlign:'center', marginTop:'35px'}}>
                  <Button variant='outlined'>Login</Button>
                </Box>
              </Box>
            }
          </Box>
        }
      </Box>
    </Box>
  )
}

export default Authentication
