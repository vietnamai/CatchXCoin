// File: js/telegram.js

// Hàm xử lý và giao tiếp với Telegram Web App
function initTelegram() {
    if (typeof Telegram.WebApp === "undefined") {
        console.error("Telegram Web App SDK is not available.");
        return;
    }

    const tg = Telegram.WebApp;

    try {
        const user = tg.initDataUnsafe.user;
        const userId = user.id;
        const firstName = user.first_name || "";
        const lastName = user.last_name || "";
        const username = user.username || "";
        const avatar = user.photo_url || "";

        checkAndAddUser(userId, {
            first_name: firstName,
            last_name: lastName,
            username: username,
            avatar: avatar,
        });
    } catch (error) {
        console.error("Error during Telegram WebApp initialization:", error);
    }
}

// Lắng nghe sự kiện window.onload để đảm bảo mọi thứ đã sẵn sàng
window.onload = function () {
    console.log("Window loaded. Initializing Telegram Web App...");
    initTelegram();
};