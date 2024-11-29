// Lớp đại diện cho một viên đạn
class Bullet {
    constructor(bulletType, startX, startY, targetX, targetY) {
        // Loại đạn và hình ảnh tương ứng
        this.type = bulletType;
        this.image = new Image();
        this.image.src = `images/${bulletType.image}`;
        
        // Khung hình và tọa độ tham chiếu của đạn
        this.rect = bulletType.rect;
        this.regX = bulletType.regX;
        this.regY = bulletType.regY;

        // Tọa độ ban đầu của đạn
        this.x = startX;
        this.y = startY;

        // Tính toán vận tốc dựa trên hướng bắn
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / distance) * 5; // Tốc độ đạn là 5 pixel/frame
        this.vy = (dy / distance) * 5;

        this.active = true; // Đạn còn tồn tại trong game
    }

    // Phương thức cập nhật vị trí đạn
    update() {
        if (!this.active) return;

        this.x += this.vx; // Cập nhật vị trí x
        this.y += this.vy; // Cập nhật vị trí y

        // Kiểm tra nếu đạn ra ngoài màn hình thì vô hiệu hóa
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.active = false;
        }
    }

    // Phương thức vẽ đạn lên canvas
    draw(ctx) {
        if (!this.active) return;

        ctx.drawImage(
            this.image,
            this.rect[0], this.rect[1], this.rect[2], this.rect[3],
            this.x - this.regX, this.y - this.regY,
            this.rect[2], this.rect[3]
        );
    }

    // Kiểm tra va chạm giữa đạn và cá dựa trên khoảng cách
    checkCollision(fish) {
        const dx = this.x - fish.x;
        const dy = this.y - fish.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // So sánh khoảng cách với kích thước của cá để xác định va chạm
        return distance < Math.max(fish.mixin.regX, fish.mixin.regY);
    }
}

// Lớp quản lý tất cả các viên đạn trong game
class BulletManager {
    constructor() {
        this.bullets = []; // Danh sách các viên đạn hiện có
        this.currentBulletType = bulletTypes[0]; // Loại đạn mặc định
    }

    // Thêm một viên đạn mới vào danh sách
    addBullet(startX, startY, targetX, targetY) {
        const bullet = new Bullet(this.currentBulletType, startX, startY, targetX, targetY);
        this.bullets.push(bullet);
    }

    // Cập nhật và vẽ tất cả các viên đạn
    updateAndDraw(ctx, fishes) {
        // Lọc ra các viên đạn còn hoạt động
        this.bullets = this.bullets.filter(bullet => bullet.active);

        this.bullets.forEach(bullet => {
            bullet.update(); // Cập nhật vị trí đạn
            bullet.draw(ctx); // Vẽ đạn lên canvas

            // Kiểm tra va chạm giữa đạn và cá
            fishes.forEach(fish => {
                if (bullet.checkCollision(fish)) {
                    bullet.active = false; // Vô hiệu hóa đạn sau va chạm
                    fish.setState("capture"); // Đổi trạng thái cá thành bị bắt

                    // Tạo lưới tại vị trí va chạm
                    webManager.addWeb(bullet.type.webType, bullet.x, bullet.y);
                }
            });
        });
    }
}







class BulletManager {
    constructor() {
        this.bullets = []; // Danh sách các viên đạn hiện có
        this.currentBulletType = bulletTypes[0]; // Loại đạn mặc định
    }

    addBullet(startX, startY, targetX, targetY) {
        const bullet = new Bullet(this.currentBulletType, startX, startY, targetX, targetY);
        this.bullets.push(bullet);
    }

    // Các phương thức còn lại...
}
