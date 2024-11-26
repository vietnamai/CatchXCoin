// GameScene.js

import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        // Thêm hình nền
        this.add.image(400, 300, 'background');

        // Khởi tạo súng (cannon)
        this.cannon = this.add.image(400, 550, 'cannon');

        // Sự kiện bắn súng
        this.input.on('pointerdown', () => {
            this.fireBullet();
        });

        // Khởi tạo cá
        this.fishGroup = this.physics.add.group();
        this.spawnFish();
    }

    update() {
        // Cập nhật vị trí súng
        if (this.cannon) {
            this.cannon.rotation = Phaser.Math.Angle.Between(
                this.cannon.x, this.cannon.y, 
                this.input.x, this.input.y
            );
        }

        // Cập nhật hành động cá
        this.fishGroup.children.iterate((fish) => {
            fish.update();
        });
    }

    fireBullet() {
        // Logic bắn đạn từ súng
        const bullet = this.physics.add.image(this.cannon.x, this.cannon.y, 'bullet');
        bullet.setVelocity(0, -500);  // Tốc độ đạn
        bullet.angle = this.cannon.rotation;  // Đạn theo hướng súng
    }

    spawnFish() {
        // Logic tạo cá mới
        const fish = this.fishGroup.create(Phaser.Math.Between(0, 800), 0, 'fish1');
        fish.setVelocityY(Phaser.Math.Between(100, 200));  // Tốc độ bơi của cá
    }
}

export default GameScene;