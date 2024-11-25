// File: js/fish.js

// Hàm lấy khung hình cá theo trạng thái
function getFishAnimation(type, state) {
    const fish = fishTypes.find(f => f.image.includes(type)); // Lấy loại cá dựa vào tên file
    if (!fish) {
        console.error(`Fish type "${type}" not found.`);
        return null;
    }

    // Chọn khung hình dựa trên trạng thái
    const frames = fish.frames.filter(frame =>
        state === "swim" ? (frame.label === "swim" || frame.jump === "swim") :
        state === "capture" ? (frame.label === "capture" || frame.jump === "capture") : false
    );

    if (frames.length === 0) {
        console.error(`No frames found for state "${state}" in fish type "${type}".`);
        return null;
    }

    return {
        image: fish.image,
        frames: frames,
        polyArea: fish.polyArea,
        mixin: fish.mixin
    };
}

// Hàm tạo đối tượng cá
function createFish(type) {
    const swimAnimation = getFishAnimation(type, "swim"); // Lấy hoạt ảnh bơi
    if (!swimAnimation) return null;

    const fish = {
        type: type,
        image: swimAnimation.image,
        frames: swimAnimation.frames,
        polyArea: swimAnimation.polyArea,
        mixin: swimAnimation.mixin,
        x: Math.random() * window.innerWidth, // Vị trí ban đầu ngẫu nhiên
        y: Math.random() * window.innerHeight,
        speedX: Math.random() * (swimAnimation.mixin.maxSpeed - swimAnimation.mixin.minSpeed) + swimAnimation.mixin.minSpeed,
        speedY: Math.random() * (swimAnimation.mixin.maxSpeed - swimAnimation.mixin.minSpeed) + swimAnimation.mixin.minSpeed,
        state: "swim" // Trạng thái ban đầu là bơi
    };

    return fish;
}

// Hàm cập nhật trạng thái cá
function updateFishState(fish, state) {
    const animation = getFishAnimation(fish.type, state);
    if (!animation) return;

    fish.frames = animation.frames;
    fish.state = state;

    if (state === "capture") {
        // Thêm logic khi cá bị bắn chết
        console.log(`Fish ${fish.type} captured!`);
    }
}

// Hàm vẽ cá lên canvas
function drawFish(ctx, fish, frameIndex) {
    const frame = fish.frames[frameIndex % fish.frames.length];
    const image = new Image();
    image.src = `images/${fish.image}`;

    image.onload = () => {
        ctx.drawImage(
            image,
            frame.rect[0], frame.rect[1], frame.rect[2], frame.rect[3], // Sprite frame
            fish.x, fish.y, frame.rect[2], frame.rect[3]                // Vị trí và kích thước trên canvas
        );
    };
}

// Hàm cập nhật vị trí cá
function updateFishPosition(fish) {
    fish.x += fish.speedX;
    fish.y += fish.speedY;

    // Đảo hướng nếu cá chạm mép màn hình
    if (fish.x < 0 || fish.x + fish.frames[0].rect[2] > window.innerWidth) {
        fish.speedX *= -1;
    }
    if (fish.y < 0 || fish.y + fish.frames[0].rect[3] > window.innerHeight) {
        fish.speedY *= -1;
    }
}

// Hàm chính cập nhật và vẽ tất cả cá
function renderFishes(ctx, fishes) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas

    fishes.forEach((fish, index) => {
        updateFishPosition(fish);                     // Cập nhật vị trí
        drawFish(ctx, fish, index);                   // Vẽ cá
    });

    requestAnimationFrame(() => renderFishes(ctx, fishes)); // Lặp lại
}

// Khởi tạo game
function initFishGame() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const fishes = [];
    const fishTypesList = ["fish1", "fish2", "fish3", "fish4", "fish5", "fish6", "fish7"];

    // Tạo cá ngẫu nhiên
    for (let i = 0; i < 20; i++) {
        const randomType = fishTypesList[Math.floor(Math.random() * fishTypesList.length)];
        const fish = createFish(randomType);
        if (fish) fishes.push(fish);
    }

    // Bắt đầu vẽ cá
    renderFishes(ctx, fishes);
}

// Chạy game khi window load
window.onload = initFishGame;