import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

Vue.use(VueFire)

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCCpeqjNtKvip9eWIbWKT2IXBku1ej5qFg',
    authDomain: 'waiting-room-c9c18.firebaseapp.com',
    databaseURL: 'https://waiting-room-c9c18.firebaseio.com',
    projectId: 'waiting-room-c9c18',
    storageBucket: 'waiting-room-c9c18.appspot.com',
    messagingSenderId: '691105005784'
  })
}

const fireDb = firebase.firestore()
const fireStorage = firebase.storage().ref()

export { fireDb, fireStorage }
