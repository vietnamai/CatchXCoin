// File: js/fish.js

// Hàm tạo đối tượng cá từ dữ liệu trong R_Fish.js
function createFish(type, spriteSheet) {
    this.type = type;
    this.spriteSheet = spriteSheet;

    // Lấy frames cho trạng thái "swim"
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

    this.updateDirection();
    this.polyArea = type.polyArea.map(point => ({ x: point.x, y: point.y }));

    // Trạng thái hiện tại
    this.state = "swim"; // Mặc định trạng thái là "swim"
}

// Hàm cập nhật hướng cá
createFish.prototype.updateDirection = function () {
    // Lấy góc từ vị trí hiện tại (x, y) đến vị trí mục tiêu (nextX, nextY)
    const angle = Math.atan2(this.speedY, this.speedX); // Tính góc hướng đi của cá từ vị trí hiện tại
    this.rotation = angle * 180 / Math.PI;  // Convert từ radian sang độ
    this.speedX = Math.cos(angle) * this.speed; // Tính lại tốc độ theo chiều X
    this.speedY = Math.sin(angle) * this.speed; // Tính lại tốc độ theo chiều Y
};

createFish.prototype.move = function () {
    this.x += this.speedX;  // Cập nhật vị trí X
    this.y += this.speedY;  // Cập nhật vị trí Y

    // Kiểm tra nếu cá chạm vào biên và quay lại
    if (this.x < 0 || this.x > window.innerWidth) {
        this.speedX = -this.speedX; // Lật ngược hướng di chuyển theo chiều X
    }
    if (this.y < 0 || this.y > window.innerHeight) {
        this.speedY = -this.speedY; // Lật ngược hướng di chuyển theo chiều Y
    }
};

// Hàm cập nhật hoạt ảnh cá
createFish.prototype.updateAnimation = function () {
    this.delayCounter++;
    if (this.delayCounter >= this.frameDelay) {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        this.delayCounter = 0;
    }
};

// Hàm thay đổi trạng thái cá
createFish.prototype.changeState = function (newState) {
    if (this.state !== newState) {
        this.state = newState;

        // Cập nhật frames theo trạng thái
        this.frames = this.type.frames.filter(frame =>
            newState === "swim" ? frame.label === "swim" || frame.jump === "swim" :
            newState === "capture" ? frame.label === "capture" || frame.jump === "capture" : false
        );

        if (this.frames.length === 0) {
            console.error(`No frames found for state "${newState}" in fish type "${this.type.image}"`);
            return;
        }

        this.currentFrame = 0; // Reset khung hình về đầu
    }
};

// Hàm vẽ cá lên canvas
createFish.prototype.getDrawInfo = function () {
    const { rect } = this.frames[this.currentFrame];
    return { 
        x: this.x,
        y: this.y,
        width: rect[2],
        height: rect[3],
        sx: rect[0],
        sy: rect[1]
    };
};