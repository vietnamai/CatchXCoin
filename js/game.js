const fishTypes = [
    {
        image: "fish1.png",
        frames: [
            { rect: [0, 0, 55, 37], label: "swim" },
            { rect: [0, 37, 55, 37] },
            { rect: [0, 74, 55, 37] },
            { rect: [0, 111, 55, 37], jump: "swim" },
            { rect: [0, 148, 55, 37], label: "capture" },
            { rect: [0, 185, 55, 37] },
            { rect: [0, 222, 55, 37] },
            { rect: [0, 259, 55, 37], jump: "capture" }
        ],
        mixin: { coin: 1, captureRate: 0.55, maxNumGroup: 8, minSpeed: 50, maxSpeed: 120 }
    },
    {
        image: "fish2.png",
        frames: [
            { rect: [0, 0, 78, 64], label: "swim" },
            { rect: [0, 64, 78, 64] },
            { rect: [0, 128, 78, 64] },
            { rect: [0, 192, 78, 64], jump: "swim" },
            { rect: [0, 256, 78, 64], label: "capture" },
            { rect: [0, 320, 78, 64] },
            { rect: [0, 384, 78, 64] },
            { rect: [0, 448, 78, 64], jump: "capture" }
        ],
        mixin: { coin: 3, captureRate: 0.50, maxNumGroup: 6, minSpeed: 50, maxSpeed: 120 }
    }
];

class FishScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FishScene' });
    }

    preload() {
        // Load assets
        fishTypes.forEach((type) => {
            this.load.spritesheet(type.image, `images/${type.image}`, {
                frameWidth: type.frames[0].rect[2],
                frameHeight: type.frames[0].rect[3]
            });
        });
    }

    create() {
        // Group to hold all fish
        this.fishGroup = this.physics.add.group();

        // Create fishes
        fishTypes.forEach((type) => {
            for (let i = 0; i < type.mixin.maxNumGroup; i++) {
                const x = Phaser.Math.Between(0, this.cameras.main.width);
                const y = Phaser.Math.Between(0, this.cameras.main.height);
                const speed = Phaser.Math.Between(type.mixin.minSpeed, type.mixin.maxSpeed);
                const angle = Phaser.Math.FloatBetween(0, 360);

                const fish = this.physics.add.sprite(x, y, type.image);
                fish.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );

                fish.type = type;
                fish.state = "swim";

                this.fishGroup.add(fish);

                // Add animations
                this.anims.create({
                    key: `${type.image}_swim`,
                    frames: this.anims.generateFrameNumbers(type.image, { start: 0, end: 3 }),
                    frameRate: 10,
                    repeat: -1
                });

                this.anims.create({
                    key: `${type.image}_capture`,
                    frames: this.anims.generateFrameNumbers(type.image, { start: 4, end: 7 }),
                    frameRate: 10,
                    repeat: 0
                });

                fish.play(`${type.image}_swim`);
            }
        });
    }

    update() {
        this.fishGroup.children.iterate((fish) => {
            // Check if the fish is out of bounds and reset position
            if (fish.x < 0 || fish.x > this.cameras.main.width || fish.y < 0 || fish.y > this.cameras.main.height) {
                fish.x = Phaser.Math.Between(0, this.cameras.main.width);
                fish.y = Phaser.Math.Between(0, this.cameras.main.height);
            }
        });
    }
}

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: FishScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

// Create the game
const game = new Phaser.Game(config);