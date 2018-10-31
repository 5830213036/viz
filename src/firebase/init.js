import firebase from 'firebase'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyApM9jTucuLY9GoK-sGqPcqW4WG06QQVXE",
    authDomain: "viz-data.firebaseapp.com",
    databaseURL: "https://viz-data.firebaseio.com",
    projectId: "viz-data",
    storageBucket: "viz-data.appspot.com",
    messagingSenderId: "525469273443"
  };
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({timestampsInSnapshots: true})

  //export firestore database
  export default firebaseApp.firestore()