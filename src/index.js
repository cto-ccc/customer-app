import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import ScrollToTop from './components/ScrollToTop';
import TagManager from 'react-gtm-module'


CapApp.addListener('backButton', ({ canGoBack }) => {

  const urlArray = window.location.href.split("/")

  const tagManagerArgs = {
    gtmId: 'GTM-T7JBVWW'
  }
  TagManager.initialize(tagManagerArgs)

  // if (urlArray[urlArray.length - 1] === 'auth') {
  //   CapApp.exitApp();
  //   return
  // }

  if(canGoBack){
    window.history.back();
  } else {
    CapApp.exitApp();
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
