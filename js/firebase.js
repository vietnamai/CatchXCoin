// File: firebase.js

// Lưu thông tin người dùng vào Firebase
function saveUserInfoToFirebase(userId, firstName, lastName, username, avatar) {
    const db = firebase.database(); // Sử dụng Realtime Database của Firebase
    const userRef = db.ref('users/' + userId);

    userRef.set({
        first_name: firstName,
        last_name: lastName,
        username: username,
        avatar: avatar, // Lưu ảnh đại diện người dùng
        balance: 0,  // Khởi tạo balance ban đầu cho người dùng
    }).then(() => {
        console.log(`User ${firstName} ${lastName} saved to Firebase.`);
    }).catch((error) => {
        console.error("Error saving user info to Firebase:", error);
    });
}