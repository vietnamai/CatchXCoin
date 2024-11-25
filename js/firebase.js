// File: js/firebase.js

// Cấu hình Firebase của bạn
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
firebase.initializeApp(firebaseConfig);

// Lấy thông tin người dùng từ Telegram và lưu vào Firebase
function saveUserInfoToFirebase(userId, firstName, lastName, username, avatar) {
    const userRef = firebase.database().ref('users/' + userId);
    
    // Kiểm tra xem người dùng đã có trong database chưa
    userRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // Nếu người dùng chưa có, thêm vào Firebase
            userRef.set({
                first_name: firstName,
                last_name: lastName,
                username: username,
                avatar: avatar,
                balance: 0,  // Khởi tạo balance ban đầu cho người dùng
            }).then(() => {
                console.log("User information saved to Firebase.");
            }).catch((error) => {
                console.error("Error saving user info: ", error);
            });
        }
    });
}