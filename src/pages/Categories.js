import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { useState, useContext, useEffect } from 'react';
import { CommonContext, CommonProvider } from '../contexts/CommonContext';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import EggsLogo from '../assets/eggs.png'
import PicklesLogo from '../assets/pickle.png'

import MysoreQueen from '../assets/mysore-queen.png'
import Kadaknath from '../assets/kadaknath.png'
import Warrior from '../assets/warrior.png'
import TenderChicken from '../assets/tender-chicken.png'
import ComponentLoader from '../components/ComponentLoader';

const styles = {
  productItem : {
    margin:'10px',
    width:'90%',
    background:'white',
    borderRadius:'5px',
    boxShadow:'0px 0px 5px 2px #eaeaea'
  },
  productGridCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  productImg : {
    width:'100%',
    height:'200px',
    borderRadius:'5px 5px 0 0'
  },
  productDescCont : {
    padding:'15px',
    textAlign:'left',
    background:'#ffebeb',
    // borderRadius:'25px 25px 20px 20px'
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
}

function Categories() {

  const location = useLocation()
  const navigate = useNavigate()
  const { updateCart, cartData } = useContext(CommonContext)
  const [loading, setLoading]    = useState(true)
  const [products, setProducts]  = useState([])

  const [chicksData, setChicksData] = useState([{
    name : 'Tender Country Chicken',
    price : 649,
    mrp : 928,
    id : 'C009',
    qty : '1 Kg',
    imgUrl : TenderChicken,
    description : 
    'Tender Country Chicken, also known as the Telangana Potti Kallu, a delectable choice for meat-lovers looking for a tender and flavorful dining experience. This unique breed of desi chicken is known for its soft meat, which is more tender than other country chickens. Our chickens are raised in a free-range environment, ensuring they are free from antibiotics, hormones, and other harmful additives. This not only ensures that you enjoy healthy and delicious meat but also helps support ethical and sustainable farming practices. The Tender Country Chicken is versatile and can be used in many different dishes, from classic roast chicken to spicy biriyani and pulusu. Its soft texture and rich flavor make it an excellent choice for any recipe that requires tender, juicy meat.'
  },
  {
    name : 'Classic Country Chicken',
    price : 699,
    mrp : 999,
    id : 'C013',
    qty : '1 Kg',
    imgUrl : Warrior,
    description: 
    'Introducing Classic Country Chicken, also known as Andhra Punju Kodi, a type of fighter breed chicken that is sure to excite your taste buds. Classic Country Chicken  is packed with protein and essential vitamins such as Vitamin D and Niacin, which play a crucial role in maintaining strong and healthy DNA. Classic Country Chicken is known for its unique taste and texture. While it may be tough, the meat is also incredibly juicy, making for a satisfying dining experience. With a low fat content and medium rigidity, this chicken is aged for 5-8 months, allowing it to develop a rich and distinct flavor. Make your favourite natu kodi dishes:  andhra natu kodi pulusu, roast and curry with Classic Country Chicken'
  },
  {
    name : 'Mysore Country Chicken',
    price : 499,
    qty : '1 Kg',
    mrp:714,
    id : 'C017',
    imgUrl : MysoreQueen,
    description:
    'Introducing the Queen of Country Chicken also known as Mysore Natu Kodi. Sourced from the finest egg-laying females, this exquisite breed of chicken is aged 12-24 months, offering a unique and robust flavor profile that is rich in protein, aromatic, and incredibly flavorsome. Queen of Country Chicken has tough and rigid texture, providing an exceptional dining experience that caters to a variety of culinary creations. Raised completely free-range, from antibiotics and steroids for a natural and wholesome taste you can trust. Delight your taste buds by preparing the traditional Natu Kodi Pulusu, a comforting Chicken Soup, or a flavorful Chicken Pulav.'
  },
  {
    name : 'Warrior Chicken',
    price : 1799,
    mrp:2572,
    qty : '1 Kg',
    id : 'C029',
    imgUrl : Warrior,
    description:
    'Introducing the legendary Warrior Chicken, also known as the Pandem Natu Kodi, raised with utmost care and luxury, this bird is a true fighter. Raised for up to 24 months, these birds are the healthiest country chickens out there and are used in the ancient Indian tradition of cockfighting. Our Warrior Chickens are completely free-range and raised without antibiotics or steroids, ensuring that the meat you consume is pure, healthy and natural. Packed with essential nutrients, these birds are rich in Vitamin D, B12, iron and calcium, providing you with a well-rounded and nutritious meal. The meat of the Warrior Chicken is tough, but it is also extremely juicy and flavorful. It is perfect for traditional Indian recipes like Natu Kodi Pulusu and Natu Kodi Fry, which require the use of robust and flavorful meat. These recipes allow you to experience the unique texture and taste of Warrior Chicken in all its glory.'
  },
  {
    name : 'Kadaknath Country Chicken',
    price : 999,
    mrp:1428,
    qty : '1 Kg',
    id : 'C021',
    imgUrl : Kadaknath,
    description:
    'Introducing the Kadaknath Country Chicken, also known as Kali Masi, a unique and flavorful bird known for its black-colored meat. Enriched with essential vitamins and minerals, this chicken is a healthy and nutritious choice for those looking for a wholesome meal. Our Kadaknath Chickens are completely free-range and raised without antibiotics or steroids, ensuring that the meat you consume is pure and natural. Packed with 18 amino acids, high iron content, and vitamins B1, C, B6, B12, B2, and E, this chicken has 25% more protein and less fat, making it an ideal choice for those who want to maintain a healthy weight. Moreover, Kadaknath Chicken has been known to benefit those with PCOD and cardiac issues. The meat of this chicken is  juicy and hard. Whether you are planning to prepare Kadaknath Chicken in the form of curry, fry, or roast, this bird is sure to delight your taste buds with its distinctive flavor and texture.'
  }
])

  const [eggsData, setEggsData] = useState([{
    name : 'Brown Eggs',
    price : 79,
    mrp:149,
    id : 'C041',
    qty : '6 Pack',
    imgUrl : EggsLogo
  },
  {
    name : 'Brown Eggs',
    mrp : 450,
    price:269,
    id : 'C042',
    qty : '30 Pack',
    imgUrl : EggsLogo
  },
  {
    name : 'Country Eggs',
    mrp : 149,
    price:99,
    id : 'C043',
    qty : '6 Pack',
    imgUrl : EggsLogo
  },
  {
    name : 'Country Eggs',
    price : 499,
    mrp:699,
    id : 'C044',
    qty : '30 Pack',
    imgUrl : EggsLogo
  }])

  const [picklesData, setPicklesData] = useState([{
    name : 'Country Chicken Pickle (Boneless)',
    mrp : 650,
    price:599,
    qty:'500 GM',
    id : 'C045',
    imgUrl : PicklesLogo
  },
  {
    name : 'Country Chicken Pickle (With Bone)',
    mrp : 550,
    price:499,
    qty:'500 GM',
    id : 'C046',
    imgUrl : PicklesLogo
  }])

  async function addToCart(item) {
    updateCart(item, true)
  }

  async function modifyCart(item, isIncrease) {
    updateCart(item, isIncrease)
  } 

  
  useEffect(() => {
    
    if (location.state == 'chicken') setProducts(chicksData)
    else if (location.state == 'eggs') setProducts(eggsData)
    else if (location.state == 'pickles') setProducts(picklesData)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Box sx={{padding:'4vw', marginTop:'5vh'}}>
      {
        loading ? 
        <ComponentLoader /> : 
        <Box>
          <Grid container>
            {
              products.map((chick) => {
              return <Grid xs={12} sm={6} md={4} lg={3} style={styles.productGridCont} key={chick.id}>
                <Box style={styles.productItem}>
                  <Box sx={{textAlign:'center', height:'200px'}}>
                    <img src={chick.imgUrl} style={styles.productImg}/>
                  </Box>
                  <div style={styles.productDescCont}>
                    <Box sx={{textAlign:'left', marginBottom:'5px', fontWeight:'450', fontSize:'20px'}}>
                      {chick.name}
                    </Box>
                    <Box sx={{textAlign:'left', marginBottom:'5px', fontWeight:'450', fontSize:'15px'}}>
                      {chick.qty}
                    </Box>
                    <Box sx={{textAlign:'left', marginBottom:'5px', fontSize:'20px', display:'flex', alignItems:'end'}}>
                    ₹ {chick.price} <Box sx={{fontSize:'15px', marginLeft:'5px', opacity:'0.5'}}><s>₹ {chick.mrp}</s></Box> 
                    </Box>

                    {
                      cartData && cartData[chick.id] && cartData[chick.id].count ?
                      <Box style={styles.incCont}>
                        <Box sx={{border:'1px solid #dddddd', 
                                  display:'flex', 
                                  borderRadius:'5px', 
                                  boxShadow:'0px 2px 5px 5px #eaeaea', 
                                  background:'white', border:'1px solid #c3c3c3'}}>
                          <Box onClick={() => modifyCart(chick, false)}
                            sx={{padding:'5px 15px 5px 15px', fontSize:'20px', cursor:'pointer'}}>
                            -
                          </Box>
                          <Box sx={{padding:'5px 10px', 
                                    borderRight:'1px solid #bababa', 
                                    borderLeft:'1px solid #bababa', fontSize:'20px',
                                    background:'#a4243d !important', color:'white'}}>
                            {cartData[chick.id].count}
                          </Box>
                          <Box  onClick={() => modifyCart(chick, true)}
                            sx={{padding:'5px 15px 5px 15px', fontSize:'20px', cursor:'pointer'}}>
                            +
                          </Box>
                        </Box>
                      </Box> : 
                      <Box sx={{textAlign:'right'}}>
                        <Button variant="contained" style={styles.mainBtn} onClick={() => addToCart(chick)}>
                          Add To Cart
                        </Button>
                      </Box>
                    }
                    
                  </div>
                </Box>
              </Grid>
              })
            }
          </Grid>
        </Box>
      }

    {/* {
      cartData && cartData.totalCount ?
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Box style={styles.cartViewCont}>
          <Box>
            {cartData.totalCount} Items | ₹ {cartData.totalAmount}
          </Box>
          <Box  onClick={() => navigate(`/cart`)}>
            View Cart
          </Box>
        </Box>
      </Box> : null
    } */}
      
    </Box>
  )
}

export default Categories