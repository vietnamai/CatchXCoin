// Thêm button chuyển đổi súng
const cannonMinusImg = new Image();
cannonMinusImg.src = "images/cannonMinus.png";

const cannonPlusImg = new Image();
cannonPlusImg.src = "images/cannonPlus.png";

const buttons = {
    cannonMinus: { image: cannonMinusImg, x: window.innerWidth / 2 - 120, y: window.innerHeight - 80 },
    cannonPlus: { image: cannonPlusImg, x: window.innerWidth / 2 + 80, y: window.innerHeight - 80 }
};

// Vẽ nút trên canvas
function drawButtons(ctx) {
    Object.values(buttons).forEach(button => {
        ctx.drawImage(button.image, button.x, button.y, 60, 60); // Vẽ nút (kích thước 60x60)
    });
}

// Lắng nghe sự kiện click để thay đổi súng
canvas.addEventListener("click", function (e) {
    const clickX = e.clientX;
    const clickY = e.clientY;

    // Kiểm tra nếu nhấn vào cannonMinus
    if (
        clickX >= buttons.cannonMinus.x &&
        clickX <= buttons.cannonMinus.x + 60 &&
        clickY >= buttons.cannonMinus.y &&
        clickY <= buttons.cannonMinus.y + 60
    ) {
        switchCannon(-1); // Giảm cấp súng
    }

    // Kiểm tra nếu nhấn vào cannonPlus
    if (
        clickX >= buttons.cannonPlus.x &&
        clickX <= buttons.cannonPlus.x + 60 &&
        clickY >= buttons.cannonPlus.y &&
        clickY <= buttons.cannonPlus.y + 60
    ) {
        switchCannon(1); // Tăng cấp súng
    }
});

// Cập nhật hàm vẽ trong `gameLoop` để vẽ các nút
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ súng và đạn
    drawCannonsAndBullets(ctx);

    // Vẽ nút chuyển đổi súng
    drawButtons(ctx);

    requestAnimationFrame(gameLoop);
}