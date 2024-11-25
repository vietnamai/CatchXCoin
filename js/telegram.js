// File: telegram.js

// Hàm xử lý và giao tiếp với Telegram Web App
function initTelegram() {
    // Kiểm tra nếu Telegram Web App SDK có sẵn
    if (typeof Telegram.WebApp === "undefined") {
        alert("Telegram Web App SDK is not available.")
        console.error("Telegram Web App SDK is not available.");
        return;
    }

    // Khởi tạo Telegram Web App
    const tg = Telegram.WebApp;

    // Hiển thị thông tin người dùng
    console.log("User Info:", tg.initDataUnsafe.user);
    alert(tg.initDataUnsafe.user)

    // Lấy thông tin người dùng
    const user = tg.initDataUnsafe.user;
    const userId = user.id;
    const firstName = user.first_name;
    const lastName = user.last_name;
    const username = user.username;
    const avatar = user.photo_url;  // URL của avatar người dùng

    // Lưu thông tin người dùng vào Firebase
    saveUserInfoToFirebase(userId, firstName, lastName, username, avatar);

}

// Gọi hàm khởi tạo Telegram Web App
initTelegram();
alert("2")