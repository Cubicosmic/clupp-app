// autenticación de firebase de mi proyecto "clupp-app"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBybtABFp5R7ym1y0b8gRLUR6S1H3xCtPc",
    authDomain: "clupp-app-e61ee.firebaseapp.com",
    projectId: "clupp-app-e61ee",
    storageBucket: "clupp-app-e61ee.appspot.com",
    messagingSenderId: "354144448287",
    appId: "1:354144448287:web:b46373fbb1eef6b36d4a2a",
    measurementId: "G-THZRKH54SX"
}

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;