import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CommonContext } from '../contexts/CommonContext';
import { useLocation } from 'react-router-dom';
import { getImgMap } from '../services/api';

const styles = {
  cartCont : {
    display : 'flex',
    padding:'10px'
  },
  shadowBox : {
    background : 'white',
    boxShadow : '0px 0px 10px 0px #eaeaea'
  },
  cartImg : {
    width : '230px',
    height : '150px'
  }
}

function ItemsSummary(props) {

  const { updateCart, isDesktop } = useContext(CommonContext)
  const location = useLocation()
  const [itemDetails, setItemDetails] = useState({})

  useEffect(() => {
    setItemDetails(props.itemDetails)
  }, [])

  return (
        <Box sx={{background:'#FFF5E8', boxShadow:'0px 0px 15px rgba(0, 0, 0, 0.15)', borderRadius:'5px'}}>
          {
            Object.keys(itemDetails).map((item, index) => {
              return <Box key={index}>{
                item == 'totalCount' || item == 'totalAmount' || item == 'totalDiscount' || item == 'bogoDiscount' ? 
                null : 
                <Box key={index} style={styles.cartCont} sx={{flexDirection: isDesktop ? 'row' : 'column'}}>
                  
                  {
                    isDesktop ? 
                    <Box>
                      <img src={getImgMap()[props.itemDetails[item].imgUrl]} style={styles.cartImg}/>
                    </Box> : null
                  }
                  
                  <Box sx={{width:'100%'}}>
                  <Box sx={{fontSize:'15px', fontWeight:'600', display:'flex', marginBottom:'3px', alignItems:'center'}}>

                    <Box sx={{width:'55%'}}>
                      {props.itemDetails[item].name}
                    </Box>
                    
                    <Box sx={{display:'flex', width:'45%', alignItems:'center', justifyContent:'space-between', color:'#a4243d'}}>
                      
                      <Box sx={{display:'flex', alignItems:'center'}}>
                        <Box sx={{display:'flex', alignItems:'center',fontSize:'16px',background:'white', 
                                  boxShadow:'0px 0px 4px 0px rgba(0, 0, 0, 0.10)', padding:'4px', border : '1px solid #e1dfdf'}}>

                          {
                            location.pathname == '/cart' ? 
                            <Box sx={{ padding:'0 7px', cursor:'pointer', }}
                              onClick={() => updateCart(props.itemDetails[item], false)}>
                              -
                            </Box> : null
                          }
                          
                          <Box sx={{padding:'0px 9px'}}>
                            {props.itemDetails[item].count}
                          </Box>

                          {
                            location.pathname == '/cart' ?
                            <Box sx={{padding:'0 7px', cursor:'pointer'}}
                              onClick={() => updateCart(props.itemDetails[item], true)}>
                              +
                            </Box> : null
                          }
                        
                        </Box>
                      </Box>

                      <Box sx={{color:'black'}}>
                        {
                          props.itemDetails[item].enableBogo ? null :
                          <Box sx={{fontSize:'8px', textAlign:'right', opacity:'0.4'}}> <s>₹{(props.itemDetails[item].mrp * props.itemDetails[item].count)}</s></Box>
                        }
                        ₹ {(props.itemDetails[item].price * props.itemDetails[item].count)}                         
                      </Box>
                          
                    </Box>

                  </Box>

                  {
                    props.itemDetails[item].extras ?
                    <Box sx={{display:'flex', flexDirection:'column', color:'#a4243d'}}>

                      <Box sx={{display:'flex'}}>
                        <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'11px'}}>
                          {props.itemDetails[item].extras.skinType == 'withskin' ? 'With Skin' : 'Skinless'}
                        </Box>
                        <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'11px', textTransform:'capitalize'}}>
                          {props.itemDetails[item].extras.cutType || null} Cut
                        </Box>
                        <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'11px', textTransform:'capitalize'}}>
                          {props.itemDetails[item].extras.boneType == 'withBones' ? 'With Bone' : 'Boneless'} 
                        </Box>
                      </Box>
                      
                        { 
                          props.itemDetails[item].extras.flavourType == 'normal' ? null : 
                          <Box sx={{padding:'2px 5px', margin:'5px', border:'1px solid #a4243d', fontSize:'11px', width:'fit-content'}}>
                            Smoked & Turmeric 
                          </Box>
                        }
                                        
                    </Box> : null
                  }

                  {props.itemDetails[item].extras ? <>
                  <Accordion>
                    <AccordionSummary>
                      <Box sx={{display:'flex', justifyContent:'space-between', fontSize:'11px', margin:'5px', width:'100%'}}>
                        <Box>
                          Live Weight:1.5kg | Meat Weight: 1kg
                        </Box>
                        <Box sx={{display:'flex', alignItems:'end'}}>
                          Expand <KeyboardArrowDownIcon sx={{fontSize:'12px'}}/>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{display:'flex', justifyContent:'space-between', fontSize:'11px', marginTop:'5px', opacity:'0.5',
                                borderTop:'1px dotted black', paddingTop:'10px'}}>
                        <Box>
                          Item Price
                        </Box>
                        <Box>
                          ₹{props.itemDetails[item].price - 
                          (props.itemDetails[item].extras?.flavourType == 'normal' ? 0 : 15) - 
                          (props.itemDetails[item].extras?.skinType == 'withskin' ? 0 : 100) }
                        </Box>
                      </Box>
                                              
                      { 
                        props.itemDetails[item].extras?.flavourType == 'normal' ? null : 
                        <Box sx={{display:'flex', justifyContent:'space-between', fontSize:'11px', marginTop:'5px', opacity:'0.5'}}>
                          <Box>
                            Smoked & Turmeric 
                          </Box>
                          <Box>
                            ₹15
                          </Box>
                        </Box>
                      }

                      <Box sx={{display:'flex', justifyContent:'space-between', fontSize:'11px', marginTop:'5px', opacity:'0.5'}}>
                        <Box>
                          {props.itemDetails[item].extras?.skinType == 'withskin' ? 'With Skin' : 'Skinless'}
                        </Box>
                        <Box>
                          ₹{props.itemDetails[item].extras?.skinType == 'withskin' ? '0' : '100'}
                        </Box>
                      </Box>

                      <Box sx={{display:'flex', justifyContent:'space-between', fontSize:'11px', marginTop:'5px', opacity:'0.5'}}>
                        <Box>
                          Total
                        </Box>
                        <Box>
                          ₹{
                            props.itemDetails[item].price 
                          }
                        </Box>
                      </Box>

                    </AccordionDetails>
                  </Accordion>
                  </>:  null
                  }

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