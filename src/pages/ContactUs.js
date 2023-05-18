import { Box, Card } from '@mui/material'
import React from 'react'

function ContactUs() {
  return (
    <Box sx={{padding:'4vw', maxWidth:'600px', marginTop:'5vh'}}>
      <h1>Contact Us</h1>

      <Card sx={{padding:'10px', margin:'10px 0', display:'flex', flexDirection:'column'}}>
        <Box>
          <h2>COUNTRY CHICKEN CO CORPORATE OFFICE</h2>
        </Box>
        <Box sx={{fontWeight:'bold'}}>
          Address :
        </Box>
        <Box>
          Country Chicken pvt ltd, 5th floor, sreenidhi grand building kavuri hills phase-1, madhapur, Hyderabad, Telangana 500081
        </Box>
        <Box sx={{mt:1, fontWeight:'bold'}}>
          Mobile No : 
        </Box>
        <Box>
          +91- 07995550286
        </Box>
      </Card>

      <Card sx={{padding:'10px', margin:'10px 0', display:'flex', flexDirection:'column'}}>
        <Box>
          <h2>COUNTRY CHICKEN CO. FARM OUTLET - KPHB (GOKUL PLOTS)</h2>
        </Box>
        <Box sx={{fontWeight:'bold'}}>
          Address :
        </Box>
        <Box>
          plot no : 324,vijayan residency,venkatramana colony,Gokul Plot, Kukatpally Housing Board Colony, Hyderabad, Telangana 500072
        </Box>
        <Box sx={{mt:1, fontWeight:'bold'}}>
          Mobile No : 
        </Box>
        <Box>
          +91- 8096110961
        </Box>
      </Card>

      <Card sx={{padding:'10px', margin:'10px 0', display:'flex', flexDirection:'column'}}>
        <Box>
          <h2>COUNTRY CHICKEN CO FARM OUTLET</h2>
        </Box>
        <Box sx={{fontWeight:'bold'}}>
          Address :
        </Box>
        <Box>
          Shop No - G2, Plot No: 1361, Lakshmi Nilayam Pragathi Nagar, beside Bhasyam School, Kukatpally, Hyderabad, Telangana 500090
        </Box>
        <Box sx={{mt:1, fontWeight:'bold'}}>
          Mobile No : 
        </Box>
        <Box>
          +91- 8096110961
        </Box>
      </Card>
    </Box>
  )
}

export default ContactUs