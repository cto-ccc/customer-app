import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { useState, useContext, useEffect } from 'react';
import { CommonContext, CommonProvider } from '../contexts/CommonContext';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EggsLogo from '../assets/eggs.png'
import PicklesLogo from '../assets/pickle.png'

import MysoreQueen from '../assets/mysore-queen.png'
import Kadaknath from '../assets/kadaknath.png'
import Warrior from '../assets/warrior.png'
import TenderChicken from '../assets/tender-chicken.png'
import ComponentLoader from '../components/ComponentLoader';
import { getAllCategories, getCategoryData, getCustomizedProducts, getImgMap, getMetaData, logAction } from '../services/api';
import Drawer from '@mui/material/Drawer';
import {Helmet} from "react-helmet";
import NavHeader from '../components/NavHeader';



const styles = {
  productItem : {
    margin:'10px',
    width:'90%',
    background:'#FFF5E8',
    borderRadius:'5px',
    boxShadow:'0px 0px 15px 0px rgba(0, 0, 0, 0.15)'
  },
  productGridCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  productImg : {
    width:'100%',
    height:'180px',
    borderRadius:'5px 5px 0 0',
    borderRight:'1px solid #eaeaea',
    marginRight:'10px'
  },
  productDescCont : {
    padding:'15px',
    textAlign:'left',
    // background:'#ffebeb',
    // borderRadius:'25px 25px 20px 20px'
    borderTop:'1px solid #eaeaea',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around'
  },
  productDescContDesk : {
    padding:'15px',
    textAlign:'left',
    // background:'#ffebeb',
    // borderRadius:'25px 25px 20px 20px'
    borderTop:'1px solid #eaeaea',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    width:'60%'
  },
  incCont : {
    display : 'flex',
    justifyContent:'right',
    padding:'5px'
  },
  cartViewCont : {
    position : 'fixed',
    bottom:'2vh',
    boxShadow:'0px 0px 8px 0px #666666',
    width:'90vw',
    padding:'15px',
    background:'#a4243d',
    color:'white',
    borderRadius:'10px',
    display:'flex',
    justifyContent:'space-between'
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
  discountCont : {
    background:'#a4243d',
    color:'white',
    top:'10px',
    fontSize:'13px',
    boxShadow:'0 0 5px -1px white',
    padding:'5px 8px',
    width:'min-content',
    position:'absolute',
    width:'auto',
    right:'0',
    borderRadius:'0 3px 3px 0'
  },
  prodName : {
    textAlign:'left', 
    marginBottom:'2px', 
    fontWeight:'450', 
    fontSize:'25px',
    cursor:'pointer',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    color:'#a4243d',
    fontFamily:'Foregen',
    textTransform:'uppercase'
  },
  catBox : {
    padding:'5px', 
    border:'1px solid #a4243d', 
    padding:'5px 20px', 
    margin:'0 10px 25px 0', 
    fontSize:'12px',
    color:'#a4243d',
    cursor:'pointer',
    width:'fit-content',
    float:'left',
    borderRadius:'5px'
  },
  catBoxAct : {
    padding:'5px', 
    border:'1px solid #a4243d', 
    padding:'5px 20px', 
    margin:'0 10px 25px 0', 
    fontSize:'12px',
    color:'white',
    background:'#a4243d',
    cursor:'pointer',
    width:'fit-content',
    float:'left',
    borderRadius:'5px'
  }
}

function Categories() {

  const location = useLocation()
  const navigate = useNavigate()
  const { id }   = useParams()
  const {isDesktop, cartData, updateCart} = useContext(CommonContext)

  const [loading, setLoading] = useState(true)

  const [anchor, setAnchor] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [skinType, setSkinType] = useState('withskin')
  const [flavourType, setFlavourType] = useState('normal')
  const [cutType, setCutType] = useState('medium')
  const [boneType, setBoneType] = useState('withBones')


  const [title, setTitle] = useState('')
  const [categoryData, setCategoryData] = useState([])


  const [metaData, setMetaData] = useState(getMetaData())

  // async function addToCart(item) {
  //   if (getCustomizedProducts().includes(item.id)) {
  //     setAnchor(true)
  //     setSelectedItem(item)
  //   } else {
  //     updateCart(item, true)
  //   }
  // }

  const getProductData = async() => {
    const resp = await getCategoryData(id)
    setTitle(resp.title)
    setCategoryData(resp.data)
    setLoading(false)
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

      <Box sx={{mt:3, display:'flex', justifyContent:'flex-end'}}>
        <Button variant='contained'
          onClick={() => addItemFromExtras()}>
          Add Item
        </Button>
      </Box>

    </Box>
  )

  
  useEffect(() => {
    logAction('PAGE_VIEW', id)
    getProductData()
  }, [])

  return (
    <Box sx={{padding: isDesktop ? '4vw 10vw' : '4vw', marginTop:'7vh', paddingBottom:'8vh'}}>
      {
        loading ? 
        <ComponentLoader /> : 
        <Box sx={{display:'flex', flexDirection:'column'}}>
          <Helmet>
            <title>{metaData[id].title}</title>
            <meta name='description' content={metaData[id].description} />
            <meta name='keywords' content={metaData[id].keywords} />
          </Helmet>
          <NavHeader />
          <Box sx={{color:'#a4243d', fontSize:'40px', ml:'4vw',mb:1, fontWeight:'400', fontFamily:'Foregen'}}>
            ORDER NOW
          </Box>
          <Box sx={{display:'block', ml:'4vw'}}>
            {
              getAllCategories().map((category) => {
                return <Box style={category.id == id ? styles.catBoxAct : styles.catBox} key={category.id}
                
                onClick={() => navigate(`/categories/${category.id}`,  {replace:true})}>
                  {category.title}
                </Box>  
              })
            }
          </Box>
          <Grid container sx={{flexDirection:'column'}}>
            {
              categoryData.map((chick) => {
              return <Grid xs={12} sm={6} md={4} lg={3} style={styles.productGridCont} key={chick.id}>
                <Box style={styles.productItem} sx={{display: isDesktop ? 'flex' : null}}>
                  <Box sx={{textAlign:'center', height:'250px', position:'relative', cursor:'pointer', display:'flex', alignItems:'center' }}
                    onClick={() => navigate(`/products/${chick.urlId}`, {state : chick})}>
                    {/* <Box sx={styles.discountCont}>
                      {Math.trunc(((chick.mrp - chick.price) / chick.mrp) * 100)}% Off
                    </Box> */}
                    <img src={getImgMap()[chick.imgUrl]} style={styles.productImg}/>
                  </Box>
                  <div style={isDesktop ? styles.productDescContDesk : styles.productDescCont}>
                    <Box>
                      <Box sx={styles.prodName}
                        onClick={() => navigate(`/products/${chick.urlId}`, {state : chick})}>
                        {chick.name} 
                      </Box>
                      {
                        chick.style ? 
                          <Box sx={{textAlign:'left', marginBottom:'5px',fontSize:'15px', fontWeight:'700', color:'#404040'}}>
                            ({chick.style})
                          </Box> : null
                      }
                    </Box>

                    <Box>
                    {
                      chick.aka ? 
                        <Box sx={{textAlign:'left', marginBottom:'2px',fontSize:'13px', color:'#404040'}}>
                          Aka : {chick.aka}
                        </Box> : null
                    }
                    {
                      chick.age ? 
                        <Box sx={{textAlign:'left', marginBottom:'5px',fontSize:'13px', color:'#404040'}}>
                          Age : {chick.age}
                        </Box> : null
                    }
                    </Box>

                    <Box>
                      <Box sx={{fontSize:'11px', color:'#404040'}}>
                        Starting from
                      </Box>
                      <Box sx={{textAlign:'left', marginBottom:'10px', display:'flex', alignItems:'baseline'}}>
                      {/* {
                        chick.enableBogo ? null : 
                        <Box sx={{fontSize:'15px', marginRight:'5px', opacity:'0.2'}}><s>₹ {chick.mrp}</s></Box> 
                      } */}
                      <Box sx={{fontWeight:'bold', fontSize:'20px', fontWeight:'700', color:'#404040'}}>
                        ₹ {chick.livePrice || chick.price} 
                      </Box>
                      <Box sx={{fontSize:'11px'}}>
                        /{chick.qty}
                      </Box>
                      
                      {/* <Box sx={{fontSize:'12px', marginLeft:'5px', color:'#f47f13', borderLeft:'1px solid #eaeaea', paddingLeft:'5px'}}>
                        {
                          chick.enableBogo ? 
                            <Box sx={{marginBottom:'5px'}}>Buy One Get One FREE</Box> : 
                            <>{Math.trunc(((chick.mrp - chick.price) / chick.mrp) * 100)}% Off</>
                        }    
                        </Box> */}
                      </Box>
                    </Box>
                    
                    {
                      chick.stockQty == 0 ?
                      <Button variant='outlined' size='small' disabled sx={{opacity:'0.6'}}>
                        Out of stock
                      </Button> :
                      <>
                        {
                          chick?.onlyAtStores ? 
                          <Button variant='outlined' size='small' disabled sx={{opacity:'0.6'}}>
                            Available at stores
                          </Button> : 
                          <Button variant="contained" fullWidth 
                          onClick={() => navigate(`/products/${chick.urlId}`, {state : chick})}>
                            Shop Now
                          </Button>
                        }
                      </>
                    } 

                  </div>
                </Box>
              </Grid>
              })
            }
          </Grid>
        </Box>
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

export default Categories