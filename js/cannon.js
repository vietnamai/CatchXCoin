class Cannon {
    constructor(cannonType, canvasWidth, canvasHeight) {
        this.type = cannonType;
        this.image = new Image();
        this.image.src = `images/${cannonType.image}`;
        this.frames = cannonType.frames;
        this.mixin = cannonType.mixin;

        this.x = canvasWidth / 2;
        this.y = canvasHeight - this.mixin.regY;
        this.currentFrame = 0;
        this.frameInterval = this.mixin.interval;
        this.frameCounter = 0;
        this.isFiring = false;
    }

    update() {
        if (this.isFiring) {
            this.frameCounter++;
            if (this.frameCounter >= this.frameInterval) {
                this.currentFrame++;
                if (this.currentFrame >= this.frames.length || this.frames[this.currentFrame].stop) {
                    this.currentFrame = 0;
                    this.isFiring = false;
                }
                this.frameCounter = 0;
            }
        }
    }

    draw(ctx) {
        const frame = this.frames[this.currentFrame].rect;
        ctx.drawImage(
            this.image,
            frame[0], frame[1], frame[2], frame[3],
            this.x - this.mixin.regX, this.y - this.mixin.regY,
            frame[2], frame[3]
        );
    }

    fire(targetX, targetY, bullets, bulletType) {
        if (!this.isFiring) {
            this.isFiring = true;
            this.currentFrame = 0;
        }

        const angle = Math.atan2(targetY - this.y, targetX - this.x);
        bullets.push(new Bullet(bulletType, this.x, this.y, angle));
    }
}

class CannonManager {
    constructor(canvas, bullets) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cannonTypes = cannonTypes;
        this.currentCannon = new Cannon(this.cannonTypes[0], canvas.width, canvas.height);
        this.bullets = bullets;
        this.currentBulletType = bulletsTypes[0];

        this.addClickEvent();
    }

    switchCannon(index) {
        if (index >= 0 && index < this.cannonTypes.length) {
            this.currentCannon = new Cannon(this.cannonTypes[index], this.canvas.width, this.canvas.height);
        }
    }

    switchBullet(index) {
        if (index >= 0 && index < bulletsTypes.length) {
            this.currentBulletType = bulletsTypes[index];
        }
    }

    addClickEvent() {
        this.canvas.addEventListener('mousedown', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const targetX = event.clientX - rect.left;
            const targetY = event.clientY - rect.top;

            const shoot = () => {
                this.currentCannon.fire(targetX, targetY, this.bullets, this.currentBulletType);
                this.isShooting = true;
            };

            shoot();
            const shootInterval = setInterval(shoot, 200);

            const stopShooting = () => {
                clearInterval(shootInterval);
                this.isShooting = false;
                this.canvas.removeEventListener('mouseup', stopShooting);
                this.canvas.removeEventListener('mouseleave', stopShooting);
            };

            this.canvas.addEventListener('mouseup', stopShooting);
            this.canvas.addEventListener('mouseleave', stopShooting);
        });
    }

    updateAndDraw() {
        this.currentCannon.update();
        this.currentCannon.draw(this.ctx);
    }
}
