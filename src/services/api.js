import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, increment, orderBy, where, deleteDoc, arrayRemove } from "firebase/firestore";
import { analytics, db } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { makeStyles } from "@mui/material";
import MysoreQueen from '../assets/mysore-queen.png'
import Kadaknath from '../assets/kadaknath.png'
import Warrior from '../assets/warrior.png'
import TenderChicken from '../assets/tender-chicken.png'
import PicklesLogo from '../assets/pickle.png'
import EggsLogo from '../assets/eggs.png'
import ThirtyEggsLogo from '../assets/thirty-eggs.png'
import ClassicCountry from '../assets/classic-country.png'
import Nutrisoft from '../assets/nutrisoft.png'
import { logEvent } from "firebase/analytics";

let userDataCache = null

const imgMap = {
  'MysoreQueen' : MysoreQueen,
  'Kadaknath' : Kadaknath,
  'TenderChicken' : TenderChicken,
  'Warrior' : Warrior,
  'PicklesLogo' : PicklesLogo,
  'EggsLogo' : EggsLogo,
  'ThirtyEggsLogo' : ThirtyEggsLogo,
  'ClassicCountry' : ClassicCountry,
  'Nutrisoft' : Nutrisoft
}

export const btnCurvedStyle = {
  borderRadius:'20px', background:'#FFF0D9 !important', color:'#a4243d !important', 
            fontFamily:'Sans', fontWeight:'bold !important', padding:'8px 40px'
}

export const getCustomizedProducts = () => {
  return ['C009', 'C013', 'C017', 'C029', 'C021',  'CC009', 'CC013', 'CC017', 'CC029', 'CC021', 'C019', 'C023', 'C011', 'C016', 'C067', 'C025']
}

export const getAllCategories = () => {
  return [{
    id : 'free-range-birds',
    title : 'Free Range Farm Birds'
  },
  {
    id : 'nutrisoft-chicken',
    title : 'Nutrisoft Chicken'
  },
  {
    id : 'village-birds',
    title : 'Village Birds'
  },
  {
    id : 'eggs',
    title : 'Eggs'
  },
  {
    id : 'pickles',
    title : 'Pickles'
  }
  ]
}

export const getImgMap = () => {
  return imgMap
}

export const getRecepieVideos = () => {
  return [
    {
      url : 'https://www.youtube.com/embed/F6l2E631Hd0',
      id : 1
    },
    {
      url : 'https://www.youtube.com/embed/52tKR3RkHro',
      id : 2
    },
    {
      url : 'https://www.youtube.com/embed/t__O2836Pak',
      id : 3
    },
    {
      url : 'https://www.youtube.com/embed/nXgtsknIPvY',
      id : 4
    },
    {
      url : 'https://www.youtube.com/embed/SPfE1gXBRhc',
      id : 5
    },
    {
      url : 'https://www.youtube.com/embed/F6l2E631Hd0',
      id : 6
    }
  ]
}

// export const getTimeSlots = () => {
//   return [
//     {
//       id : 7,
//       time : '7:30 AM - 8:30AM',
//       pranaId : 4
//     },
//     {
//       id : 8,
//       time : '8:30 AM - 9:30AM',
//       pranaId : 5
//     },
//     {
//       id : 9,
//       time : '9:30 AM - 10:30AM',
//       pranaId : 6
//     },
//     {
//       id : 17,
//       time : '5:30 PM - 6:30PM',
//       pranaId : 7
//     },
//     {
//       id : 18,
//       time : '6:30 PM - 7:30PM',
//       pranaId : 8
//     },
//     {
//       id : 19,
//       time : '7:30 PM - 8:30PM',
//       pranaId : 9
//     },
//     {
//       id : 20,
//       time : '8:30 PM - 9:30PM',
//       pranaId : 10
//     }
//   ]
// }

export const getDeliveryCharge = (type) => {
  if (type == 'self_pickup') {
    return 0 
  } else {
    return 35
  }
}

export const getMetaData = () => {
  return {

    'nutrisoft-chicken' : {
      title : 'Nutrisoft Chicken',
      keywords : 'Nutrisoft Chicken',
      description : 'Nutrisoft Chicken'
    },
    'home' : {
      title : 'Country Chicken Co - Authentic Natu Kodi in Hyderabad',
      keywords : 'countrychicken, natu kodi, healthy chicken, country eggs, chicken pickles, free range, antibiotic, steroids free',
      description : 'Country Chicken Co. brings you authentic natu kodi (country chicken) in Hyderabad. Our free-range chickens are raised without antibiotics. Buy now online and experience the goodness of authentic country chicken, conveniently delivered to your doorstep'
    },
    'free-range-birds' : {
      title : 'Naturally Grown, Free Range, and Healthy Country Chicken (Natu Kodi)',
      keywords : 'Country chicken, natu kodi, free range, naturally grown, near you, beyond organic, healthy Free Range, Naturally Grown',
      description : 'We believe in providing our chickens with a stress-free life. Thats why all our poultry is free-range, allowing them to engage in natural behaviors, roam outdoors, and forage for their food. We follow sustainable farming practices and avoid the use of hormones or antibiotics'
    },
    'village-birds' : {
      title : 'Village Birds: Order Now in Hyderabad for Authentic Natu Kodi (Country Chicken)',
      keywords : 'Country Chicken Co., Village Birds, Order Now, Hyderabad, Authentic Natu Kodi, Backyard-raised Poultry',
      description : 'Discover the Taste of Pure Tradition with Country Chicken Co Village Birds. Located in Hyderabad, we bring you the finest selection of Natu Kodi (Country Chicken) raised by local farmers. Our poultry is free-range and nurtured naturally, offering you an authentic farm-fresh experience. Place your order now to enjoy the natural and healthy goodness of our Village Birds.'
    },
    'chicken-half-kg' : {
      title : 'Naturally Grown, Free Range, and Healthy Country Chicken (Natu Kodi)',
      keywords : 'Country chicken, natu kodi, free range, naturally grown, near you, beyond organic, healthy Free Range, Naturally Grown',
      description : 'We believe in providing our chickens with a stress-free life. Thats why all our poultry is free-range, allowing them to engage in natural behaviors, roam outdoors, and forage for their food. We follow sustainable farming practices and avoid the use of hormones or antibiotics'
    },
    'chicken' : {
      title : 'Naturally Grown, Free Range, and Healthy Country Chicken (Natu Kodi)',
      keywords : 'Country chicken, natu kodi, free range, naturally grown, near you, beyond organic, healthy Free Range, Naturally Grown',
      description : 'We believe in providing our chickens with a stress-free life. Thats why all our poultry is free-range, allowing them to engage in natural behaviors, roam outdoors, and forage for their food. We follow sustainable farming practices and avoid the use of hormones or antibiotics'
    },
    'eggs' : {
      title : 'Finest Free-Range, Cage-Free Brown Eggs and Country Eggs in Hyderabad',
      keywords : 'free-range, cage-free, order now online, lowest price, best quality',
      description : 'Buy The finest free-range, cage-free brown eggs and country eggs in Hyderabad at Country Chicken Co. Order now online for the lowest prices and experience the best quality eggs that are ethically sourced.'
    },
    'pickles' : {
      title : 'Authentic Country Chicken Pickle for Order in Hyderabad',
      keywords: 'country chicken pickle, authentic, finest spices, order, buy now, Hyderabad',
      description : 'Satisfy your cravings with our authentic Country Chicken Pickle. Made with the finest spices and locally sourced chicken, order now for quick delivery in Hyderabad. Experience the irresistible taste of tradition.'
    },
    'recipes' : {
      title : 'Finest Natukodi Recipes',
      keywords : 'Country Chicken Co., Natukodi recipes, finest flavors, traditional favorites, innovative creations, delicious possibilities',
      description : 'Explore our curated collection featuring traditional favorites and innovative creations that will tantalize your taste buds. Join our vibrant community of food enthusiasts as we unlock a world of delicious possibilities with the best Natukodi flavors.'
    }
  }
}

export const logAction = (key, value) => {
  if (value)
    logEvent(analytics, key, {value : value})
  else
    logEvent(analytics, key)
}

export const getUiProductsData = (products) => {

  if (products.length) {

    products.forEach((order, index) => {

      const tempSpecifications = {}

      order.products.forEach((item) => {
        if (item.parent_code) {

          if (tempSpecifications[item.parent_code]) tempSpecifications[item.parent_code].push(item)
          else tempSpecifications[item.parent_code] = [item]              
        } else {

          if (order.uiProducts) order.uiProducts.push(item)
          else order.uiProducts = [item]
        }
      })

      order.specifications = tempSpecifications
    })
  } else {
    return []
  }
  return products
}



export const setUserData = (async(userData) => {
  const userCollRef = collection(db, 'users')

  return new Promise((resolve, reject)=> {
    setDoc(doc(userCollRef, userData.userId), userData).then((querySnapshot) => {
      resolve(userData)
    }).catch((error)=> {
      reject(error)
    })
  })
})

export const createNewUser = (async(userData) => {
  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/createNewuser`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        userData : userData
      })
    }).then((response) => response.json())
    .then(function(data) { 
      if (data.error) {
        reject(data)
      } else
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})


export const createNewOrder = (async(orderData) => {
  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/createNewOrder`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        userData : orderData
      })
    }).then((response) => response.json())
    .then(function(data) { 
      if (data.errorCode) {
        reject(data)
      } else
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})


export const getUserProductOrders = (async(userData) => {
  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/getUserOrders`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({userData : userData})
    }).then((response) => response.json())
    .then(function(data) { 
      if (data.error) {
        reject(data)
      } else
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})


export const getLanding = (async(userData) => {
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/v1/getLanding`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({userData : userData})
    }).then((response) => response.json())
    .then(function(data) { 
      if (data.error) {
        reject(data)
      } else
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const getCategoryData = (async(key) => {
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/v1/getCategoryData`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({id : key})
    }).then((response) => response.json())
    .then(function(data) { 
      if (data.error) {
        reject(data)
      } else
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const getNearestStoreDetails = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/getNearestStoreDetails`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      if (data.error) {
        reject(data)
      } else
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})


export const getProductData = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/v1/getProductData`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const generateSignupOtp = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/generateSignupOtp`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})


export const validateUserOtp = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/validateUserOtp`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})



export const getCoupons = (async(data) => {
  return new Promise(async(resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/getCoupons`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const getBlogData = (async(id) => {

  return new Promise((resolve, reject)=> {
    getDoc(doc(db, `blogs/${id}`)).then((querySnapshot) => {
      resolve(querySnapshot.data())
    }).catch((error)=> {
      reject(null)
    })
  })
})

export const getRecipieData = (async(id) => {

  return new Promise((resolve, reject)=> {
    getDoc(doc(db, `recipies/${id}`)).then((querySnapshot) => {
      resolve(querySnapshot.data())
    }).catch((error)=> {
      reject(null)
    })
  })
})

export const getAllCCCBlogs = (async(id) => {

  return new Promise((resolve, reject)=> {
    getDocs(query(collection(db, `blogs`))).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        eventItems.push(doc.data())      
      })
      resolve(eventItems)
    }).catch(()=> {
      reject([])
    })
  })
})


export const newCustomerEnquiry = (async(data) => {
  return new Promise(async(resolve, reject) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/newCustomerEnquiry`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})








// Should remove id and fetch from cookie
export const getUserData = (async(id, verifyToken) => {
  // console.log("getting user data for : ", id)
  // if (userDataCache) 
  // {
  //   if (userDataCache.mobileNo == id) {
  //     // console.log("User cache exists : ", userDataCache)
  //     return userDataCache
  //   }
  // }

  return new Promise((resolve, reject)=> {
    getDoc(doc(db, `users/${id}`)).then((querySnapshot) => {

      const deviceToken = document.cookie.replace(/(?:(?:^|.*;\s*)deviceToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (verifyToken && deviceToken && (deviceToken != querySnapshot.data().deviceToken.replace(/[^a-zA-Z0-9]/g, ""))) {
        resolve({
          multiLoginError :true
        })
      }

      resolve(querySnapshot.data())
      //TODO - remove

      userDataCache = querySnapshot.data()
    }).catch((error)=> {
      reject(null)
    })
  })
})

export const removeUserCache = (() => {
  userDataCache = null
})

export const getUserDataByUrl = (async(id) => {

  return new Promise((resolve, reject)=> {
    getDocs(query(collection(db, "users"), where("userUrlId", "==", id))).then((querySnapshot) => {
      let userData = null
      querySnapshot.forEach((doc) => {
        userData = doc.data()
      })
      if (userData)
        resolve(userData)
      else  
        reject(null)
    }).catch((error) => {
      reject(error)
    })
  })
})

export const updateUserData = (async(userData, uid) => {
  const userCollRef = collection(db, 'users')
  return new Promise((resolve, reject)=> {
    updateDoc(doc(userCollRef, uid), userData).then((querySnapshot) => {
      resolve(userData)
      removeUserCache()
    }).catch((error)=> {
      reject(error)
    })
  })
})

export const uploadImage = (async(fileData, fileMetadata, fileName, path) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${path}/${fileName}`);

  let metadata = {
    contentType: fileMetadata.type,
  };

  return new Promise((resolve, reject) => {
    uploadBytes(storageRef, fileData, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
      })
    })
  })
})

export const sendNewNotification = (async(data) => {

  const alertCollRef = collection(db, 'alerts'),
        alertId = doc(alertCollRef).id
  data.uid = alertId

  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/sendNotification`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})

export const refreshNoti = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/refreshNotifications`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})

export const registerToken = (async(tokenId, groups) => {
  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/subscribe`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        tokenId : tokenId,
        groups : groups
      })
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})


export const unRegisterToken = (async(tokenId, groups) => {
  return new Promise(async(resolve, reject) => {
    const orderResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/unsubscribe`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        tokenId : tokenId,
        groups : groups
      })
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})


export const checkAppUpdates = (async(versionData) => {
  return new Promise(async(resolve, reject) => {
    const appUpdateResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/appVersionCheck`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        appVersion : versionData.appVersion
      })
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    }); 
  })
})

export const addNewAddress = (async(data) => {
  const addrCollRef = collection(db, `users/${data.userId}/address`)
  data.addressId    = doc(addrCollRef).id

  return new Promise((resolve, reject)=> {
    setDoc(doc(addrCollRef, data.addressId), data).then((querySnapshot) => {
      resolve({})
    }).catch((error)=> {
      reject(error)
    })
  })
})


//Might not be used anymore, just leaving here for reference
export const getAllUserAddress = (async(userId) => {
  return new Promise((resolve, reject) => {
    getDocs(query(collection(db, `users/${userId}/address`))).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        eventItems.push(doc.data())      
      })
      resolve(eventItems)
    }).catch(()=> {
      reject([])
    })
  })
})

export const getUserDeliveryData = (async(userId) => {
  return new Promise(async(resolve, reject) => {
    const appUpdateResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/v1/getUserAddress`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        userId :userId
      })
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const getBranchInfo = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const appUpdateResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/v1/getBranchInfo`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const getAllRecipiesData = (async(data) => {
  return new Promise(async(resolve, reject) => {
    const appUpdateResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/v1/getRecipies`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(data)
    }).then((response) => response.json())
    .then(function(data) { 
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
})

export const getUserProfileData = (async(userId) => {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, `users/${userId}`)).then((querySnapshot) => {
      resolve(querySnapshot.data())
    }).catch((error)=> {
      reject(null)
    })
  })
})

export const getOrdersById = (async(userId) => {
  return new Promise((resolve, reject) => {
    getDocs(query(collection(db, `orders`),
                   where('userId', '==', userId),
                   orderBy('timeStamp', 'desc'))
            ).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        eventItems.push(doc.data())      
      })
      resolve(eventItems)
    }).catch((error)=> {
      console.log(error)
      reject([])
    })
  })
})

export const getInputTheme = () => {

  return {
    inputBox : {
      "& .MuiOutlinedInput-input" : {
        color:'white !important'
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-input": {
        color: "white"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-outlined": {
        color: "white"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "white"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "white"
      }
    }
  }
}

export const editAddressApi = (async(addressData) => {
  const addrCollRef = collection(db, `users/${addressData.userId}/address`)
  return new Promise((resolve, reject)=> {
    updateDoc(doc(addrCollRef, addressData.addressId), {houseDeatils : addressData.houseDeatils,landmark : addressData.landmark,pincode:addressData.pincode,streetDetails:addressData.streetDetails,userName:addressData.userName}).then((querySnapshot) => {
      resolve({})
    }).catch((error)=> {
      reject(error)
    })
  })
})
  


