// File: js/fish.js

/**
 * Quản lý đối tượng cá và các hành vi của chúng
 */
const FishManager = (() => {
    /**
     * Hàm tạo đối tượng cá từ dữ liệu loại cá (fish type)
     * @param {Object} type - Thông tin về loại cá
     * @param {HTMLImageElement} spriteSheet - Ảnh sprite sheet cho loại cá
     * @returns {Object} Đối tượng cá
     */
    const createFish = (type, spriteSheet) => {
        const fish = {
            type,
            spriteSheet,
            frames: type.frames.filter(frame => frame.label === "swim" || frame.jump === "swim"),
            currentFrame: 0,
            frameDelay: type.mixin.interval,
            delayCounter: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 360,
            speed: Math.random() * (type.mixin.maxSpeed - type.mixin.minSpeed) + type.mixin.minSpeed,
            state: "swim", // Trạng thái hiện tại ("swim" hoặc "capture")

            /**
             * Cập nhật hướng di chuyển
             */
            updateDirection() {
                const radian = this.rotation * (Math.PI / 180);
                this.speedX = Math.cos(radian) * this.speed;
                this.speedY = Math.sin(radian) * this.speed;
            },

            /**
             * Di chuyển cá
             */
            move() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Xử lý nếu cá chạm biên màn hình
                if (this.x < 0 || this.x > window.innerWidth) {
                    this.rotation = 180 - this.rotation;
                    this.updateDirection();
                }
                if (this.y < 0 || this.y > window.innerHeight) {
                    this.rotation = 360 - this.rotation;
                    this.updateDirection();
                }
            },

            /**
             * Cập nhật hoạt ảnh của cá
             */
            updateAnimation() {
                this.delayCounter++;
                if (this.delayCounter >= this.frameDelay) {
                    this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                    this.delayCounter = 0;
                }
            },

            /**
             * Thay đổi trạng thái của cá ("swim" hoặc "capture")
             * @param {string} newState - Trạng thái mới
             */
            changeState(newState) {
                if (this.state !== newState) {
                    this.state = newState;
                    this.frames = this.type.frames.filter(frame =>
                        newState === "swim" ? frame.label === "swim" || frame.jump === "swim" :
                        newState === "capture" ? frame.label === "capture" || frame.jump === "capture" :
                        false
                    );

                    if (this.frames.length === 0) {
                        console.error(`Không tìm thấy frame cho trạng thái "${newState}" trong loại cá "${this.type.image}"`);
                        return;
                    }

                    this.currentFrame = 0; // Reset lại khung hình
                }
            },

            /**
             * Vẽ cá lên canvas
             * @param {CanvasRenderingContext2D} ctx - Ngữ cảnh canvas
             */
            draw(ctx) {
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
            }
        };

        fish.updateDirection();
        return fish;
    };

    return {
        createFish
    };
})();
