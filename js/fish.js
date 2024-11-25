// File: js/fish.js

// Hàm tạo đối tượng cá từ dữ liệu trong R_Fish.js
function createFish(type, spriteSheet) {
    this.type = type;
    this.spriteSheet = spriteSheet;
    this.frames = getFishAnimation(type, "swim").frames; // Mặc định cá ở trạng thái bơi
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

    this.updateDirection();
    this.polyArea = type.polyArea.map(point => ({ x: point.x, y: point.y }));
}

// Hàm lấy hoạt ảnh của cá theo trạng thái
function getFishAnimation(type, state) {
    const fish = fishTypes.find(f => f.image.includes(type)); // Lấy loại cá dựa vào tên file
    if (!fish) {
        console.error(`Fish type "${type}" not found.`);
        return null;
    }

    // Chọn khung hình dựa trên trạng thái
    const frames = fish.frames.filter(frame =>
        state === "swim" ? (frame.label === "swim" || frame.jump === "swim") :
        state === "capture" ? (frame.label === "capture" || frame.jump === "capture") : false
    );

    if (frames.length === 0) {
        console.error(`No frames found for state "${state}" in fish type "${type}".`);
        return null;
    }

    return {
        image: fish.image,
        frames: frames,
        polyArea: fish.polyArea,
        mixin: fish.mixin
    };
}

// Cập nhật hướng di chuyển của cá
createFish.prototype.updateDirection = function () {
    const radian = this.rotation * (Math.PI / 180);
    this.speedX = Math.cos(radian) * this.speed;
    this.speedY = Math.sin(radian) * this.speed;
};

// Cập nhật trạng thái cá
createFish.prototype.updateAnimation = function (state) {
    this.delayCounter++;
    if (this.delayCounter >= this.frameDelay) {
        this.frames = getFishAnimation(this.type, state).frames; // Cập nhật lại khung hình theo trạng thái
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        this.delayCounter = 0;
    }
};

// Cập nhật vị trí cá
createFish.prototype.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    // Kiểm tra nếu cá chạm biên
    if (this.x < 0 || this.x > window.innerWidth) {
        this.rotation = 180 - this.rotation;
        this.updateDirection();
    }
    if (this.y < 0 || this.y > window.innerHeight) {
        this.rotation = 360 - this.rotation;
        this.updateDirection();
    }
};

// Vẽ cá lên canvas
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