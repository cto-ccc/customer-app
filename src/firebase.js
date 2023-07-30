import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, browserSessionPersistence, browserPopupRedirectResolver, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Capacitor } from "@capacitor/core"

const firebaseConfig = {
  apiKey:  process.env.REACT_APP_FIREBASE_api,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (Capacitor.isNativePlatform) {
  initializeAuth(app, {
    persistence : indexedDBLocalPersistence
  })
}

export const db = getFirestore(app)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)