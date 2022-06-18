
import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjRwSuHpvE7_3oTkkaSNs9M_K1CTIbBQc",
  authDomain: "bingebox-2c27b.firebaseapp.com",
  projectId: "bingebox-2c27b",
  storageBucket: "bingebox-2c27b.appspot.com",
  messagingSenderId: "221549555629",
  appId: "1:221549555629:web:8c630b914d97820d7d7b24"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export const db = getFirestore();
export default fire