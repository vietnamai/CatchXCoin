// File: firebase.js

let app, db; // Biến toàn cục để lưu trữ Firebase App và Database

try {
    // Cấu hình Firebase
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
    app = firebase.initializeApp(firebaseConfig); // Khởi tạo Firebase với cấu hình
    db = firebase.database(); // Kết nối tới Realtime Database
    console.log("Firebase initialized successfully.");

} catch (error) {
    console.error("Error initializing Firebase:", error);
}

/**
 * Kiểm tra xem người dùng đã có trên Firebase chưa, nếu chưa thì tạo mới
 * @param {string} userId - ID người dùng Telegram
 * @param {object} userInfo - Thông tin người dùng (first_name, last_name, username, avatar)
 */
function checkAndAddUser(userId, userInfo) {
    const userRef = db.ref('users/' + userId);

    userRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // Nếu người dùng chưa tồn tại, thêm vào
            console.log(`User ${userId} does not exist. Adding to Firebase...`);
            
            // Lưu thông tin người dùng vào Firebase
            userRef.set({
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                username: userInfo.username,
                avatar: userInfo.avatar,  // Lưu ảnh đại diện người dùng
                balance: 0,  // Khởi tạo balance ban đầu cho người dùng
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