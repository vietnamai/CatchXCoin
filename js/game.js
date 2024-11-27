console.log("UPDATE LẦN 2")

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
        polyArea: [{ x: 10, y: 5 }, { x: 55, y: 5 }, { x: 55, y: 22 }, { x: 10, y: 22 }],
        mixin: { coin: 1, captureRate: 0.55, maxNumGroup: 8, minSpeed: 0.5, maxSpeed: 1.2, regX: 35, regY: 12, interval: 10 }
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
        polyArea: [{ x: 15, y: 10 }, { x: 78, y: 10 }, { x: 78, y: 32 }, { x: 15, y: 32 }],
        mixin: { coin: 3, captureRate: 0.50, maxNumGroup: 6, minSpeed: 0.5, maxSpeed: 1.2, regX: 58, regY: 20, interval: 10 }
    }
];

class Fish {
    constructor(type, canvasWidth, canvasHeight) {
        this.type = type;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.image = new Image();
        this.image.src = `images/${type.image}`;
        this.frames = type.frames;

        this.mixin = type.mixin;
        this.state = "swim";
        this.currentFrames = this.getFramesByState(this.state);

        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.speed = Math.random() * (this.mixin.maxSpeed - this.mixin.minSpeed) + this.mixin.minSpeed;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;

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
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.angle += this.angleSpeed;

        // Kiểm tra vị trí cá và tái tạo khi ra khỏi màn hình
        const buffer = 50; // khoảng cách để làm mượt
        if (
            this.x < -buffer || this.x > this.canvasWidth + buffer ||
            this.y < -buffer || this.y > this.canvasHeight + buffer
        ) {
            this.resetPosition();
        }
    }

    this.frameCounter++;
    if (this.frameCounter >= this.frameInterval) {
        this.currentFrame = (this.currentFrame + 1) % this.currentFrames.length;
        this.frameCounter = 0;

        if (this.state === "capture" && this.currentFrame === 0) {
            this.setState("swim");
        }
    }
}

// Hàm tái tạo vị trí cá
resetPosition() {
    const sides = ["top", "bottom", "left", "right"];
    const side = sides[Math.floor(Math.random() * sides.length)];

    switch (side) {
        case "top":
            this.x = Math.random() * this.canvasWidth;
            this.y = -this.mixin.regY; // xuất hiện phía trên
            break;
        case "bottom":
            this.x = Math.random() * this.canvasWidth;
            this.y = this.canvasHeight + this.mixin.regY; // xuất hiện phía dưới
            break;
        case "left":
            this.x = -this.mixin.regX; // xuất hiện bên trái
            this.y = Math.random() * this.canvasHeight;
            break;
        case "right":
            this.x = this.canvasWidth + this.mixin.regX; // xuất hiện bên phải
            this.y = Math.random() * this.canvasHeight;
            break;
    }

    this.angle = Math.random() * Math.PI * 2; // hướng di chuyển mới
}

    draw(ctx) {
        const frame = this.currentFrames[this.currentFrame].rect;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.drawImage(
            this.image,
            frame[0], frame[1], frame[2], frame[3],
            -this.mixin.regX, -this.mixin.regY,
            frame[2], frame[3]
        );

        ctx.restore();
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

const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fishManager = new FishManager(canvas);

function gameLoop() {
    fishManager.updateAndDraw();
    requestAnimationFrame(gameLoop);
}

gameLoop();