import { fishTypes } from './R_Fish.js';

class FishGame extends Phaser.Scene {
    constructor() {
        super({ key: 'FishGame' });
    }

    preload() {
        // Tải sprite sheet cho từng loại cá
        fishTypes.forEach((type) => {
            this.load.spritesheet(type.key, `images/${type.image}`, {
                frameWidth: type.frameWidth, // Cập nhật đúng kích thước khung hình
                frameHeight: type.frameHeight
            });
        });
    }

    create() {
        this.fishes = this.physics.add.group();

        // Tạo cá từ danh sách fishTypes
        fishTypes.forEach((type) => {
            for (let i = 0; i < type.mixin.maxNumGroup; i++) {
                const x = Phaser.Math.Between(0, this.game.config.width);
                const y = Phaser.Math.Between(0, this.game.config.height);
                const fish = this.fishes.create(x, y, type.key);

                // Tùy chỉnh tốc độ và góc di chuyển
                fish.speed = Phaser.Math.Between(
                    type.mixin.minSpeed,
                    type.mixin.maxSpeed
                );
                fish.angleSpeed = Phaser.Math.FloatBetween(-0.02, 0.02);

                fish.type = type;
                fish.state = 'swim';
            }
        });

        // Thêm Animation cho cá
        fishTypes.forEach((type) => {
            this.anims.create({
                key: `${type.key}_swim`,
                frames: this.anims.generateFrameNumbers(type.key, {
                    start: type.frames[0].start,
                    end: type.frames[0].end
                }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: `${type.key}_capture`,
                frames: this.anims.generateFrameNumbers(type.key, {
                    start: type.frames[1].start,
                    end: type.frames[1].end
                }),
                frameRate: 10,
                repeat: 0
            });
        });

        // Phát animation mặc định (bơi)
        this.fishes.getChildren().forEach((fish) => {
            fish.play(`${fish.type.key}_swim`);
        });
    }

    update() {
        this.fishes.getChildren().forEach((fish) => {
            // Di chuyển cá
            fish.x += Math.cos(fish.angle) * fish.speed;
            fish.y += Math.sin(fish.angle) * fish.speed;
            fish.angle += fish.angleSpeed;

            // Đưa cá quay lại màn hình nếu vượt ra ngoài
            if (fish.x < 0) fish.x = this.game.config.width;
            if (fish.x > this.game.config.width) fish.x = 0;
            if (fish.y < 0) fish.y = this.game.config.height;
            if (fish.y > this.game.config.height) fish.y = 0;

            // Chuyển trạng thái ngẫu nhiên sang "capture"
            if (Math.random() < 0.001 && fish.state !== 'capture') {
                fish.state = 'capture';
                fish.play(`${fish.type.key}_capture`);
                fish.once('animationcomplete', () => {
                    fish.state = 'swim';
                    fish.play(`${fish.type.key}_swim`);
                });
            }
        });
    }
}

// Cấu hình Phaser
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [FishGame],
    physics: {
        default: 'arcade'
    }
};

// Khởi tạo game
const game = new Phaser.Game(config);