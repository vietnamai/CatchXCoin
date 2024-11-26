// File: js/cannon.js
import {canvas, ctx} from "/canvas.js"
// Lấy dữ liệu từ R_Cannon.js
let currentCannonIndex = 0; // Vị trí súng hiện tại
let currentCannon = null;

// Hàm khởi tạo súng từ R_Cannon.js
function createCannon(index) {
    const cannonConfig = cannonTypes[index]; // Lấy cấu hình từ R_Cannon.js

    const cannonImage = new Image();
    cannonImage.src = `images/${cannonConfig.image}`;

    cannonImage.onload = () => {
        currentCannon = {
            type: index + 1, // Loại súng (1-7)
            power: cannonConfig.power,
            image: cannonImage,
            frames: cannonConfig.frames,
            bullet: cannonConfig.bullet,
            x: window.innerWidth / 2,
            y: window.innerHeight - 100,
            rotation: 0
        };
    };
}

// Vẽ súng lên canvas
function drawCannon(ctx) {
    if (!currentCannon) return;

    const { image, x, y, rotation } = currentCannon;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
}

// Xoay súng theo con trỏ chuột
function aimCannon(targetX, targetY) {
    if (!currentCannon) return;

    const dx = targetX - currentCannon.x;
    const dy = targetY - currentCannon.y;
    currentCannon.rotation = (Math.atan2(dy, dx) * 180) / Math.PI;
}

// Chuyển đổi loại súng
function switchCannon(change) {
    currentCannonIndex = (currentCannonIndex + change + cannonTypes.length) % cannonTypes.length;
    createCannon(currentCannonIndex); // Tạo súng mới
}

// Thêm sự kiện nhấp chuột để chuyển đổi súng
canvas.addEventListener("click", function (e) {
    const { clientX: clickX, clientY: clickY } = e;

    // Kiểm tra nếu nhấn vào nút cannonMinus
    if (
        clickX >= buttons.cannonMinus.x &&
        clickX <= buttons.cannonMinus.x + 60 &&
        clickY >= buttons.cannonMinus.y &&
        clickY <= buttons.cannonMinus.y + 60
    ) {
        switchCannon(-1); // Giảm cấp độ súng
    }

    // Kiểm tra nếu nhấn vào nút cannonPlus
    if (
        clickX >= buttons.cannonPlus.x &&
        clickX <= buttons.cannonPlus.x + 60 &&
        clickY >= buttons.cannonPlus.y &&
        clickY <= buttons.cannonPlus.y + 60
    ) {
        switchCannon(1); // Tăng cấp độ súng
    }
});

// Lắng nghe sự kiện di chuột để xoay súng
canvas.addEventListener("mousemove", function (e) {
    aimCannon(e.clientX, e.clientY);
});

// Khởi tạo súng ban đầu
createCannon(currentCannonIndex);

// Vẽ nút chuyển đổi súng
function drawButtons(ctx) {
    Object.values(buttons).forEach(button => {
        ctx.drawImage(button.image, button.x, button.y, 60, 60);
    });
}

// Cập nhật vòng lặp game
function drawCannonsAndButtons(ctx) {
    drawCannon(ctx); // Vẽ súng
    drawButtons(ctx); // Vẽ nút chuyển đổi
}