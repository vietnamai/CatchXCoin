// File: js/canvas.js

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
            fishes.push(new createFish(type, image));
        }
    };
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fishes.forEach(fish => {
        fish.move();
        fish.updateAnimation();
        fish.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();

// Cập nhật lại kích thước của canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});