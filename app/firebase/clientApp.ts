import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBfweS6KAuJv8vjEhVkjcefjVENi9Wl-QQ",
    authDomain: "iap-auth-b2b99.firebaseapp.com",
    projectId: "iap-auth-b2b99",
    storageBucket: "iap-auth-b2b99.appspot.com",
    messagingSenderId: "335609919101",
    appId: "1:335609919101:web:eab959e997f768496ce314",
    measurementId: "G-LSQXY74P1Q"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

