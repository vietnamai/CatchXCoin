// File: telegram.js

// Hàm xử lý và giao tiếp với Telegram Web App
function initTelegram() {
    // Kiểm tra nếu Telegram Web App SDK có sẵn
    if (typeof Telegram.WebApp === "undefined") {
        alert("error 1")
        console.error("Telegram Web App SDK is not available.");
        return;
    }

    // Khởi tạo Telegram Web App
    const tg = Telegram.WebApp;

    try {
        // Kiểm tra và log thông tin người dùng
        const user = tg.initDataUnsafe.user;
        console.log("User Info:", user);
        alert(user.last_name)
        const userId = user.id;
        const firstName = user.first_name;
        const lastName = user.last_name;
        const username = user.username;
        const avatar = user.photo_url; // URL của avatar người dùng

        // Lưu thông tin người dùng vào Firebase
        saveUserInfoToFirebase(userId, firstName, lastName, username, avatar);

    } catch (error) {
        alert("error 2")
        console.error("Error during Telegram WebApp initialization:", error);
    }
}

// Lắng nghe sự kiện window.onload để đảm bảo mọi thứ đã sẵn sàng
window.onload = function () {
    console.log("Window loaded. Initializing Telegram Web App...");
    initTelegram();
};