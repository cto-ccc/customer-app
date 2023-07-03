import { useContext, useEffect, useState, useCallback } from 'react'
import * as React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { getCustomizedProducts, getImgMap, getProductData, getRecepieVideos, logAction } from '../services/api';
import Grid from '@mui/material/Unstable_Grid2';
import { CommonContext } from '../contexts/CommonContext';
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer';
import { Helmet } from 'react-helmet';
import NavHeader from '../components/NavHeader';
import ComponentLoader from '../components/ComponentLoader';


const styles = {
  prodImg : {
    width:'100%',
    height:'300px',
    borderRadius:'5px',
    borderBottom:'1px solid #eaeaea'
  },
  productGridCont: {
    // margin:'20px'
    position:'relative'
  },
  productGridContDesk : {
    padding:'20px',
    position:'relative',
    background:'white',
    height:'min-content',
    margin:'10px'
  },
  subLabel: {
    fontWeight:'500'
  },
  activeExtra : {
    background : 'wheat',
    color:'#a4243d',
    borderRadius:'10px',
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
    alignItems:'baseline'
  },
  disabled : {
    opacity:'0.5',
    pointerEvents:'none'
  },
  incCont:{
    display:'flex',
    width:'30%'
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
}
function ItemDetail() {

  const location = useLocation()
  const {isDesktop, cartData, updateCart} = useContext(CommonContext)
  const { id }   = useParams()

  const [anchor, setAnchor] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [skinType, setSkinType] = useState('withskin')
  const [flavourType, setFlavourType] = useState('normal')
  const [cutType, setCutType] = useState('medium')
  const [productData, setProductData] = useState({})
  const [loading, setLoading] = useState(true)


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

  const addItemFromExtras = () => {
    let activeItem = selectedItem
    activeItem.extras = {
      skinType    : skinType,
      flavourType : flavourType,
      cutType     : cutType
    }
    updateCart(activeItem, true)
    setSelectedItem(null)
    setSkinType('withskin')
    setFlavourType('normal')
    setCutType('medium')
    setAnchor(false)
  }

  const getProductDetails = async() => {
    const resp = await getProductData({id : id})
    setProductData(resp)
    setLoading(false)
  }

  const list = (anchor) => (
    <Box sx={{padding:'4vw'}}>
      <Box sx={{fontSize:'20px', fontWeight:'600', mb:2}}>
        Customize your order
      </Box>
      <Box sx={{display:'flex', flexDirection:'column'}}>
        <Box>
          Chicken Type
        </Box>
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
      </Box>

      <Box sx={{display:'flex', flexDirection:'column'}}
        style={skinType == 'withskin' ? null : styles.disabled}>
        <Box>
          Chicken Flavour
        </Box>
        <Box sx={{display:'flex', padding:'15px 0 20px 0', borderBottom:'1px solid #eaeaea', mb:3}}>
          <Box style={flavourType == 'normal' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setFlavourType('normal')}>
            Normal
          </Box>
          <Box sx={{mr:3}} style={flavourType == 'smoketurmeric' ? styles.activeExtra : styles.inactiveExtra}
            onClick={() => setFlavourType('smoketurmeric')}>
            Smoked & Turmeric <Box sx={{fontSize:'12px', marginLeft:'5px'}}>(+ ₹15/-)</Box>
          </Box>
       </Box>
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

      <Box sx={{mt:3, display:'flex', justifyContent:'flex-end'}}>
        <Button variant='contained'
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
    <Box sx={{padding:'4vw', marginTop:'5vh'}}>
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
              <Box sx={styles.discountCont}>
                {Math.trunc(((productData.mrp - productData.price) / productData.mrp) * 100)}% Off
              </Box>
            <img src={getImgMap()[productData.imgUrl]} style={styles.prodImg}/>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} style={isDesktop ? styles.productGridContDesk : styles.productGridCont}>
            <Box sx={{fontSize:'20px', fontWeight:'600', mt:2, mb:1, color:'#a4243d'}}>
              {productData.name} {productData.style ? `(${productData.style})` : null}
            </Box>
            {/* <Box sx={{mb:1}}>
              {productData.style ? `(${productData.style})` : null}
            </Box> */}
            <Box sx={{fontSize:'17px', mb:1}}>
              {productData.qty}
            </Box>
            <Box sx={{display:'flex',alignItems:'baseline',  mb:1}}>
              <Box sx={{fontSize:'20px', mr:1, color:'#a4243d'}}>
                ₹ {productData.price} 
              </Box>
              <Box sx={{fontSize:'15px'}}>
                <s>₹ {productData.mrp}</s> 
              </Box>
              <Box sx={{fontSize:'13px', marginLeft:'5px'}}>
                ({Math.trunc(((productData.mrp - productData.price) / productData.mrp) * 100)}% Off)
              </Box>
            </Box>
            <Box mb={2} mt={1}>
            {
                      cartData && cartData[productData.id] && cartData[productData.id].count ?
                      <Box style={styles.incCont}>
                        <Box sx={{border:'1px solid #dddddd', 
                                  display:'flex', 
                                  borderRadius:'5px', 
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
                      </Box> : 
                      <Box>
                        {
                          productData.stockQty == 0 ? 
                            <Button variant='outlined' sx={{width: isDesktop ? '50%' : '100%', opacity:'0.6'}} disabled>
                              Out of stock
                            </Button> :
                            <Button sx={{width: isDesktop ? '50%' : '100%'}} variant='contained'
                              onClick={() => addToCart(productData)}>Add To Cart</Button>
                        }
                        
                      </Box>
                    }
        
            </Box>
            {
             productData.aka ?
             <Box sx={{display:'flex'}}>
                <Box style={styles.subLabel} sx={{width:'100px'}}>Aka</Box>
                <Box sx={{width:'15px'}}>:</Box>
                <Box style={styles.subValue} sx={{width:'250px'}}>{productData.aka}</Box> 
              </Box> : null
            }
            {
             productData.preferredBy ?
             <Box sx={{display:'flex', marginTop:'5px'}}>
                <Box style={styles.subLabel} sx={{width:'100px'}}>Preferred By</Box>
                <Box sx={{width:'15px'}}>:</Box>
                <Box style={styles.subValue}>{productData.preferredBy}</Box> 
              </Box> : null
            }
            {
             productData.age ?
             <Box sx={{display:'flex', marginTop:'5px'}}>
                <Box style={styles.subLabel} sx={{width:'100px'}}>Age</Box>
                <Box sx={{width:'15px'}}>:</Box>
                <Box style={styles.subValue}>{productData.age}</Box> 
              </Box> : null
            }
            {
             productData.dishes ?
             <Box sx={{display:'flex', flexDirection:'column', marginTop:'10px'}}>
                <Box style={styles.subLabel}>Suggested Dishes:</Box>
                <Box style={styles.subValue}> {productData.dishes}</Box> 
              </Box> : null
            }
            {
             productData.healthBenefits ?
             <Box sx={{display:'flex', flexDirection:'column', marginTop:'10px'}}>
                <Box style={styles.subLabel}>Health Benefits :</Box>
                <Box style={styles.subValue}> {productData.healthBenefits}</Box> 
              </Box> : null
            }

            <Box sx={{whiteSpace:'pre-line', textAlign:'justify', wordBreak:'break-word', marginTop:'10px'}}>
              {productData?.description}
            </Box>
          </Grid>
        {/* </Box> */}
      </Grid>

        </>
      }
      


      {
        isDesktop ? 
        <Box>
          <Box sx={{fontSize:'25px', marginTop:'20px', marginBottom:'0px', marginLeft:'10px', color:'#a4243d'}}>
            Recipie Videos
          </Box>
          <Grid container>
            {
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
            }
          </Grid>
        </Box> : null
      }


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