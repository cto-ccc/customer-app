import { useContext, useEffect, useState, useCallback } from 'react'
import * as React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { getAllRecipiesData, getCustomizedProducts, getImgMap, getProductData, getRecepieVideos, logAction } from '../services/api';
import Grid from '@mui/material/Unstable_Grid2';
import { CommonContext } from '../contexts/CommonContext';
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';
import { Helmet } from 'react-helmet';
import NavHeader from '../components/NavHeader';
import ComponentLoader from '../components/ComponentLoader';
import { Checkbox } from '@mui/material';
import { Capacitor } from '@capacitor/core';
import Recipeies from './Recipies';


const styles = {
  prodImg : {
    width:'100%',
    height:'250px'
  },
  productGridCont: {
    // margin:'20px'
    position:'relative'
  },
  productGridContDesk : {
    padding:'20px',
    position:'relative',
    height:'min-content',
    margin:'10px'
  },
  activeExtra : {
    background : '#F47F13',
    color:'white',
    borderRadius:'5px',
    padding:'7px 15px',
    cursor:'pointer',
    boxShadow:'1px 1px 5px 3px #eaeaea',
    display:'flex',
    alignItems:'baseline'
  },
  inactiveExtra : {
    padding:'8px 15px',
    cursor:'pointer',
    display:'flex',
    alignItems:'baseline',
    borderRadius:'5px'
  },
  disabled : {
    opacity:'0.5',
    pointerEvents:'none'
  },
  incCont:{
    display:'flex',
    // width:'30%'
  },
  videoItem : {
    padding:'10px'
  },
  discountCont : {
    background:'#a4243d',
    color:'white',
    top:'20px',
    fontSize:'13px',
    boxShadow:'0 0 5px -1px white',
    padding:'5px 8px',
    width:'min-content',
    position:'absolute',
    width:'auto',
    borderRadius:'0 3px 3px 0'
  },
  priceCard : {
    display:'flex',
    // background:'#FFF5E8', 
    // boxShadow:'0px 0px 5px 0px rgba(0, 0, 0, 0.15)', 
    padding:'5px', 
    margin:'20px 0 0 0', 
    border:'1px solid black',
    borderRadius:'5px',
    fontSize:'14px',
    flexDirection:'column',
    // width:'100%'
  },
  productItem : {
    margin:'10px',
    background:'#a4243d',
    borderRadius:'5px',
    boxShadow:'0px 0px 5px 2px #eaeaea',
    width:'250px',
    fontFamily:'Foregen',
    display:'flex',
    flexDirection:'column',
    width:'80%',
    alignItems:'center',
    cursor:'pointer'
  },
  recImg : {
    height:'200px',
    width:'150px',
    borderRadius:'5px',
    // width:'100%'
  }
}
function ItemDetail() {

  const navigate = useNavigate()
  const {isDesktop, cartData, updateCart, showPopup} = useContext(CommonContext)
  const { id }   = useParams()

  const [anchor, setAnchor] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [skinType, setSkinType] = useState('withskin')
  const [flavourType, setFlavourType] = useState('normal')
  const [boneType, setBoneType] = useState('withBones')
  const [cutType, setCutType] = useState('medium')
  const [productData, setProductData] = useState({})
  const [loading, setLoading] = useState(true)
  const [recipieData, setRecipieData] = useState([])

  const [bogoApplied, setBogoApplied] = useState(false)


  async function addToCart(item) {
    if (getCustomizedProducts().includes(item.id)) {
      setAnchor(true)
      setSelectedItem(item)
    } else {
      updateCart(item, true)
    }
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setAnchor(open)
  }

  const modifySkinType = (type) => {
    setSkinType(type)
    if (type == 'skinless') {
      setFlavourType('normal')
    }
  }

  const modifyBoneType = (type) => {
    setBoneType(type)
  }

  const addItemFromExtras = () => {
    let activeItem = selectedItem
    activeItem.extras = {
      skinType    : skinType,
      flavourType : flavourType,
      cutType     : cutType,
      boneType    : boneType
    }
    updateCart(activeItem, true)
    setSelectedItem(null)
    setSkinType('withskin')
    setFlavourType('normal')
    setCutType('medium')
    setAnchor(false)
    if (activeItem.enableBogo) handleBogoApplied(true)
  }

  const getProductDetails = async() => {
    const resp = await getProductData({id : id})
    setProductData(resp)
    if (cartData && cartData[resp.id]?.count && cartData[resp.id]?.enableBogo) 
      setBogoApplied(true)
    setLoading(false)
    getRecipiesData()
  }

  const getRecipiesData = async() => {
    const resp = await getAllRecipiesData()
    setRecipieData(resp.recipies)
  }

  const handleBogoApplied = (status) => {
    setBogoApplied(status)
    if (status && !bogoApplied)
      showPopup(<>
        <Box sx={{color:'#a4243d', display:'flex', textAlign:'center', padding:'10px 20px'}}>
          <Box>
            You just got  
            <Box sx={{fontWeight:'bold', fontSize:'30px'}}>1kg FREE Country Chicken ! </Box>       
          </Box>
        </Box>
        <Box sx={{textAlign:'center', margin:'20px 0'}}>
          You have saved ₹{productData.price}
        </Box>
      </>)
  }

  const list = (anchor) => (
    <Box sx={{padding:'4vw'}}>
      <Box sx={{fontSize:'15px', fontWeight:'600', mb:2, color:'#a4243d', borderBottom:'1px solid #eaeaea'}}>
        Customize your order
      </Box>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Box>
          Chicken Type
        </Box>
        {
          selectedItem?.skinType ? 
          <>
            <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3}}>
              <Box sx={{mr:3}} style={skinType == 'withskin' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifySkinType('withskin')}>
                With Skin 
              </Box>
              <Box style={skinType == 'skinless' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifySkinType('skinless')}>
                Skinless <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹100/-)</Box>  
              </Box>
            </Box>
          </> : null
        }
        {
          selectedItem?.boneType ? 
          <>
            <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3}}>
              <Box sx={{mr:3}} style={boneType == 'withBones' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifyBoneType('withBones')}>
                With Bone
              </Box>
              <Box style={boneType == 'boneless' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => modifyBoneType('boneless')}>
                Boneless <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹300/-)</Box>  
              </Box>
          </Box>
          </>
          : null
        }
        {
          selectedItem?.flavourType ? 
          <>
          <Box sx={{display:'flex', flexDirection:'column'}}
            style={skinType == 'withskin' ? null : styles.disabled}>
            <Box>
              Chicken Flavour
            </Box>
            <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3, alignItems:'center'}}>
              <Box style={flavourType == 'normal' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => setFlavourType('normal')}>
                Normal
              </Box>
              <Box sx={{display:'flex', alignItems:'center'}} style={flavourType == 'smoketurmeric' ? styles.activeExtra : styles.inactiveExtra}
                onClick={() => setFlavourType('smoketurmeric')}>
                Smoked & Turmeric <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹15/-)</Box>  
              </Box>
          </Box>
          </Box>
          </> : null
        } 
      </Box>

      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Box>
          Pieces Cut
        </Box>
        <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:4}}>
          <Box sx={{mr:3}} style={cutType == 'small' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setCutType('small')}>
            Small
          </Box>
          <Box style={cutType == 'medium' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setCutType('medium')}>
            Medium
          </Box>
          <Box style={cutType == 'biryani' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setCutType('biryani')}>
            Biryani Cut
          </Box>
       </Box>
        
      </Box>

      <Box sx={{mb:2, display:'flex', justifyContent:'flex-end'}}>
        <Button variant='contained' fullWidth
          onClick={() => addItemFromExtras()}>
          Add Item
        </Button>
      </Box>

    </Box>
  )

  useEffect(() => {
    // logAction('PAGE_VIEW', `${productData.name.split(' ').join('-')}`)
    getProductDetails()
  }, [])
  return (
    <Box sx={{padding: '4vw', marginTop:'7vh'}}>
      {
        loading ? 
        <ComponentLoader /> : 
        <>
          <Helmet>
          <title>{productData.name}</title>
          <meta name='description' content={productData.description} />
          </Helmet>
          <NavHeader />
          <Grid container>
        {/* <Box sx={{padding:'10px', border:'1px solid #eaeaea', boxShadow:'0 0 5px 5px #eaeaea'}}> */}
          <Grid xs={12} sm={12} md={5} lg={5} style={isDesktop ? styles.productGridContDesk : styles.productGridCont}>
              {/* <Box sx={styles.discountCont}>
                {Math.trunc(((productData.mrp - productData.price) / productData.mrp) * 100)}% Off
              </Box> */}
            <img src={getImgMap()[productData.imgUrl]} style={styles.prodImg}/>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} style={isDesktop ? styles.productGridContDesk : styles.productGridCont}>
            <Box sx={{fontSize:'30px', mt:2, color:'#a4243d', fontFamily:'Foregen'}}>
              {productData.name} 
            </Box>
            <Box sx={{mb:2, color:'#404040', fontWeight:'700'}}>
              {productData.style ? `(${productData.style})` : null}
            </Box>
            {/* <Box sx={{fontSize:'17px', mb:1}}>
              {productData.qty}
            </Box> */}

            {
              productData.livePrice ? null : 
              <Box sx={{display:'flex',alignItems:'baseline',  mb:1, borderBottom:'1px solid #afa5a5', paddingBottom:'15px'}}>
                <Box sx={{fontSize:'15px', mr:1}}>
                  <s>₹ {productData.mrp}</s> 
                </Box>
                <Box sx={{fontSize:'25px', mr:1, fontWeight:'bold', display:'flex', alignItems:'baseline'}}>
                  ₹ {productData.price} 
                  <Box sx={{fontSize:'13px', fontWeight:'100', marginLeft:'2px'}}>
                    /{productData.qty}
                  </Box>
                </Box>             
                <Box sx={{fontSize:'15px', marginLeft:'5px', color:'#f47f13'}}>
                  {Math.trunc(((productData.mrp - productData.price) / productData.mrp) * 100)}% Off
                </Box>
              </Box>
            }

          
            {
             productData.aka ?
             <Box sx={{display:'flex', fontSize:'14px', color:'#404040'}}>
                <Box>Aka :</Box>
                <Box sx={{width:'250px'}}>&nbsp;{productData.aka}</Box> 
              </Box> : null
            }
            {
             productData.preferredBy ?
             <Box sx={{display:'flex', marginTop:'2px', fontSize:'14px',  color:'#404040'}}>
                <Box>Preferred By :</Box>
                <Box>&nbsp;{productData.preferredBy}</Box> 
              </Box> : null
            }
            {
             productData.age ?
             <Box sx={{display:'flex', marginTop:'2px', fontSize:'14px', color:'#404040'}}>
                <Box>Age :</Box>
                <Box>&nbsp;{productData.age}</Box> 
              </Box> : null
            }
            {
             productData.dishes ?
             <Box sx={{ marginTop:'2px', fontSize:'14px', color:'#404040'}}>
                Suggested Dishes : &nbsp;{productData.dishes}
              </Box> : null
            }
            {
             productData.healthBenefits ?
             <Box sx={{display:'flex', flexDirection:'column', marginTop:'10px'}}>
                <Box>Health Benefits :</Box>
                <Box>&nbsp;{productData.healthBenefits}</Box> 
              </Box> : null
            }

            {
              productData.livePrice ? 
              <>
                <Box sx={{display:'flex', borderTop:'1px solid #404040', paddingTop:'15px', margin:'10px 0 0 0', color:'#404040'}}>
                  <Box sx={{marginRight:'20px'}}>
                    Live Weight*: 1.5kg 
                  </Box>
                  <Box>
                    Meat Weight*: 1kg
                  </Box>
                </Box>
              </> : null
            }

            <Box sx={{display:'flex', flexDirection: 'column'}}>

              {
                productData.livePrice ? 
                <>
                <Box style={styles.priceCard} sx={{opacity:'0.3'}}>
                  
                  <Box sx={{display:'flex', alignItems:'center'}}>
                    <Box sx={{display:'flex', flexDirection:'column', width:'30%'}}>
                      <Box sx={{fontSize:'20px'}}>
                        Live Bird
                      </Box>
                      <Box sx={{marginRight:'10px'}}>
                        ₹{productData.livePrice}/Kg
                      </Box>
                    </Box>

                    <Box sx={{borderLeft:'1px solid black', padding : '0 10px', margin:'0 10px', width:'40%', textAlign:'center'}}>
                      <Box sx={{fontSize:'15px'}}>
                        AVAILABLE AT STORES
                      </Box>
                    </Box>

                    <Box sx={{display:'flex', flexDirection:'column', width:'30%'}}>
                      <Box sx={{fontSize:'20px', fontWeight:'bold'}}>
                        {/* ₹{productData.livePrice * 1.5}/kg */}
                      </Box>
                      <Box sx={{fontSize:'10px'}}>
                        {/* Available at stores */}
                      </Box>
                    </Box>
                  </Box>

              
                </Box>

                <Box style={styles.priceCard} sx={{ color:'#a4243d', borderColor:'#a4243d !important'}}>
                  <Box sx={{display:'flex', alignItems:'center'}}>
                    <Box sx={{display:'flex', flexDirection:'column', width:'30%'}}>
                      <Box sx={{fontSize:'20px'}}>
                        Meat
                      </Box>
                      <Box sx={{marginRight:'10px'}}>
                        ₹{productData.price}/Kg
                      </Box>
                    </Box>

                    <Box sx={{borderLeft:'1px solid #a4243d', borderRight:'1px solid #a4243d', padding : '0 10px', margin:'0 10px', width:'40%', textAlign:'center'}}>
                      <Box sx={{fontSize:'15px'}}>
                        Live Bird : 1.5Kg =
                      </Box>
                      <Box sx={{fontSize:'13px'}}>
                        1Kg Meat
                      </Box>
                    </Box>

                    <Box sx={{display:'flex', flexDirection:'column', width:'30%'}}>
                      <Box sx={{fontSize:'20px', fontWeight:'bold'}}>
                        ₹{productData.price}/kg
                      </Box>
                      <Box sx={{fontSize:'10px', color:'black', opacity:'0.3'}}>
                        Apply coupon and get 1kg meat FREE
                      </Box>
                    </Box>
                  </Box>
                </Box>
                </> : null
              }



                {
                  productData.enableBogo ? 
                  <>
                    <Box sx={{textAlign:'center'}} mt={2}>
                      { bogoApplied ? 'Enjoy 1kg FREE Meat' : 'Buy 1Kg Meat and get 1Kg Meat FREE'}
                    </Box>
                    <Box sx={{display:'flex', alignItems:'baseline', border:'1px solid #F47F13', borderRadius:'10px', 
                              justifyContent:'center', margin:'10px 0 0 0', background: bogoApplied ? '#F47F13' : null}}>
                      <Box>
                        <Checkbox  sx={{'&.Mui-checked': {color: bogoApplied ? 'white' : '#F47F13'}}}
                          checked={bogoApplied} onChange={(event) => handleBogoApplied(event.target.checked)}/>
                      </Box>
                      <Box sx={{color: bogoApplied ? 'white' : '#F47F13'}}>
                        {bogoApplied ? 'Coupon Applied' : 'Apply Coupon'} : BOGO
                      </Box>
                    </Box>
                  </> : null
                }

              <Box sx={{marginTop:'25px'}}>
            {
                      cartData && cartData[productData.id] && cartData[productData.id].count ?
                      <Box style={styles.incCont}>
                        <Box sx={{border:'1px solid #dddddd', 
                                  display:'flex', 
                                  borderRadius:'5px', 
                                  marginRight:'10px',
                                  background:'white', border:'1px solid #c3c3c3'}}>
                          <Box onClick={() => updateCart(productData, false)}
                            sx={{padding:'5px 10px 5px 10px', fontSize:'15px', cursor:'pointer'}}>
                            -
                          </Box>
                          <Box sx={{padding:'5px 10px', 
                                    borderRight:'1px solid #bababa', 
                                    borderLeft:'1px solid #bababa', fontSize:'15px',
                                    background:'#a4243d !important', color:'white'}}>
                            {cartData[productData.id].count}
                          </Box>
                          <Box  onClick={() => updateCart(productData, true)}
                            sx={{padding:'5px 10px 5px 10px', fontSize:'15px', cursor:'pointer'}}>
                            +
                          </Box>
                        </Box>
                     
                        <Button fullWidth variant='contained' 
                              onClick={() => navigate('/cart')}>View Cart</Button>
                      </Box> : 
                      <Box>
                        {
                          productData.stockQty == 0 ? 
                            <Button variant='outlined' fullWidth disabled>
                              Out of stock
                            </Button> :
                            <Button fullWidth variant='contained'
                              onClick={() => addToCart(productData)}>Add To Cart</Button>
                        }                        
                      </Box>
                    }
        
            </Box>

              {/* <Box style={styles.priceCard}>
                
                <Box sx={{display:'flex', marginBottom:'15px'}}>
                <Box sx={{display:'flex', borderRight:'1px solid #404040'}}>
                  <Box sx={{width:'min-content', marginRight:'15px'}}>
                    Live Weight
                  </Box>
                  <Box sx={{marginRight:'10px'}}>
                    1.5Kg
                  </Box>
                </Box>
                <Box sx={{display:'flex'}}>
                  <Box sx={{width:'min-content', marginLeft:'10px', marginRight:'15px'}}>
                    Meat Weight
                  </Box>
                  <Box>
                    0.9Kg
                  </Box>
                </Box>
                </Box>
 

                <Box sx={{color:'#a4243d', fontSize:'15px', marginBottom:'10px'}}>
                  Final Price - 1.5Kg x ₹299:₹449
                </Box>

                <Button variant='contained' fullWidth
                              onClick={() => addToCart(productData)}>Add To Cart</Button>
              </Box>
        

               */}

            </Box>
{/* 
            <Box sx={{whiteSpace:'pre-line', textAlign:'justify', wordBreak:'break-word', marginTop:'10px'}}>
              {productData?.description}
            </Box> */}
          </Grid>
        {/* </Box> */}
      </Grid>

        </>
      }
      


      {/* {
        isDesktop ?  */}
        <Box>
          <Box sx={{fontSize:'25px', marginTop:'30px', marginBottom:'0px', marginLeft:'10px', color:'#a4243d', fontFamily:'Foregen'}}>
            RECOMMENDED RECIPIES
          </Box>
            {/* {
              getRecepieVideos().map((video, index) => {
                return(
                <Grid xs={12} sm={12} md={3} lg={3}  key={index}>
                    <Box key={index} style={styles.videoItem}>
                      <div class="itemdet-recipie-iframe">
                        <iframe
                          src={video.url}>
                        </iframe>
                      </div>
                    </Box>
                  </Grid>
                )
              })
            } */}
            <Box sx={{display:'flex', width:'90vw', overflowX:'scroll'}}>
              {
                recipieData.map((recipie, index) => {
                  return(
                      <Box key={index} style={styles.productItem}
                          onClick={() => navigate(`/recipieDetails/${recipie.id}`)}>
                        
                          <img src={recipie.imgUrl} style={styles.recImg} />
                          <Box sx={{ padding:'10px 5px', color:'#FFF0D9', textAlign:'center', fontSize:'20px', width:'60%'}}>
                            {recipie.title}
                          </Box>
                          
                      </Box>
                  )
                })
              }
            </Box>
        </Box> 
      {/* } */}


      <React.Fragment key={'bottom'}>
        <Drawer
          anchor={isDesktop ? 'right' : 'bottom'}
          open={anchor}
          onClose={toggleDrawer(false)}
        >
          {list('bottom')}
        </Drawer>
      </React.Fragment>
    </Box>
  )
}

export default ItemDetail