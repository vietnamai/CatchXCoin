const fishTypes = [
    {
        image: "assets/fish1.png",
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
        polyArea: [{ x: 10, y: 5 }, { x: 55, y: 5 }, { x: 55, y: 22 }, { x: 10, y: 22 }],
        mixin: { coin: 1, captureRate: 0.55, maxNumGroup: 8, minSpeed: 0.5, maxSpeed: 1.2, regX: 35, regY: 12, interval: 10 }
    },
    {
        image: "assets/fish2.png",
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
        polyArea: [{ x: 15, y: 10 }, { x: 78, y: 10 }, { x: 78, y: 32 }, { x: 15, y: 32 }],
        mixin: { coin: 3, captureRate: 0.50, maxNumGroup: 6, minSpeed: 0.5, maxSpeed: 1.2, regX: 58, regY: 20, interval: 10 }
    }
];

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,  // Chiều rộng toàn màn hình
    height: window.innerHeight,  // Chiều cao toàn màn hình
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT, // Chế độ co giãn để vừa với màn hình
        autoCenter: Phaser.Scale.CENTER_BOTH // Căn giữa game
    }
};

let fishGroup = [];
let fishSprites = [];
let lastFishSpawnTime = 0;

function preload() {
    this.load.image('background', 'assets/background.png'); // Đảm bảo có file background
    fishTypes.forEach(fish => {
        this.load.spritesheet(fish.image, fish.image, { frameWidth: fish.frames[0].rect[2], frameHeight: fish.frames[0].rect[3] });
    });
}

function create() {
    this.add.image(400, 300, 'background').setScale(2);

    fishTypes.forEach((fishType, index) => {
        const fishFrames = fishType.frames.map(f => f.rect);
        this.anims.create({
            key: fishType.frames[0].label || 'swim_' + index,
            frames: this.anims.generateFrameNames(fishType.image, { frames: fishFrames }),
            frameRate: 10,
            repeat: -1
        });

        // Tạo cá ngẫu nhiên
        for (let i = 0; i < fishType.mixin.maxNumGroup; i++) {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(100, 500);
            const fish = this.physics.add.sprite(x, y, fishType.image);
            fish.setOrigin(fishType.mixin.regX / fish.width, fishType.mixin.regY / fish.height);
            fish.setInteractive();
            fish.play(fishType.frames[0].label || 'swim_' + index);
            fish.setVelocityX(Phaser.Math.Between(fishType.mixin.minSpeed * 100, fishType.mixin.maxSpeed * 100));
            fish.setVelocityY(Phaser.Math.Between(-50, 50));
            fishSprites.push(fish);
        }
    });
}

function update(time, delta) {
    // Duy trì các con cá bơi
    fishSprites.forEach(fish => {
        if (fish.x < 0 || fish.x > 800 || fish.y < 0 || fish.y > 600) {
            fish.x = Phaser.Math.Between(0, 800);
            fish.y = Phaser.Math.Between(100, 500);
        }
    });

    // Tạo cá mới nếu cần
    if (time - lastFishSpawnTime > 1000) {
        lastFishSpawnTime = time;
        const fishType = Phaser.Math.Between(0, fishTypes.length - 1);
        const x = Phaser.Math.Between(0, 800);
        const y = Phaser.Math.Between(100, 500);
        const fish = this.physics.add.sprite(x, y, fishTypes[fishType].image);
        fish.setOrigin(fishTypes[fishType].mixin.regX / fish.width, fishTypes[fishType].mixin.regY / fish.height);
        fish.setInteractive();
        fish.play(fishTypes[fishType].frames[0].label || 'swim_' + fishType);
        fish.setVelocityX(Phaser.Math.Between(fishTypes[fishType].mixin.minSpeed * 100, fishTypes[fishType].mixin.maxSpeed * 100));
        fish.setVelocityY(Phaser.Math.Between(-50, 50));
        fishSprites.push(fish);
    }
}

const game = new Phaser.Game(config);