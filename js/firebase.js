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

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/**
 * Kiểm tra xem người dùng đã có trên Firebase chưa, nếu chưa thì tạo mới
 * @param {string} userId - ID người dùng Telegram
 * @param {object} userInfo - Thông tin người dùng (first_name, last_name, username, avatar)
 */
function checkAndAddUser(userId, userInfo) {
    const userRef = db.ref('users/' + userId);

    userRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            // Nếu người dùng chưa tồn tại, thêm vào Firebase
            console.log(`User ${userId} does not exist. Adding to Firebase...`);
            userRef.set({
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                username: userInfo.username,
                avatar: userInfo.avatar,  // Lưu ảnh đại diện người dùng
                balance: 0,  // Khởi tạo balance ban đầu cho người dùng
            }).then(() => {
                console.log(`User ${userId} added to Firebase.`);
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

/**
 * Lưu thông tin người dùng vào localStorage và Firebase
 * @param {string} userId - ID người dùng Telegram
 * @param {string} firstName - Tên người dùng
 * @param {string} lastName - Họ người dùng
 * @param {string} username - Tên người dùng trên Telegram
 * @param {string} avatar - URL ảnh đại diện
 */
function saveUserData(userId, firstName, lastName, username, avatar) {
    // Kiểm tra nếu có thông tin người dùng trong localStorage
    const userFromLocalStorage = JSON.parse(localStorage.getItem('userData'));

    if (userFromLocalStorage) {
        // Nếu userId trong localStorage khác với userId hiện tại, cần cập nhật
        if (userFromLocalStorage.userId !== userId) {
            console.log("User ID mismatch, updating localStorage...");
            localStorage.setItem('userData', JSON.stringify({
                userId: userId,
                firstName,
                lastName,
                username,
                avatar,
                balance: 0 // Có thể cập nhật balance sau
            }));
            // Cập nhật Firebase với userId mới
            checkAndAddUser(userId, { first_name: firstName, last_name: lastName, username, avatar });
        } else {
            // Nếu userId trùng khớp, sử dụng dữ liệu trong localStorage
            console.log("User ID matches. Using existing data.");
            // Cập nhật số dư nếu cần thiết
            updateUserBalance(userId, 0); // Khởi tạo balance nếu chưa có
        }
    } else {
        // Nếu chưa có dữ liệu, lưu vào localStorage và Firebase
        console.log("No local data found. Saving to localStorage...");
        localStorage.setItem('userData', JSON.stringify({
            userId: userId,
            firstName,
            lastName,
            username,
            avatar,
            balance: 0 // Khởi tạo balance ban đầu
        }));
        checkAndAddUser(userId, { first_name: firstName, last_name: lastName, username, avatar });
    }
}

/**
 * Cập nhật số dư của người dùng trong Firebase
 * @param {string} userId - ID người dùng Telegram
 * @param {number} tokenAmount - Số lượng token cần cập nhật (+ hoặc -)
 */
function updateUserBalance(userId, tokenAmount) {
    const userRef = db.ref('users/' + userId);

    userRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log(`Current balance of user ${userId}:`, userData.balance);
            // Cập nhật balance trong Firebase (cộng hoặc trừ tokenAmount)
            const newBalance = userData.balance + tokenAmount;
            userRef.update({ balance: newBalance }).then(() => {
                console.log(`Balance updated for user ${userId}. New balance: ${newBalance}`);
            }).catch((error) => {
                console.error(`Error updating balance for user ${userId}:`, error);
            });
        } else {
            console.log(`User ${userId} not found in Firebase.`);
        }
    }).catch((error) => {
        console.error("Error fetching user data:", error);
    });
}

/**
 * Hàm lấy thông tin người dùng từ Telegram Web App và lưu vào Firebase và localStorage
 */
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
        const avatar = user.photo_url || ""; // URL của avatar người dùng

        // Lưu thông tin người dùng vào Firebase và localStorage
        saveUserData(userId, firstName, lastName, username, avatar);
    } catch (error) {
        console.error("Error during Telegram WebApp initialization:", error);
    }
}

// Lắng nghe sự kiện window.onload để đảm bảo mọi thứ đã sẵn sàng
window.onload = function () {
    console.log("Window loaded. Initializing Telegram Web App...");
    initTelegram();
};