// File: js/GameScene.js

import { cannonTypes } from './R_Cannon.js'; // Import thông số súng từ R_Cannon.js
import { fishTypes } from './R_Fish.js'; // Import thông số cá từ R_Fish.js

export class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        // Tải các hình ảnh cần thiết (súng, cá và đạn)
        cannonTypes.forEach(cannon => {
            this.load.image(cannon.image, `images/${cannon.image}`);
        });
        fishTypes.forEach(fish => {
            this.load.image(fish.image, `images/${fish.image}`);
        });
    }

    create() {
        // Tạo cá và súng từ các thông số trong R_Fish.js và R_Cannon.js
        this.fishes = [];
        fishTypes.forEach(type => {
            for (let i = 0; i < type.mixin.maxNumGroup; i++) {
                const fish = new createFish(type, this.cache.images.get(type.image)); // Sử dụng hình ảnh đã tải
                this.fishes.push(fish);
            }
        });

        // Khởi tạo súng
        this.currentCannon = cannonTypes[0]; // Chọn súng đầu tiên
        this.cannonSprite = this.add.sprite(window.innerWidth / 2, window.innerHeight - 100, this.currentCannon.image);
        this.cannonSprite.setOrigin(0.5, 0.5);
    }

    update() {
        // Cập nhật chuyển động cá
        this.fishes.forEach(fish => {
            fish.move();
            fish.updateAnimation();
        });

        // Cập nhật chuyển động súng
        this.updateCannon();

        // Kiểm tra bắn súng
        if (this.input.activePointer.isDown) {
            this.fireCannon();
        }
    }

    updateCannon() {
        const pointer = this.input.activePointer;

        // Quay súng theo hướng của chuột
        const dx = pointer.x - this.cannonSprite.x;
        const dy = pointer.y - this.cannonSprite.y;
        const angle = Math.atan2(dy, dx);
        this.cannonSprite.rotation = angle;
    }

    fireCannon() {
        // Tạo đạn từ thông số súng
        const bullet = this.add.sprite(this.cannonSprite.x, this.cannonSprite.y, this.currentCannon.bullet);
        const speed = this.currentCannon.power * 10; // Tốc độ đạn tùy thuộc vào sức mạnh súng

        this.physics.moveTo(bullet, this.input.activePointer.x, this.input.activePointer.y, speed);
    }
}

function createFish(type, spriteSheet) {
    this.type = type;
    this.spriteSheet = spriteSheet;
    this.frames = type.frames.filter(frame => frame.label === "swim" || frame.jump === "swim");
    if (this.frames.length === 0) {
        throw new Error(`No "swim" frames found for fish type: ${type.image}`);
    }

    this.currentFrame = 0;
    this.frameDelay = type.mixin.interval;
    this.delayCounter = 0;

    const { rect } = this.frames[0];
    this.frameWidth = rect[2];
    this.frameHeight = rect[3];

    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.rotation = Math.random() * 360;
    this.speed = Math.random() * (type.mixin.maxSpeed - type.mixin.minSpeed) + type.mixin.minSpeed;

    this.updateDirection();
    this.polyArea = type.polyArea.map(point => ({ x: point.x, y: point.y }));

    this.state = "swim"; // Trạng thái ban đầu là "swim"
}

createFish.prototype.updateDirection = function () {
    const radian = this.rotation * (Math.PI / 180);
    this.speedX = Math.cos(radian) * this.speed;
    this.speedY = Math.sin(radian) * this.speed;
};

createFish.prototype.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    // Kiểm tra nếu cá chạm biên
    if (this.x < 0 || this.x > window.innerWidth) {
        this.rotation = 180 - this.rotation;
        this.updateDirection();
    }
    if (this.y < 0 || this.y > window.innerHeight) {
        this.rotation = 360 - this.rotation;
        this.updateDirection();
    }
};

createFish.prototype.updateAnimation = function () {
    this.delayCounter++;
    if (this.delayCounter >= this.frameDelay) {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        this.delayCounter = 0;
    }
};

createFish.prototype.draw = function (ctx) {
    const { rect } = this.frames[this.currentFrame];
    const [sx, sy, sWidth, sHeight] = rect;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.drawImage(
        this.spriteSheet,
        sx, sy, sWidth, sHeight,
        -sWidth / 2, -sHeight / 2, sWidth, sHeight
    );
    ctx.restore();
};