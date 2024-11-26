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
    }).then(() => {
        console.log(`User ${userId} balance updated to ${balance}`);
    }).catch((error) => {
        console.error(`Error updating user ${userId} balance:`, error);
    });
}

// Kiểm tra và thêm người dùng vào Firebase nếu chưa tồn tại
function checkAndAddUser(userId, userInfo) {
    const userRef = db.ref('users/' + userId);

    userRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            console.log(`User ${userId} does not exist. Adding to Firebase...`);
            userRef.set({
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                username: userInfo.username,
                avatar: userInfo.avatar,
                balance: 0, // Khởi tạo balance ban đầu cho người dùng
            }).then(() => {
                console.log(`User ${userId} added to Firebase with details.`);
            }).catch((error) => {
                console.error(`Error adding user ${userId} to Firebase:`, error);
            });
        } else {
            console.log(`User ${userId} already exists in Firebase.`);
        }
    }).catch((error) => {
        console.error("Error checking user existence:", error);
    });
}