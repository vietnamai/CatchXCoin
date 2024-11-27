// File: js/GameScene.js

import { fishTypes } from './R_Fish.js';
import { cannonTypes } from './R_Cannon.js';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.fishes = [];
        this.cannon = null;
        this.currentCannonIndex = 0;
        this.bullets = [];
    }

    preload() {
        // Load fish images
        fishTypes.forEach(fish => {
            this.load.spritesheet(fish.image, `images/${fish.image}`, {
                frameWidth: fish.frames[0].rect[2],
                frameHeight: fish.frames[0].rect[3]
            });
        });

        // Load cannon images
        cannonTypes.forEach(cannon => {
            this.load.spritesheet(cannon.image, `images/${cannon.image}`, {
                frameWidth: cannon.frames[0].rect[2],
                frameHeight: cannon.frames[0].rect[3]
            });
            this.load.image(cannon.bullet, `images/${cannon.bullet}`);
        });
    }

    create() {
        // Add fishes
        fishTypes.forEach(fishType => {
            for (let i = 0; i < fishType.mixin.maxNumGroup; i++) {
                const fish = this.add.sprite(
                    Phaser.Math.Between(0, this.sys.canvas.width),
                    Phaser.Math.Between(0, this.sys.canvas.height),
                    fishType.image
                );
                fish.type = fishType;
                fish.play('swim');
                this.fishes.push(fish);
            }
        });

        // Add cannon
        this.addCannon();

        // Input events
        this.input.on('pointermove', this.aimCannon, this);
        this.input.on('pointerdown', this.shootBullet, this);
    }

    update() {
        this.updateFishes();
        this.updateBullets();
    }

    addCannon() {
        const cannonConfig = cannonTypes[this.currentCannonIndex];
        this.cannon = this.add.sprite(
            this.sys.canvas.width / 2,
            this.sys.canvas.height - 50,
            cannonConfig.image
        );
        this.cannon.setOrigin(0.5, 0.5);
        this.cannon.rotation = -Math.PI / 2; // Default pointing upwards
    }

    aimCannon(pointer) {
        if (!this.cannon) return;

        const dx = pointer.worldX - this.cannon.x;
        const dy = pointer.worldY - this.cannon.y;
        this.cannon.rotation = Math.atan2(dy, dx);
    }

    shootBullet() {
        if (!this.cannon) return;

        const cannonConfig = cannonTypes[this.currentCannonIndex];
        const bullet = this.add.sprite(this.cannon.x, this.cannon.y, cannonConfig.bullet);

        const angle = this.cannon.rotation;
        bullet.setData('velocity', {
            x: Math.cos(angle) * 300,
            y: Math.sin(angle) * 300
        });

        this.bullets.push(bullet);
    }

    updateFishes() {
        this.fishes.forEach(fish => {
            const fishType = fish.type;
            fish.x += fishType.mixin.minSpeed;
            if (fish.x > this.sys.canvas.width) {
                fish.x = 0; // Wrap fish around the screen
            }
        });
    }

    updateBullets() {
        this.bullets.forEach(bullet => {
            const velocity = bullet.getData('velocity');
            bullet.x += velocity.x * this.game.loop.delta / 1000;
            bullet.y += velocity.y * this.game.loop.delta / 1000;

            // Remove bullet if out of bounds
            if (
                bullet.x < 0 ||
                bullet.x > this.sys.canvas.width ||
                bullet.y < 0 ||
                bullet.y > this.sys.canvas.height
            ) {
                bullet.destroy();
            }
        });

        // Cleanup destroyed bullets
        this.bullets = this.bullets.filter(bullet => bullet.active);
    }
}

export default GameScene;
