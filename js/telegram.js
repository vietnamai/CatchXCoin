// File: js/telegram.js

// Hàm khởi tạo Telegram Web App
export const initializeTelegram = (firebaseDb) => {
    if (typeof Telegram.WebApp === "undefined") {
        console.error("Telegram Web App SDK is not available.");
        return;
    }

    const tg = Telegram.WebApp;
    const user = tg.initDataUnsafe.user;

    if (user) {
        const { id: userId, first_name: firstName, last_name: lastName, username, photo_url: avatar } = user;
        console.log("User Info:", user);

        // Lưu thông tin người dùng vào Firebase
        const userRef = firebaseDb.ref(`users/${userId}`);
        userRef.once("value", snapshot => {
            if (!snapshot.exists()) {
                userRef.set({
                    first_name: firstName || "",
                    last_name: lastName || "",
                    username: username || "",
                    avatar: avatar || "",
                    balance: 0
                }).then(() => console.log("User added successfully."));
            } else {
                console.log("User already exists.");
            }
        });
    }
};