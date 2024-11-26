// File: js/canvas.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mảng lưu các đối tượng cá
const fishes = [];

// Tạo cá từ R_Fish.js
fishTypes.forEach(type => {
    const image = new Image();
    image.src = `images/${type.image}`;

    image.onload = () => {
        for (let i = 0; i < type.mixin.maxNumGroup; i++) {
            try {
                // Tạo đối tượng cá mới từ thông số trong R_Fish.js
                const fish = new createFish(type, image);
                fishes.push(fish);  // Thêm cá vào mảng
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Xóa canvas trước khi vẽ lại

    // Cập nhật và vẽ tất cả các con cá
    fishes.forEach(fish => {
        fish.move();  // Di chuyển cá
        fish.updateAnimation();  // Cập nhật hoạt ảnh của cá
        
        // Lấy thông tin vẽ từ cá và vẽ lên canvas
        const drawInfo = fish.getDrawInfo();
        ctx.save();
        ctx.translate(drawInfo.x, drawInfo.y);
        ctx.drawImage(fish.spriteSheet, drawInfo.sx, drawInfo.sy, drawInfo.width, drawInfo.height, -drawInfo.width / 2, -drawInfo.height / 2, drawInfo.width, drawInfo.height);
        ctx.restore();
    });

    requestAnimationFrame(gameLoop);  // Gọi gameLoop tiếp để tiếp tục vòng lặp
}

gameLoop();  // Bắt đầu vòng lặp game

// Cập nhật lại kích thước của canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});