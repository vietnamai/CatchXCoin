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

        // Vị trí và hướng di chuyển
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.rotation = Math.random() * 360; // Góc quay ban đầu
        this.speed = Math.random() * (type.mixin.maxSpeed - type.mixin.minSpeed) + type.mixin.minSpeed;

        // Tính toán vận tốc từ góc quay
        this.updateDirection();
    }

    // Cập nhật hướng di chuyển dựa trên góc quay
    updateDirection() {
        const radian = this.rotation * (Math.PI / 180); // Chuyển góc sang radian
        this.speedX = Math.cos(radian) * this.speed;
        this.speedY = Math.sin(radian) * this.speed;
    }

    // Di chuyển cá
    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Kiểm tra nếu cá chạm biên
        if (this.x < 0 || this.x > window.innerWidth) {
            this.rotation = 180 - this.rotation; // Đổi hướng ngang
            this.updateDirection();
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.rotation = 360 - this.rotation; // Đổi hướng dọc
            this.updateDirection();
        }
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

        ctx.save();
        ctx.translate(this.x, this.y); // Chuyển đến vị trí cá
        ctx.rotate((this.rotation * Math.PI) / 180); // Xoay canvas theo góc quay
        ctx.drawImage(
            this.spriteSheet, // Sprite sheet của cá
            sx, sy, sWidth, sHeight, // Cắt khung hình
            -sWidth / 2, -sHeight / 2, sWidth, sHeight // Vẽ khung hình ở vị trí xoay
        );
        ctx.restore();
    }
}

// Dữ liệu loại cá từ sprite sheet (dựa trên R.js)
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
    // Các loại cá khác từ R.js...
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