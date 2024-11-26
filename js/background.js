// File: js/background.js

/**
 * Background module for managing dynamic backgrounds
 */
const Background = (() => {
    // Danh sách hình nền
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
     * Initialize the background with a random image
     */
    const initialize = () => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        document.body.style.backgroundImage = `url(${randomImage})`;
        document.body.style.backgroundSize = "cover";  // Đảm bảo hình nền phủ toàn bộ màn hình
        document.body.style.backgroundPosition = "center";  // Đặt vị trí hình nền ở trung tâm
    };

    // Public API
    return {
        initialize
    };
})();

// Initialize background on page load
window.addEventListener("load", Background.initialize);