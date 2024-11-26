// File: js/canvas.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Mảng lưu cá và súng
const fishes = [];
let currentCannonIndex = 0; // Vị trí súng hiện tại
let currentCannon = null;

// Tạo cá và súng
fishTypes.forEach(type => {
    const image = new Image();
    image.src = `images/${type.image}`;
    image.onload = () => {
        for (let i = 0; i < type.mixin.maxNumGroup; i++) {
            fishes.push(new createFish(type, image));
        }
    };
});

createCannon(currentCannonIndex); // Khởi tạo súng ban đầu

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ và cập nhật cá
    fishes.forEach(fish => {
        fish.move();
        fish.updateAnimation();
        fish.draw(ctx);
    });

    drawCannonsAndButtons(ctx); // Vẽ súng và các nút

    requestAnimationFrame(gameLoop);
}

gameLoop();

canvas.addEventListener("click", function (e) {
    const { clientX, clientY } = e;

    // Kiểm tra nếu súng bắn trúng cá
    fishes.forEach(fish => {
        // Kiểm tra nếu cá bị trúng đạn
        if (/* điều kiện trúng đạn */) {
            // Cộng token cho người chơi
            addToken(fish.mixin.coin);

            // Cập nhật token của người chơi trong Firebase
            updateUserBalance(userId, tokenBalance);

            // Thay đổi trạng thái của cá sang "capture"
            fish.changeState("capture");
        }
    });

    // Kiểm tra nếu bắn vào nút chuyển đổi súng
    // ... (code kiểm tra nút chuyển đổi súng)
});

// Hàm cộng token
function addToken(amount) {
    // Cộng số token vào tài khoản người chơi
    tokenBalance += amount;
}

// Cập nhật token vào Firebase
function updateUserBalance(userId, balance) {
    const userRef = firebase.database().ref('users/' + userId);
    userRef.update({ balance: balance });
}


export {canvas, ctx}