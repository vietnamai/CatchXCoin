// File: firebase.js

let app, db; // Biến toàn cục để lưu trữ Firebase App và Database

try {
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
    console.log("Initializing Firebase...");
    app = firebase.initializeApp(firebaseConfig); // Khởi tạo Firebase với cấu hình của bạn
    db = firebase.database(); // Kết nối tới Realtime Database
    console.log("Firebase initialized successfully.");

} catch (error) {
    alert("Error initializing Firebase")
    console.error("Error initializing Firebase:", error);
}

/**
 * Hàm lưu thông tin người dùng vào Firebase
 * @param {string} userId - ID người dùng Telegram
 * @param {string} firstName - Tên đầu của người dùng
 * @param {string} lastName - Họ của người dùng
 * @param {string} username - Tên tài khoản Telegram của người dùng
 * @param {string} avatar - URL avatar của người dùng
 */
function saveUserInfoToFirebase(userId, firstName, lastName, username, avatar) {
    if (!db) {
        alert("Firebase Database í not initialized")
        console.error("Firebase Database is not initialized.");
        return;
    }

    const userRef = db.ref('users/' + userId); // Tạo tham chiếu tới node "users" trong Realtime Database

    console.log("Preparing to save user:", {
        userId,
        firstName,
        lastName,
        username,
        avatar,
    });

    userRef
        .set({
            first_name: firstName,
            last_name: lastName,
            username: username,
            avatar: avatar, // Lưu ảnh đại diện người dùng
            balance: 0,  // Khởi tạo balance ban đầu cho người dùng
        })
        .then(() => {
            alert("user saved to Firebase")
            console.log(`User ${firstName} ${lastName} saved to Firebase successfully.`);
        })
        .catch((error) => {
            alert("Error saving user info to Firebase")
            console.error("Error saving user info to Firebase:", error);
        });
}