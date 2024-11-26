// File: js/telegram.js

/**
 * Telegram module for handling user interactions and data
 */
const TelegramModule = (() => {
    /**
     * Khởi tạo và xử lý giao diện Web App của Telegram
     */
    const initialize = () => {
        if (typeof Telegram.WebApp === "undefined") {
            console.error("Telegram Web App SDK không khả dụng.");
            return;
        }

        const tg = Telegram.WebApp;

        try {
            // Lấy thông tin người dùng từ Telegram
            const user = tg.initDataUnsafe.user;
            console.log("Thông tin người dùng:", user);

            const userId = user.id;
            const firstName = user.first_name || "";
            const lastName = user.last_name || "";
            const username = user.username || "";
            const avatar = user.photo_url || ""; // URL ảnh đại diện

            // Gửi thông tin người dùng đến Firebase
            FirebaseModule.checkAndAddUser(userId, {
                first_name: firstName,
                last_name: lastName,
                username: username,
                avatar: avatar,
            });
        } catch (error) {
            console.error("Lỗi khi khởi tạo Telegram Web App:", error);
        }
    };

    // Public API
    return {
        initialize
    };
})();

// Khởi chạy Telegram Web App sau khi tải trang
window.addEventListener("load", TelegramModule.initialize);
