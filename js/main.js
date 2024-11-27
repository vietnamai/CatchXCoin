// main.js

import PreloadScene from './PreloadScene.js';  // Tải tài nguyên
import GameScene from './GameScene.js';        // Xử lý gameplay

// Cấu hình game
const config = {
    type: Phaser.AUTO,   // Dùng WebGL nếu có, nếu không dùng Canvas
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PreloadScene, GameScene],  // Định nghĩa các scene của game
    physics: {
        default: 'arcade', // Dùng physics arcade
        arcade: {
            gravity: { y: 0 },  // Không có lực hấp dẫn
            debug: false         // Tắt chế độ debug
        }
    }
};

// Khởi tạo game
const game = new Phaser.Game(config);