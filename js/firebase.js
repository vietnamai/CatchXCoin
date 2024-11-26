// File: js/firebase.js

// Khởi tạo Firebase
export const initializeFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCOHdI4tVObleAkiuIUymMBNEz3OPue-7Y",
        authDomain: "catchxcoin.firebaseapp.com",
        projectId: "catchxcoin",
        storageBucket: "catchxcoin.firebasestorage.app",
        messagingSenderId: "1044694743228",
        appId: "1:1044694743228:web:a50528274809fc880178b9",
        measurementId: "G-3HL2PJ5SRD",
        databaseURL: "https://catchxcoin-default-rtdb.asia-southeast1.firebasedatabase.app/"
    };

    console.log("Initializing Firebase...");
    const app = firebase.initializeApp(firebaseConfig);
    return firebase.database();
};