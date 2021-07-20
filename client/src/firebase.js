import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyA2hz88eatyKOEVazLr8PEuNbxW9cJ8rNs",
    authDomain: "olxclone-frontend2.firebaseapp.com",
    projectId: "olxclone-frontend2",
    storageBucket: "olxclone-frontend2.appspot.com",
    messagingSenderId: "1016529694940",
    appId: "1:1016529694940:web:4723d823409fd63d240419"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase