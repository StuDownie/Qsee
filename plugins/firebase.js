import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

Vue.use(VueFire)

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'YOUR DETAILS FROM FIREBASE HERE',
    authDomain: 'YOUR DETAILS FROM FIREBASE HERE',
    databaseURL: 'YOUR DETAILS FROM FIREBASE HERE',
    projectId: 'YOUR DETAILS FROM FIREBASE HERE',
    storageBucket: 'YOUR DETAILS FROM FIREBASE HERE',
    messagingSenderId: 'YOUR DETAILS FROM FIREBASE HERE'
  })
}

const fireDb = firebase.firestore()
const fireStorage = firebase.storage()
const auth = firebase.auth()

export { fireDb, fireStorage, auth }
