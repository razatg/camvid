import firebase from 'firebase';


const config = {
  apiKey:"AIzaSyDth6mtUPrNOGS3TGktlBGFMjbWyOGsViE",
  authDomain:"remotelearn-54f51.firebaseapp.co",
  databaseURL:"https://remotelearn-54f51.firebaseio.com",
  projectId:"remotelearn-54f51",
  storageBucket:"remotelearn-54f51.appspot.com",
  messagingSenderId:"343619157987",
};

firebase.initializeApp(config);

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
