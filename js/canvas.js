// File: js/app.js (hoặc file tương tự)

// Khởi tạo canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Đặt kích thước cho canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cập nhật lại kích thước của canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});