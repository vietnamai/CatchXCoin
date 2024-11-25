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

// Lấy đối tượng canvas và context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Đặt kích thước cho canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tạo đối tượng hình nền
const background = new Image();
background.src = randomImage;

background.onload = () => {
    // Khi hình nền tải xong, vẽ nó lên canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
};

// Tạo hiệu ứng di chuyển nền (nếu cần)
let offsetX = 0;
const backgroundSpeed = 1;

function updateBackground() {
    offsetX += backgroundSpeed;
    if (offsetX > canvas.width) {
        offsetX = 0;  // Reset vị trí khi hình nền đi hết
    }

    // Xóa canvas và vẽ lại hình nền
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, offsetX, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
}

// Gọi hàm cập nhật nền 60 lần/giây
setInterval(updateBackground, 1000 / 60);