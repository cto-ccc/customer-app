import React from 'react'
import Box from '@mui/material/Box';

const styles = {
  cartCont : {
    display : 'flex',
    padding:'20px',
    alignItems:'center'
  },
  shadowBox : {
    background : 'white',
    boxShadow : '0px 0px 10px 0px #eaeaea'
  }
}

function ItemsSummary(props) {

  return (
    <Box style={styles.shadowBox}> 
      {
          Object.keys(props.itemDetails).map((item, index) => {
            return <Box key={index} >{
              item == 'totalCount' || item == 'totalAmount' || item == 'totalDiscount' ? 
              null : 
              <Box key={index} style={styles.cartCont} 
                sx={{borderBottom: index != (Object.keys(props.itemDetails).length - 3) ? '1px solid #eaeaea' :  null}}>
                <Box sx={{width:'70%'}}>
                  {props.itemDetails[item].name} ({props.itemDetails[item].qty})
                  {
                    props.itemDetails[item].extras ? 
                    <Box sx={{display:'flex', flexDirection:'column', textTransform:'capitalize', fontSize:'14px'}}>
                      <li> 
                        {props.itemDetails[item].extras.skinType == 'withskin' ? 'With Skin' : 'Skinless'}
                      </li>
                      <li> 
                        {props.itemDetails[item].extras.flavourType} Flavour
                      </li>
                      <li> 
                        {props.itemDetails[item].extras.cutType} Cut
                      </li>
                    </Box> : null
                  }
                </Box>
                
                <Box sx={{width:'10%'}}>
                  x {props.itemDetails[item].count}
                </Box>
                <Box sx={{width:'20%', textAlign:'center'}}>
                  ₹ {props.itemDetails[item].price * props.itemDetails[item].count}
                </Box>
              </Box>
            }
            </Box>
          })
        }
    </Box>
  )
}

export default ItemsSummary