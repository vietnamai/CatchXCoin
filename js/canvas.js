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

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fishes.forEach(fish => {
        fish.move();
        fish.updateAnimation();
        fish.draw(ctx);

        // Giả lập chuyển sang trạng thái "capture" nếu x < 100 (chỉ để kiểm tra)
        if (fish.x < 100 && fish.state !== "capture") {
            fish.changeState("capture");
        }

        // Giả lập chuyển về trạng thái "swim" nếu x > 300
        if (fish.x > 300 && fish.state !== "swim") {
            fish.changeState("swim");
        }
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();

// Cập nhật lại kích thước của canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});