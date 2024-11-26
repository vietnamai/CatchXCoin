// File: js/background.js

/**
 * Quản lý hình nền động cho game
 */
const Background = (() => {
    // Danh sách các hình nền
    const images = [
        "images/Bgg1.jpg",
        "images/Bgg2.jpg",
        "images/Bgg3.jpg",
        "images/Bgg4.jpg",
        "images/Bgg5.jpg",
        "images/Bgg6.jpg",
        "images/Bgg7.jpg",
        "images/Bgg8.jpg"
    ];

    /**
     * Khởi tạo hình nền với hình ảnh ngẫu nhiên
     */
    const initialize = () => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        document.body.style.backgroundImage = `url(${randomImage})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    };

    // API công khai
    return {
        initialize
    };
})();

// Khởi tạo hình nền khi tải trang xong
window.addEventListener("load", Background.initialize);
