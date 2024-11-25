// File: firebase.js

// Cấu hình Firebase (API key, Project ID, ... được cung cấp trong Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCOHdI4tVObleAkiuIUymMBNEz3OPue-7Y",
  authDomain: "catchxcoin.firebaseapp.com",
  projectId: "catchxcoin",
  storageBucket: "catchxcoin.firebasestorage.app",
  messagingSenderId: "1044694743228",
  appId: "1:1044694743228:web:a50528274809fc880178b9",
  measurementId: "G-3HL2PJ5SRD"
};

// Khởi tạo Firebase
const app = firebase.initializeApp(firebaseConfig);  // Khởi tạo Firebase với cấu hình của bạn
const db = firebase.database(); // Kết nối tới Realtime Database
const analytics = firebase.analytics(); // Kết nối tới Firebase Analytics

// Lưu thông tin người dùng vào Firebase
function saveUserInfoToFirebase(userId, firstName, lastName, username, avatar) {
    const userRef = db.ref('users/' + userId); // Tạo tham chiếu tới node "users" trong Realtime Database

    userRef.set({
        first_name: firstName,
        last_name: lastName,
        username: username,
        avatar: avatar, // Lưu ảnh đại diện người dùng
        balance: 0,  // Khởi tạo balance ban đầu cho người dùng
    }).then(() => {
        alert("firebase ok")
        console.log(`User ${firstName} ${lastName} saved to Firebase.`);
    }).catch((error) => {
        alert("firebase error")
        console.error("Error saving user info to Firebase:", error);
    });
}