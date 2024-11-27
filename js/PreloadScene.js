// PreloadScene.js


class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Tải hình nền
        this.load.image('background', 'images/background.jpg');
        
        // Tải các sprite cá
        this.load.spritesheet('fish1', 'images/fish1.png', { frameWidth: 55, frameHeight: 37 });
        this.load.spritesheet('fish2', 'images/fish2.png', { frameWidth: 78, frameHeight: 64 });

        // Tải súng và đạn (có thể điều chỉnh tên hình ảnh cho đúng)
        this.load.image('cannon', 'images/cannon.png');
        this.load.image('bullet', 'images/bullet.png');
    }

    create() {
        // Sau khi tải xong, chuyển qua GameScene
        this.scene.start('GameScene');
    }
}

export default PreloadScene;