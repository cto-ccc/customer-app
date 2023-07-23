import React, { createContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences';
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
    setCartData(JSON.parse((await Preferences.get({ key: 'cartData' })).value) || {})
  }

  const updateCart = async(itemData, isIncrease) => {

    itemData = JSON.parse(JSON.stringify(itemData))
    const newCartData = cartData || {}

    if (newCartData[itemData.id]) {

      if (isIncrease && newCartData[itemData.id].count == 15) {
        showAlert("Maximum quantity you can order is 15")
        return
      }

      itemData.price = newCartData[itemData.id].price

      newCartData[itemData.id].count = newCartData[itemData.id].count + (isIncrease ? 1 : -1)

      if (newCartData[itemData.id].count == 0) delete newCartData[itemData.id]
    } else {

      if (itemData.extras) {
        if (itemData.extras.skinType=='skinless') itemData.price = itemData.price + 100
        if (itemData.extras.flavourType=='smoketurmeric') itemData.price = itemData.price + 15

        //Specific for nutrisoft
        if (itemData.extras.boneType=='boneless') {
          itemData.price = itemData.price + 300
          itemData.extras.skinType = 'skinless'
        } 
        if (itemData.extras.boneType=='withBones') {
          itemData.extras.skinType = 'skinless'
        } 
      }

      itemData.count = 1
      newCartData[itemData.id] = itemData
    }



    if (isIncrease) {
      newCartData.totalCount    = (newCartData.totalCount || 0)    + 1
      newCartData.totalAmount   = (newCartData.totalAmount || 0)   + itemData.price 
      newCartData.totalDiscount = (newCartData.totalDiscount || 0) + (itemData.mrp - itemData.price)
    } else {
      newCartData.totalCount    = newCartData.totalCount    - 1
      newCartData.totalAmount   = newCartData.totalAmount   - itemData.price
      newCartData.totalDiscount = newCartData.totalDiscount - (itemData.mrp - itemData.price)
    }
    setCartData({...newCartData})
    await Preferences.set({key: 'cartData', value: JSON.stringify(newCartData)})
  }

  const getCartData = async() => {
    return JSON.parse((await Preferences.get({ key: 'cartData' })).value) || {}
  }

  const clearCart = async() => {
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
    isDesktop
  }

  return <CommonContext.Provider value={value}> {props.children} </CommonContext.Provider>
}
