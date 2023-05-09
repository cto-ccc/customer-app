import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, increment, orderBy, where, deleteDoc, arrayRemove } from "firebase/firestore";
import { db } from '../firebase'
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

let userDataCache = null

const imgMap = {
  'MysoreQueen' : MysoreQueen,
  'Kadaknath' : Kadaknath,
  'TenderChicken' : TenderChicken,
  'Warrior' : Warrior,
  'PicklesLogo' : PicklesLogo,
  'EggsLogo' : EggsLogo,
  'ThirtyEggsLogo' : ThirtyEggsLogo,
  'ClassicCountry' : ClassicCountry
}

export const getCustomizedProducts = () => {
  return ['C009', 'C013', 'C017', 'C029', 'C021']
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
  console.log("===getting user orders===", userData)
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
      console.log("==========>>", data)
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
  console.log("===", userData)
  return new Promise(async(resolve, reject) => {
    const landingResp = await fetch(`${process.env.REACT_APP_SERVER_URL}/getLanding`, {
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




export const deleteUserApi = ((userData, groupName) => { 
  const userCollRef = collection(db, 'users')

  //TODO - should handle error responses properly
  unRegisterToken(userData.deviceToken, [groupName]).then(async()=> {
    console.log("Removing device from notifications : ", userData.deviceToken, groupName)
  }).catch(async(error) => {
    console.log("Some unexpected error occured")
  })

  if (userData.groups.length == 1) {
    return new Promise((resolve, reject)=> {
      deleteDoc(doc(userCollRef, userData.mobileNo)).then((querySnapshot) => {
        resolve(userData)
      }).catch((error)=> {
        reject(error)
      })
    })
  } else {
    return new Promise((resolve, reject)=> {
      updateDoc(doc(userCollRef, userData.mobileNo), {groups : arrayRemove(groupName)}).then((querySnapshot) => {
        resolve({})
      }).catch((error)=> {
        reject(error)
      })
    })
  }

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




export const getAlerts = (async(fromTs, toTs, groups) => {
  return new Promise((resolve, reject) => {
    getDocs(query( collection(db, `alerts`),
                   where('timeStamp', '<', toTs),
                   where('timeStamp', '>', fromTs),
                   orderBy('timeStamp', 'desc')
                 )
            ).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        if (groups.includes(doc.data().topic))
          eventItems.push(doc.data())      
      })
      resolve(eventItems)
    }).catch(()=> {
      reject([])
    })
  })
})

export const createNewGroup = (async(groupData) => {
  const groupCollRef = collection(db, 'groups')
  const groupId = doc(groupCollRef).id
  groupData.groupId = groupId
  return new Promise((resolve, reject)=> {
    setDoc(doc(groupCollRef, groupId), groupData).then((querySnapshot) => {
      resolve({})
    }).catch((error)=> {
      reject(error)
    })
  })
})

export const getGroups = (async() => {
  return new Promise((resolve, reject) => {
    getDocs(query(collection(db, `groups`))).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        eventItems.push(doc.data())      
      })
      resolve(eventItems)
    }).catch((error)=> {
      reject(error)
    })
  })
})

export const getUsersByGroup = (async(groupId) => {
  return new Promise((resolve, reject) => {
    getDocs(query(collection(db, `users`),  where("groups", "array-contains", groupId))).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        eventItems.push(doc.data())      
      })
      resolve(eventItems)
    }).catch((error)=> {
      reject(error)
    })
  })
})

export const editAlertApi = (async(alertData) => {
    const alertCollRef = collection(db, 'alerts')
    return new Promise((resolve, reject)=> {
      updateDoc(doc(alertCollRef, alertData.uid), {body : alertData.newBody}).then((querySnapshot) => {
        resolve({})
      }).catch((error)=> {
        reject(error)
      })
    })
})


export const saveVideosApi = (async(videos) => {
  const globalCollRef = collection(db, 'globals')
    return new Promise((resolve, reject)=> {
      updateDoc(doc(globalCollRef,'globals'), {videoLinks : videos}).then((querySnapshot) => {
        resolve({})
      }).catch((error)=> {
        console.log(error)
        reject(error)
      })
    })
})

export const getGlobals = (async() => {
  return new Promise((resolve, reject) => {
    getDocs(query(collection(db, `globals`))).then((querySnapshot) => {
      let eventItems = []
      querySnapshot.forEach((doc) => {
        eventItems.push(doc.data())      
      })
      resolve(eventItems[0])
    }).catch((error)=> {
      reject(error)
    })
  })
})

export const updateBannerLinks = (async(bannerLinks) => {
  const globalCollRef = collection(db, 'globals')
    return new Promise((resolve, reject)=> {
      updateDoc(doc(globalCollRef,'globals'), {bannerLinks : bannerLinks}).then((querySnapshot) => {
        resolve({})
      }).catch((error)=> {
        console.log(error)
        reject(error)
      })
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

// export const createNewOrder = (async(orderData) => {
//   const orderCollRef = collection(db, 'orders')
//   const orderId = doc(orderCollRef).id
//   orderData.orderId = orderId
//   return new Promise((resolve, reject)=> {
//     setDoc(doc(orderCollRef, orderId), orderData).then((querySnapshot) => {
//       resolve({})
//     }).catch((error)=> {
//       reject(error)
//     })
//   })
// })

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
  


