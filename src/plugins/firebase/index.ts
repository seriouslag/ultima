import Vue from 'vue';

import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueFire);

const config = {
  apiKey: 'AIzaSyCY09ujShyR3IhhNkXCgQZ2X5Prgid1DpA',
  authDomain: 'ultima-62d15.firebaseapp.com',
  databaseURL: 'https://ultima-62d15.firebaseio.com',
  projectId: 'ultima-62d15',
  storageBucket: 'ultima-62d15.appspot.com',
  messagingSenderId: '36868138965',
};

firebase.initializeApp(config);

const db = firebase.firestore();

Vue.prototype.$firestore = db;

export { db };
