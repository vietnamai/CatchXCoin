// File: js/fish.js

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

    this.updateDirection(); // Tạo hướng di chuyển ban đầu
    this.polyArea = type.polyArea.map(point => ({ x: point.x, y: point.y }));

    this.state = "swim"; // Trạng thái mặc định của cá
}

// Thêm các phương thức vào prototype của `createFish`
createFish.prototype.updateDirection = function () {
    const angle = Math.random() * Math.PI * 2;
    this.speedX = Math.cos(angle) * this.speed;
    this.speedY = Math.sin(angle) * this.speed;
    this.rotation = angle * (180 / Math.PI);
};

createFish.prototype.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    // Đổi hướng nếu chạm biên
    if (this.x < 0 || this.x > window.innerWidth) {
        this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y > window.innerHeight) {
        this.speedY = -this.speedY;
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