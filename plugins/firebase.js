import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCCpeqjNtKvip9eWIbWKT2IXBku1ej5qFg',
    authDomain: 'waiting-room-c9c18.firebaseapp.com',
    databaseURL: 'https://waiting-room-c9c18.firebaseio.com',
    projectId: 'waiting-room-c9c18',
    storageBucket: '',
    messagingSenderId: '691105005784'
  })
}

const fireDb = firebase.firestore()
export { fireDb }
