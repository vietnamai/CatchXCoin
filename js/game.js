import { fishTypes } from './R_Fish.js';

class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, type, x, y) {
        super(scene, x, y, type.image);

        this.scene = scene;
        this.type = type;
        this.frames = type.frames;

        this.mixin = type.mixin;
        this.state = "swim"; // Trạng thái ban đầu: bơi
        this.currentFrames = this.getFramesByState(this.state);

        this.setOrigin(0.5, 0.5); // Đặt tâm đối tượng
        this.scene.add.existing(this); // Thêm đối tượng vào scene

        // Tạo vị trí và tốc độ ngẫu nhiên
        this.x = x;
        this.y = y;
        this.speed = Phaser.Math.FloatBetween(this.mixin.minSpeed, this.mixin.maxSpeed);
        this.angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        this.angleSpeed = Phaser.Math.FloatBetween(-0.02, 0.02);

        this.currentFrame = 0;
        this.frameInterval = this.mixin.interval;
        this.frameCounter = 0;
    }

    getFramesByState(state) {
        const startIndex = this.frames.findIndex(frame => frame.label === state);
        const endIndex = this.frames.findIndex(frame => frame.jump === state);
        return this.frames.slice(startIndex, endIndex + 1);
    }

    setState(state) {
        if (this.state !== state) {
            this.state = state;
            this.currentFrames = this.getFramesByState(state);
            this.currentFrame = 0;
        }
    }

    update() {
        if (this.state === "swim") {
            // Cập nhật vị trí dựa trên góc
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            // Thay đổi góc để tạo chuyển động vòng cung
            this.angle += this.angleSpeed;

            // Kiểm tra nếu cá vượt khỏi màn hình
            if (
                this.x < -this.mixin.regX || this.x > this.scene.sys.canvas.width + this.mixin.regX ||
                this.y < -this.mixin.regY || this.y > this.scene.sys.canvas.height + this.mixin.regY
            ) {
                this.x = Phaser.Math.Between(0, this.scene.sys.canvas.width);
                this.y = Phaser.Math.Between(0, this.scene.sys.canvas.height);
                this.angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            }
        }

        // Cập nhật frame animation
        this.frameCounter++;
        if (this.frameCounter >= this.frameInterval) {
            this.currentFrame = (this.currentFrame + 1) % this.currentFrames.length;
            this.frameCounter = 0;

            // Khi cá bị bắn, kết thúc animation thì chuyển trạng thái
            if (this.state === "capture" && this.currentFrame === 0) {
                this.setState("swim");
            }
        }

        // Hiển thị frame hiện tại
        const frame = this.currentFrames[this.currentFrame].rect;
        this.setFrame(frame);
    }
}

class FishManager {
    constructor(scene) {
        this.scene = scene;
        this.fishes = [];
        this.createFishes();
    }

    createFishes() {
        fishTypes.forEach(type => {
            for (let i = 0; i < type.mixin.maxNumGroup; i++) {
                const x = Phaser.Math.Between(0, this.scene.sys.canvas.width);
                const y = Phaser.Math.Between(0, this.scene.sys.canvas.height);
                const fish = new Fish(this.scene, type, x, y);
                this.fishes.push(fish);
            }
        });
    }

    update() {
        this.fishes.forEach(fish => {
            fish.update();

            // Bắn cá ngẫu nhiên để kiểm tra
            if (Math.random() < 0.001 && fish.state !== "capture") {
                fish.setState("capture");
            }
        });
    }
}

class FishingGame extends Phaser.Scene {
    constructor() {
        super({ key: 'FishingGame' });
    }

    preload() {
        fishTypes.forEach(type => {
            this.load.spritesheet(type.image, `images/${type.image}`, {
                frameWidth: type.mixin.frameWidth,
                frameHeight: type.mixin.frameHeight
            });
        });
    }

    create() {
        this.fishManager = new FishManager(this);
    }

    update() {
        this.fishManager.update();
    }
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#71c5cf',
    scene: [FishingGame]
};

const game = new Phaser.Game(config);