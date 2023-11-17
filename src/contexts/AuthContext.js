import React, { useEffect, useState, useContext } from 'react'
import {auth} from '../firebase'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { CommonContext } from './CommonContext';
import { logAction, removeUserCache } from '../services/api';
import { Preferences } from '@capacitor/preferences';

export const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {

  const [userProfileData, setUserProfileData] = useState({})
  const { showLoader, hideLoader, showAlert } = useContext(CommonContext)
  const [userId, setUserId] = useState(null)

  const navigate = useNavigate()

  const value = {
    logout,
    userProfileData,
    setUserProfileData,
    userLoggedIn,
    isUserLoggedIn,
    getUserId,
    getCustomerId,
    getCustomerIdFromCache,
    getUserMobile
  }

  async function userLoggedIn(userId, customerId) {
    if (!userId) return
    await Preferences.set({
      key: 'userId',
      value: userId,
    })
    await Preferences.set({
      key: 'customerId',
      value: customerId,
    })
    setUserId(userId)
  }

  async function isUserLoggedIn() {
      
      const { value } = await Preferences.get({ key: 'userId' }) || { value : false }
     
      if (value) {
        // console.log("User ID found in cap preferences", value)
        setUserId(value)
        return true
      } else {
        // console.log("User ID not found in cap preferences")
        return false
      }
  }

  function getCustomerIdFromCache() {
    return userId
  }

  async function getUserId() {
    const { value } = await Preferences.get({ key: 'userId' })
    if (value) {
      return value
    } else {
      logout()
    }
  }

  async function getCustomerId() {
    const { value } = await Preferences.get({ key: 'customerId' })
    if (value) {
      return value
    } else {
      logout()
    }
  }

  async function getUserMobile() {
    const { value } = await Preferences.get({ key: 'userId' })
    if (value) {
      return value
    } else {
      return null
    }
  }

  async function logout() {
    logAction('logout')
    showLoader()
    setUserId(null)
    signOut(auth).then(async () => {
      hideLoader()
      removeUserCache()
      await Preferences.remove({ key: 'userId' })
      await Preferences.remove({ key: 'customerId' })
      navigate("/", {replace:true})
    }).catch((error) => {
      hideLoader()
      showAlert("Failed to logout")
    })
  }

  return(
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}