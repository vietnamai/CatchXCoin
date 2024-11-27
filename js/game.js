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
        this.state = "swim"; // Trạng thái ban đầu: bơi
        this.currentFrames = this.frames;

        // Khởi tạo vị trí ngẫu nhiên từ 4 cạnh
        const side = Math.floor(Math.random() * 4); // 0: trái, 1: phải, 2: trên, 3: dưới
        switch (side) {
            case 0: // trái
                this.x = -this.mixin.regX;
                this.y = Math.random() * canvasHeight;
                break;
            case 1: // phải
                this.x = canvasWidth + this.mixin.regX;
                this.y = Math.random() * canvasHeight;
                break;
            case 2: // trên
                this.x = Math.random() * canvasWidth;
                this.y = -this.mixin.regY;
                break;
            case 3: // dưới
                this.x = Math.random() * canvasWidth;
                this.y = canvasHeight + this.mixin.regY;
                break;
        }

        this.speed = Math.random() * (this.mixin.maxSpeed - this.mixin.minSpeed) + this.mixin.minSpeed;

        // Hướng ngẫu nhiên
        this.angle = Math.atan2(canvasHeight / 2 - this.y, canvasWidth / 2 - this.x); // Hướng về giữa màn hình
        this.angleSpeed = (Math.random() - 0.5) * 0.02; // Để tạo vòng cung

        this.currentFrame = 0;
        this.frameInterval = this.mixin.interval;
        this.frameCounter = 0;

        // Xác định kiểu bơi: 0 - thẳng, 1 - vòng cung, 2 - xéo
        this.swimType = Math.floor(Math.random() * 3);
    }

    // Cập nhật trạng thái di chuyển
    update() {
        switch (this.swimType) {
            case 0: // Bơi thẳng
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                break;
            case 1: // Bơi vòng cung
                this.angle += this.angleSpeed; // Thay đổi góc để tạo chuyển động vòng cung
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                break;
            case 2: // Bơi xéo
                this.x += Math.cos(this.angle + 0.1) * this.speed;
                this.y += Math.sin(this.angle + 0.1) * this.speed;
                break;
        }

        // Nếu cá vượt khỏi màn hình, đặt lại vị trí ngẫu nhiên
        if (
            this.x < -this.mixin.regX || this.x > this.canvasWidth + this.mixin.regX ||
            this.y < -this.mixin.regY || this.y > this.canvasHeight + this.mixin.regY
        ) {
            this.x = Math.random() * this.canvasWidth;
            this.y = Math.random() * this.canvasHeight;
            this.angle = Math.random() * Math.PI * 2; // Đặt lại hướng ngẫu nhiên
        }

        // Cập nhật khung hình
        this.frameCounter++;
        if (this.frameCounter >= this.frameInterval) {
            this.currentFrame = (this.currentFrame + 1) % this.currentFrames.length;
            this.frameCounter = 0;
        }
    }

    draw(ctx) {
        const frame = this.frames[this.currentFrame].rect;

        ctx.save(); // Lưu trạng thái canvas
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); // Xoay hình ảnh theo hướng di chuyển

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