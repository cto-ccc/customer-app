import React, { createContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences';
import { logAction } from '../services/api';
export const CommonContext = createContext()

export const CommonProvider = (props) => {

  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  const [loader, setLoader] = useState(false)
  const [loadingText, setLoadingText] = useState('Loading...')

  const [snackbar, setSnackbar] =  useState(false)
  const [snackbarText, setSnackbarText] = useState('')
  const [snackbarType, setSnackbarType] = useState('success')

  const [cartData, setCartData] = useState({})
  const [couponCacheData, setCouponCacheData] = useState({})

  const [popup, setPopup] = useState(false)
  const [blocker, setBlocker] = useState(false)

  const [updatePercent, setUpdatePercent] = useState(10)

  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    setCartDataOnLoad()
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setIsDesktop( e.matches ))
  }, [])

  const setCartDataOnLoad = async() => {
    setCouponCacheData(JSON.parse((await Preferences.get({ key: 'couponData' })).value) || {})
    setCartData(JSON.parse((await Preferences.get({ key: 'cartData' })).value) || {})
  }

  const updateCart = async(itemData, isIncrease) => {

    itemData = JSON.parse(JSON.stringify(itemData))
    const newCartData = cartData || {}

    // Item present in cart
    if (newCartData[itemData.id]) {

      if (isIncrease && newCartData[itemData.id].count == 15) {
        showAlert("Maximum quantity you can order is 15")
        return
      }
      
      itemData.price = (newCartData[itemData.id].price)

      let itemQty = itemData?.enableBogo ? 2 : 1
      newCartData[itemData.id].count = newCartData[itemData.id].count + (isIncrease ? itemQty : -itemQty)

      if (newCartData[itemData.id].count <= 0) delete newCartData[itemData.id]
    } 

    // Item not present in cart
    else {

      // To calculate Discount on MRP
      itemData.priceWithoutCust = itemData.price

      if (itemData.extras) {
        
        if (itemData.extras.skinType    == 'skinless')      itemData.price = itemData.price + 100
        if (itemData.extras.flavourType == 'smoketurmeric') itemData.price = itemData.price + 15

        //Specific for nutrisoft
        if (itemData.extras.boneType=='boneless') {
          itemData.price           = itemData.price + 300
          itemData.extras.skinType = 'skinless'
        } 

        if (itemData.extras.boneType=='withBones' && itemData.id == 'C067') {
          itemData.extras.skinType = 'skinless'
        } 

      }

      itemData.count = itemData.enableBogo ? 2 : 1
      newCartData[itemData.id] = itemData

      logAction('ADD_TO_CART', itemData.urlId)
    }

    if (isIncrease) {

      newCartData.totalCount    = (newCartData.totalCount    || 0)  + (itemData.enableBogo ? 2 : 1)
      newCartData.totalAmount   = (newCartData.totalAmount   || 0)  + itemData.price

      newCartData.totalDiscount = (newCartData.totalDiscount || 0)  + (itemData.mrp - itemData.priceWithoutCust)

      if (itemData.enableBogo)
        newCartData.bogoDiscount  = (newCartData.bogoDiscount || 0)  + (itemData.price)
    } else {

      newCartData.totalCount    = newCartData.totalCount    - (itemData.enableBogo ? 2 : 1)
      newCartData.totalAmount   = newCartData.totalAmount   - (itemData.price)

      newCartData.totalDiscount = newCartData.totalDiscount - (itemData.mrp - itemData.priceWithoutCust) 

      if (itemData.enableBogo)
        newCartData.bogoDiscount = newCartData.bogoDiscount  - (itemData.price)
    }

    newCartData.totalCount    = Math.max(0, newCartData.totalCount)
    newCartData.totalAmount   = Math.max(0, newCartData.totalAmount)
    newCartData.totalDiscount = Math.max(0, newCartData.totalDiscount)
    newCartData.bogoDiscount  = Math.max(0, newCartData.bogoDiscount)

    setCartData({...newCartData})
    await Preferences.set({key: 'cartData', value: JSON.stringify(newCartData)})
  }

  const addCouponToCart = async(couponData) => {
    setCouponCacheData(couponData)
    await Preferences.set({key: 'couponData', value: JSON.stringify(couponData)})
  }

  const getCouponData = async() => {
    return JSON.parse((await Preferences.get({ key: 'couponData' })).value) || {}
  }

  const clearCouponData = async() => {
    setCouponCacheData(null)
    return await Preferences.remove({key :  'couponData'})
  }

  const getCartData = async() => {
    return JSON.parse((await Preferences.get({ key: 'cartData' })).value) || {}
  }

  const clearCart = async() => {
    console.log('Clearing cart data')
    setCartData(null)
    return await Preferences.remove({key :  'cartData'})
  }

  const showLoader = (loadingText) => {
    setLoadingText(loadingText)
    setLoader(true)
  }

  const hideLoader = () => {
    setLoader(false)
    setLoadingText('Loading...')
  }

  const showAlert = (alertText) => {
    setPopup(false)
    setAlertText(alertText)
    setAlert(true)
  }

  const hideAlert = () => {
    setAlert(false)
    setAlertText(null)
  }

  const showSnackbar = (snackbarText, type) => {
    setSnackbarText(snackbarText)
    setSnackbarType(type)
    setSnackbar(true)
  }

  const hideSnackbar = () => {
    setSnackbar(false)
    setSnackbarText(null)
    setSnackbarType('success')
  }

  const showPopup = (popupData) => {
    setPopup(true)
    setAlertText(popupData)
    setAlert(true)
  }

  const value = {
    showLoader,
    hideLoader,
    showAlert,
    hideAlert,
    setAlert,
    loader,
    loadingText,
    alert,
    alertText,
    snackbar,
    snackbarText,
    showSnackbar,
    hideSnackbar,
    snackbarType,
    setSnackbarType,
    updateCart,
    cartData,
    getCartData,
    clearCart,
    couponCacheData,
    addCouponToCart,
    getCouponData,
    clearCouponData,
    showPopup,
    setPopup,
    popup,
    isDesktop,
    blocker, 
    setBlocker,
    updatePercent,
    setUpdatePercent
  }

  return <CommonContext.Provider value={value}> {props.children} </CommonContext.Provider>
}
