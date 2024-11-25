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

// Chọn ngẫu nhiên hình nền
const randomImage = images[Math.floor(Math.random() * images.length)];

// Đặt hình nền cho body
document.body.style.backgroundImage = `url(${randomImage})`;