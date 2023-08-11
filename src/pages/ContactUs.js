import { Box, Card } from '@mui/material'
import React, { useContext } from 'react'
import IconAddress from '../assets/ic-address.png'
import IconEmail from '../assets/ic-email.png'
import IconPhone from '../assets/ic-phone.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useForm } from "react-hook-form";
import { TextField, Button } from '@mui/material'
import { btnCurvedStyle, newCustomerEnquiry } from '../services/api'
import { styled } from "@mui/material/styles";
import { CommonContext } from '../contexts/CommonContext'
import NavHeader from '../components/NavHeader'

const styles = {
  itemBox : {
    display:'flex',
    marginBottom:'20px',
    opacity:'0.6'
  },
  icImg : {
    width:'20px',
    marginRight:'20px'
  },
  muIcon : {
    color:'#a4243d', 
    fontSize:'40px', 
    marginRight:'15px'
  },
  formCont : {
    display:'flex', 
    marginBottom:'20px',
    flexDirection:'column'
  },
  formContDesk : {
    display:'flex', 
    marginBottom:'20px'
  }
}

const StyledTextField = styled(TextField)({
  "& label": {
    color: "white"
  },
  "&:hover label": {
    fontWeight: 700
  },
  "& label.Mui-focused": {
    color: "white"
  },
  "& .MuiInput-underline" : {
    borderBottomColor: "white"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "white",
      borderWidth: 2
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    }
  }
});

function ContactUs() {

  const { register : registerUser, handleSubmit : signupUser, reset : resetSignup, formState : {errors:errorSignup} } = useForm()
  const { isDesktop, showLoader, hideLoader, showAlert } = useContext(CommonContext)

  const signUpNewUser = (data) => {
    
    showLoader()
    newCustomerEnquiry((data)).then((response) => {
      showAlert("Enquiry sent successfully !")
      resetSignup()
      hideLoader()
    }).catch((error) => {
      showAlert("Failed to send query")
      hideLoader()
    })
  }

  return (
    <Box sx={{padding:'4vw', marginTop:'5vh', background:'#fff0d9', display:'flex', flexDirection: isDesktop ? 'row' : 'column'}}>

      <NavHeader />
      <Box sx={{borderRadius:'5px', border:'1px solid #a4243d', position:'relative !important', left: isDesktop ? '50px' : '0px',
              background:'#fff0d9', padding:'20px', maxWidth: isDesktop ? '300px' : 'auto', height:'fit-content', marginTop:'30px'}}>
        <Box sx={{marginBottom:'20px'}}>
          Contact Us
        </Box>
        <Box style={styles.itemBox}>
          <Box>
            <img src={IconAddress} style={styles.icImg}/>
          </Box>
          <Box>
            Country Chicken Co. PVT LTD, 5th floor, Sreenidhi Grand Building, Kavuri Hills Phase-1, Madhapur, Hyderabad, Telangana 500081
          </Box>
        </Box>
        <Box style={styles.itemBox}>
          <Box>
            <img src={IconEmail} style={styles.icImg}/>
          </Box>
          <Box>
            contactus@countrychickenco.in 
          </Box>
        </Box>
        <Box style={styles.itemBox}>
          <Box>
            <img src={IconPhone} style={styles.icImg}/>
          </Box>
          <Box>
            +91 8096110961
          </Box>
        </Box>
        <Box sx={{marginTop:'100px'}}>
          <FacebookIcon style={styles.muIcon} />
          <InstagramIcon style={styles.muIcon}/>
          <LinkedInIcon style={styles.muIcon}/>
        </Box>
      </Box>

      <Box sx={{background:'#a4243d', width: isDesktop ? '600px' : 'auto', padding: isDesktop ? '70px' : '20px', borderRadius:'5px', color:'#fff0d9'}}>
          <Box>
            Send a message
          </Box>
          <Box p={2}>
                <form onSubmit={signupUser(signUpNewUser)} key={2}>

              <Box style={ isDesktop ? styles.formContDesk : styles.formCont}>
              <StyledTextField 
                  placeholder="Enter your first name"
                  label="First Name"
                  {...registerUser("firstName", {
                    required: "Required field"
                  })}
                  error={Boolean(errorSignup?.firstName)}
                  helperText={errorSignup?.firstName?.message}
                  sx={{marginRight: isDesktop ? '40px' : 0, marginBottom:'20px'}}
                  inputProps={{ style: { color: '#fff0d9' } }}
                  variant="standard" focused/>

                  <StyledTextField 
                  placeholder="Enter your last name"
                  label="Last Name"
                  {...registerUser("lastName", {
                    required: "Required field"
                  })}
                  error={Boolean(errorSignup?.lastName)}
                  helperText={errorSignup?.lastName?.message}
                  inputProps={{ style: { color: '#fff0d9' } }}
                  variant="standard" focused/>
              </Box>

              <Box style={ isDesktop ? styles.formContDesk : styles.formCont}>

              <StyledTextField 
                  placeholder="Enter your email"
                  label="Email Address"
                  {...registerUser("emailId", {
                    required: "Required field",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={Boolean(errorSignup?.emailId)}
                  helperText={errorSignup?.emailId?.message}
                  sx={{marginRight: isDesktop ? '40px' : 0, marginBottom:'20px'}}
                  inputProps={{ style: { color: '#fff0d9' } }}
                  variant="standard" focused/>

                  <StyledTextField 
                  placeholder="Enter your mobile number"
                  label="Mobile Number"
                  {...registerUser("mobileNo", {
                    required: "Required field",
                    pattern: {
                      value: /^[7896]\d{9}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  error={Boolean(errorSignup?.mobileNo)}
                  helperText={errorSignup?.mobileNo?.message}
                  inputProps={{ style: { color: '#fff0d9' } }}
                  variant="standard" focused/>
              </Box>

              <Box style={ isDesktop ? styles.formContDesk : styles.formCont}>
                  <StyledTextField 
                    rows={3}
                    fullWidth
                  placeholder="Enter your message"
                  label="Write your message here"
                  {...registerUser("userMsg", {
                    required: "Required field"
                  })}
                  error={Boolean(errorSignup?.userMsg)}
                  helperText={errorSignup?.userMsg?.message}
                  inputProps={{ style: { color: '#fff0d9' } }}
                  variant="standard" focused/>
              </Box>

                  <Button type="submit" variant="contained" sx={btnCurvedStyle} color="primary">
                    Send
                  </Button>
                </form>
              </Box>
      </Box>

    </Box>
  )
}

export default ContactUs