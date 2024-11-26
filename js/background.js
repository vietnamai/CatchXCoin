// File: js/background.js

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

// Hàm khởi tạo nền ngẫu nhiên
export const initializeBackground = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url(${randomImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
};