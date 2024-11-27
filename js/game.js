import { fishTypes } from './R_Fish.js';

class Fish {
    constructor(type, canvasWidth, canvasHeight) {
        this.type = type;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.image = new Image();
        this.image.src = `images/${type.image}`;
        this.frames = type.frames;
        this.mixin = type.mixin;

        // Khởi tạo vị trí và tốc độ
        this.x = Math.random() > 0.5 ? -this.mixin.regX : canvasWidth + this.mixin.regX;
        this.y = Math.random() * canvasHeight;
        this.speed = Math.random() * (this.mixin.maxSpeed - this.mixin.minSpeed) + this.mixin.minSpeed;
        this.direction = this.x < 0 ? 1 : -1; // 1: từ trái sang phải, -1: từ phải sang trái
        this.currentFrame = 0;
        this.frameInterval = this.mixin.interval;
        this.frameCounter = 0;
    }

    update() {
        // Di chuyển cá
        this.x += this.speed * this.direction;

        // Nếu rời khỏi màn hình, reset vị trí
        if (this.direction === 1 && this.x > this.canvasWidth + this.mixin.regX) {
            this.x = -this.mixin.regX;
        } else if (this.direction === -1 && this.x < -this.mixin.regX) {
            this.x = this.canvasWidth + this.mixin.regX;
        }

        // Cập nhật khung hình
        this.frameCounter++;
        if (this.frameCounter >= this.frameInterval) {
            this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            this.frameCounter = 0;
        }
    }

    draw(ctx) {
        const frame = this.frames[this.currentFrame].rect;

        ctx.save(); // Lưu trạng thái canvas

        // Dịch và lật hình ảnh nếu cá di chuyển từ phải sang trái
        if (this.direction === -1) {
            ctx.translate(this.x, this.y); // Dịch điểm gốc
            ctx.scale(-1, 1); // Lật theo trục X
            ctx.drawImage(
                this.image,
                frame[0], frame[1], frame[2], frame[3],
                -this.mixin.regX - frame[2], // Cần bù trừ để vị trí chính xác khi lật
                -this.mixin.regY,
                frame[2], frame[3]
            );
        } else {
            ctx.translate(this.x, this.y);
            ctx.drawImage(
                this.image,
                frame[0], frame[1], frame[2], frame[3],
                -this.mixin.regX,
                -this.mixin.regY,
                frame[2], frame[3]
            );
        }

        ctx.restore(); // Khôi phục trạng thái canvas
    }
}

class FishManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fishes = [];
        this.createFishes();
    }

    createFishes() {
        fishTypes.forEach((type) => {
            for (let i = 0; i < type.mixin.maxNumGroup; i++) {
                this.fishes.push(new Fish(type, this.canvas.width, this.canvas.height));
            }
        });
    }

    updateAndDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.fishes.forEach((fish) => {
            fish.update();
            fish.draw(this.ctx);
        });
    }
}

// Khởi tạo canvas và game loop
const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fishManager = new FishManager(canvas);

function gameLoop() {
    fishManager.updateAndDraw();
    requestAnimationFrame(gameLoop);
}

gameLoop();