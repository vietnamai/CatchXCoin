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

            // Vẽ cá
            fish.draw(this.ctx);
        });
    }

    checkCollision(bullet) {
        for (let fish of this.fishes) {
            // Kiểm tra va chạm đơn giản giữa đạn và cá (dùng khoảng cách)
            const dx = fish.x - bullet.x;
            const dy = fish.y - bullet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < fish.radius + bullet.radius) {  // Nếu va chạm
                return {
                    x: fish.x,
                    y: fish.y,
                    radius: fish.radius,
                    type: fish.type // Trả về loại cá để tính điểm
                };
            }
        }
        return null; // Không có va chạm
    }

    // Chuyển thành phương thức của lớp FishManager
    updateWebs() {
        this.webs.forEach((web, index) => {
            web.update();
            if (web.isAnimationComplete()) {
                this.webs.splice(index, 1);
            }

            // Kiểm tra cá có bị bắt trong lưới không
            this.fishes.forEach(fish => {
                if (web.isFishInside(fish)) {  // Kiểm tra va chạm giữa lưới và cá
                    web.deactivate(); // Vô hiệu hóa lưới sau khi va chạm
                    // Cập nhật điểm hoặc logic khác ở đây
                }
            });
        });
    }
}