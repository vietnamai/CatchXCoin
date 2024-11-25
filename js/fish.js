// File: js/fish.js

// Lớp Fish quản lý cá và hoạt ảnh
class Fish {
    constructor(type, spriteSheet) {
        this.type = type; // Loại cá (fish1, fish2, ...)
        this.spriteSheet = spriteSheet; // Sprite sheet của cá
        this.frames = type.frames; // Danh sách các khung hình
        this.currentFrame = 0; // Khung hình hiện tại
        this.frameDelay = 5; // Tốc độ chuyển khung hình
        this.delayCounter = 0;

        // Kích thước từng khung hình
        const { rect } = this.frames[0];
        this.frameWidth = rect[2];
        this.frameHeight = rect[3];

        // Vị trí và tốc độ di chuyển
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedX = Math.random() * (type.mixin.maxSpeed - type.mixin.minSpeed) + type.mixin.minSpeed;
        this.speedY = Math.random() * (type.mixin.maxSpeed - type.mixin.minSpeed) + type.mixin.minSpeed;
    }

    // Di chuyển cá
    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Đổi hướng nếu cá chạm biên
        if (this.x > window.innerWidth || this.x < 0) this.speedX = -this.speedX;
        if (this.y > window.innerHeight || this.y < 0) this.speedY = -this.speedY;
    }

    // Cập nhật hoạt ảnh
    updateAnimation() {
        this.delayCounter++;
        if (this.delayCounter >= this.frameDelay) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            this.delayCounter = 0;
        }
    }

    // Vẽ cá lên canvas
    draw(ctx) {
        const { rect } = this.frames[this.currentFrame];
        const [sx, sy, sWidth, sHeight] = rect;

        ctx.drawImage(
            this.spriteSheet, // Sprite sheet của cá
            sx, sy, sWidth, sHeight, // Cắt khung hình
            this.x, this.y, sWidth, sHeight // Vẽ lên canvas
        );
    }
}

// Dữ liệu loại cá từ sprite sheet
const fishTypes = [
    {
        frames: [
            { rect: [0, 0, 55, 37] },
            { rect: [0, 37, 55, 37] },
            { rect: [0, 74, 55, 37] },
            { rect: [0, 111, 55, 37] }
        ],
        mixin: { maxSpeed: 2, minSpeed: 0.5, maxNumGroup: 5 }
    },
    {
        frames: [
            { rect: [0, 0, 78, 64] },
            { rect: [0, 64, 78, 64] },
            { rect: [0, 128, 78, 64] },
            { rect: [0, 192, 78, 64] }
        ],
        mixin: { maxSpeed: 1.5, minSpeed: 0.3, maxNumGroup: 6 }
    },
    {
        frames: [
            { rect: [0, 0, 72, 56] },
            { rect: [0, 56, 72, 56] },
            { rect: [0, 112, 72, 56] },
            { rect: [0, 168, 72, 56] },
            { rect: [0, 224, 72, 56] }
        ],
        mixin: { maxSpeed: 3, minSpeed: 1, maxNumGroup: 3 }
    },
    {
        frames: [
            { rect: [0, 0, 80, 60] },
            { rect: [0, 60, 80, 60] },
            { rect: [0, 120, 80, 60] },
            { rect: [0, 180, 80, 60] }
        ],
        mixin: { maxSpeed: 2.2, minSpeed: 0.8, maxNumGroup: 4 }
    },
    {
        frames: [
            { rect: [0, 0, 90, 70] },
            { rect: [0, 70, 90, 70] },
            { rect: [0, 140, 90, 70] },
            { rect: [0, 210, 90, 70] }
        ],
        mixin: { maxSpeed: 1.8, minSpeed: 0.7, maxNumGroup: 3 }
    },
    {
        frames: [
            { rect: [0, 0, 100, 80] },
            { rect: [0, 80, 100, 80] },
            { rect: [0, 160, 100, 80] },
            { rect: [0, 240, 100, 80] }
        ],
        mixin: { maxSpeed: 2.5, minSpeed: 1.0, maxNumGroup: 4 }
    },
    {
        frames: [
            { rect: [0, 0, 120, 90] },
            { rect: [0, 90, 120, 90] },
            { rect: [0, 180, 120, 90] },
            { rect: [0, 270, 120, 90] }
        ],
        mixin: { maxSpeed: 2.0, minSpeed: 0.6, maxNumGroup: 5 }
    }
];

// Tải sprite sheet và tạo đối tượng cá
const spriteSheets = {};
const fishes = [];
fishTypes.forEach((type, index) => {
    const image = new Image();
    image.src = `images/fish${index + 1}.png`; // Đường dẫn đến sprite sheet
    spriteSheets[`fish${index + 1}`] = image;

    image.onload = () => {
        for (let i = 0; i < type.mixin.maxNumGroup; i++) {
            fishes.push(new Fish(type, image));
        }
    };
});

// Game loop
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