// File: js/firebase.js

let app, db; // Biến toàn cục để lưu trữ Firebase App và Database

try {
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

    app = firebase.initializeApp(firebaseConfig); // Khởi tạo Firebase với cấu hình
    db = firebase.database(); // Kết nối tới Realtime Database

} catch (error) {
    console.error("Error initializing Firebase:", error);
}

// Cập nhật số dư token của người dùng
function updateUserBalance(userId, balance) {
    const userRef = db.ref('users/' + userId);
    userRef.update({
        balance: balance