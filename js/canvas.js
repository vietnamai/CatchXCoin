// File: js/canvas.js

import { createFish } from './fish.js';   // Import hàm tạo cá
import { drawCannonsAndButtons } from './cannon.js'; // Import hàm vẽ súng và nút chuyển đổi

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mảng lưu cá
const fishes = [];

// Tạo cá từ R_Fish.js
fishTypes.forEach(type => {
    const image = new Image();
    image.src = `images/${type.image}`;

    image.onload = () => {
        for (let i = 0; i < type.mixin.maxNumGroup; i++) {
            try {
                const fish = new createFish(type, image);
                fishes.push(fish);
            } catch (error) {
                console.error(`Error creating fish: ${error.message}`);
            }
        }
    };

    image.onerror = () => {
        console.error(`Failed to load image for fish type: ${type.image}`);
    };
});

// Hàm vòng lặp game
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ cá
    fishes.forEach(fish => {
        fish.move();
        fish.updateAnimation();
        fish.draw(ctx);
    });

    // Vẽ súng và các nút chuyển đổi
    drawCannonsAndButtons(ctx);

    // Tiếp tục vòng lặp game
    requestAnimationFrame(gameLoop);
}

// Khởi động vòng lặp game
gameLoop();

// Cập nhật lại kích thước của canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});