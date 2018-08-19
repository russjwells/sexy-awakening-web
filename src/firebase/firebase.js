import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyAdxY6JsatQhYxlegoI-7Of6isVs6Fk1Vk",
    authDomain: "sexy-awakening.firebaseapp.com",
    databaseURL: "https://sexy-awakening.firebaseio.com",
    projectId: "sexy-awakening",
    storageBucket: "sexy-awakening.appspot.com",
    messagingSenderId: "1014804828452",
  };

//init if not already
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }