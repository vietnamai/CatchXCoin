class Bullet {
    constructor(bulletType, startX, startY, targetX, targetY) {
        this.type = bulletType;
        this.image = new Image();
        this.image.src = `images/${bulletType.image}`;
        this.rect = bulletType.rect;
        this.regX = bulletType.regX;
        this.regY = bulletType.regY;

        this.x = startX;
        this.y = startY;

        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / distance) * 5; // Tốc độ đạn là 5 pixel/frame
        this.vy = (dy / distance) * 5;

        this.active = true; // Đạn còn tồn tại trong game
    }

    update() {
        if (!this.active) return;

        this.x += this.vx;
        this.y += this.vy;

        // Kiểm tra nếu đạn ra ngoài màn hình thì vô hiệu hóa
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.active = false;
        }
    }

    draw(ctx) {
        if (!this.active) return;

        ctx.drawImage(
            this.image,
            this.rect[0], this.rect[1], this.rect[2], this.rect[3],
            this.x - this.regX, this.y - this.regY,
            this.rect[2], this.rect[3]
        );
    }

    checkCollision(fish) {
        // Kiểm tra va chạm giữa đạn và cá dựa trên khoảng cách
        const dx = this.x - fish.x;
        const dy = this.y - fish.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < Math.max(fish.mixin.regX, fish.mixin.regY);
    }
}

class BulletManager {
    constructor() {
        this.bullets = [];
    }

    addBullet(bulletType, startX, startY, targetX, targetY) {
        const bullet = new Bullet(bulletType, startX, startY, targetX, targetY);
        this.bullets.push(bullet);
    }

    updateAndDraw(ctx, fishes) {
        this.bullets = this.bullets.filter(bullet => bullet.active);

        this.bullets.forEach(bullet => {
            bullet.update();
            bullet.draw(ctx);

            fishes.forEach(fish => {
                if (bullet.checkCollision(fish)) {
                    bullet.active = false; // Vô hiệu hóa đạn sau va chạm
                    fish.setState("capture"); // Đổi trạng thái cá

                    // Tạo lưới tại vị trí va chạm
                    webManager.addWeb(bullet.x, bullet.y, bullet.type);
                }
            });
        });
    }
}
