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

        // Hướng ngẫu nhiên (theo góc độ, tính bằng radian)
        this.angle = Math.random() * Math.PI * 2; // 0 đến 2π
        this.angleSpeed = (Math.random() - 0.5) * 0.02; // Tốc độ thay đổi góc (nhỏ để tạo vòng cung)

        this.currentFrame = 0;
        this.frameInterval = this.mixin.interval;
        this.frameCounter = 0;
    }

    update() {
        // Tính toán vị trí mới dựa trên góc
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Thay đổi góc để tạo chuyển động vòng cung
        this.angle += this.angleSpeed;

        // Nếu cá vượt ra khỏi màn hình, đưa nó quay lại vị trí ngẫu nhiên
        if (this.x < -this.mixin.regX || this.x > this.canvasWidth + this.mixin.regX || 
            this.y < -this.mixin.regY || this.y > this.canvasHeight + this.mixin.regY) {
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.angle = Math.random() * Math.PI * 2; // Đặt hướng mới
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

        // Dịch vị trí và xoay hình ảnh theo góc di chuyển
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.drawImage(
            this.image,
            frame[0], frame[1], frame[2], frame[3],
            -this.mixin.regX, -this.mixin.regY,
            frame[2], frame[3]
        );

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