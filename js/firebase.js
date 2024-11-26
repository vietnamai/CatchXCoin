// File: js/firebase.js

/**
 * Firebase module for managing user data and interactions
 */
const Firebase = (() => {
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
        app = firebase.initializeApp(firebaseConfig); // Khởi tạo Firebase
        db = firebase.database(); // Kết nối tới Realtime Database
        console.log("Firebase initialized successfully.");
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }

    /**
     * Kiểm tra và thêm người dùng vào Firebase nếu chưa tồn tại
     * @param {string} userId - ID người dùng Telegram
     * @param {object} userInfo - Thông tin người dùng (first_name, last_name, username, avatar)
     */
    const checkAndAddUser = (userId, userInfo) => {
        const userRef = db.ref(`users/${userId}`);

        userRef.once("value")
            .then((snapshot) => {
                if (!snapshot.exists()) {
                    console.log(`User ${userId} does not exist. Adding to Firebase...`);

                    return userRef.set({
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        username: userInfo.username,
                        avatar: userInfo.avatar, // Lưu ảnh đại diện người dùng
                        balance: 0 // Khởi tạo balance ban đầu
                    });
                } else {
                    console.log(`User ${userId} already exists in Firebase.`);
                }
            })
            .then(() => {
                console.log(`User ${userId} added/verified successfully.`);
            })
            .catch((error) => {
                console.error("Error handling user data in Firebase:", error);
            });
    };

    /**
     * Cập nhật số dư token cho người dùng
     * @param {string} userId - ID người dùng Telegram
     * @param {number} amount - Số lượng token cần cộng hoặc trừ
     */
    const updateUserBalance = (userId, amount) => {
        const userRef = db.ref(`users/${userId}/balance`);

        userRef.transaction((currentBalance) => {
            return (currentBalance || 0) + amount;
        })
            .then(() => {
                console.log(`User ${userId} balance updated successfully by ${amount}.`);
            })
            .catch((error) => {
                console.error("Error updating user balance:", error);
            });
    };

    // Public API
    return {
        checkAndAddUser,
        updateUserBalance
    };
})();
