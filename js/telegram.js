// File: telegram.js

// Hàm xử lý và giao tiếp với Telegram Web App
function initTelegram() {
    // Kiểm tra nếu Telegram Web App SDK có sẵn
    if (typeof Telegram.WebApp === "undefined") {
        console.error("Telegram Web App SDK is not available.");
        return;
    }

    // Khởi tạo Telegram Web App
    const tg = Telegram.WebApp;

    // Hiển thị thông tin người dùng
    console.log("User Info:", tg.initDataUnsafe.user);

    // Lấy thông tin người dùng
    const user = tg.initDataUnsafe.user;
    const userId = user.id;
    const firstName = user.first_name;
    const lastName = user.last_name;
    const username = user.username;
    const avatar = user.photo_url;  // URL của avatar người dùng

    // Lưu thông tin người dùng vào Firebase (giả sử sử dụng Firebase SDK)
    saveUserInfoToFirebase(userId, firstName, lastName, username, avatar);

    // Gửi dữ liệu đến bot Telegram (nếu cần thiết)
    // Ví dụ: gửi "balance" khi người dùng nhấn nút
    tg.MainButton.onClick(() => {
        // Bạn có thể thực hiện các hành động sau khi người dùng nhấn nút
        console.log("Balance check clicked!");
    });

    tg.MainButton.text = "Check Balance";
    tg.MainButton.show();
}

// Hàm lưu thông tin người dùng vào Firebase
function saveUserInfoToFirebase(userId, firstName, lastName, username, avatar) {
    // Thực hiện lưu thông tin người dùng vào Firebase
    const db = firebase.database();
    const userRef = db.ref('users/' + userId);

    userRef.set({
        first_name: firstName,
        last_name: lastName,
        username: username,
        avatar: avatar,
        balance: 0,  // Khởi tạo balance ban đầu cho người dùng
    }).then(() => {
        console.log(`User ${firstName} ${lastName} saved to Firebase.`);
    }).catch((error) => {
        console.error("Error saving user info to Firebase:", error);
    });
}

// Gọi hàm khởi tạo Telegram Web App
initTelegram();