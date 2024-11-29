class GameManager {
    constructor(canvas, images) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.images = images;

        this.cannon = new Cannon(this.canvas.width / 2, this.canvas.height);
        this.bullets = [];
        this.webs = [];
        this.fishManager = new FishManager(canvas);

        this.score = 0;
        this.animationId = null;

        this.initEventListeners();
    }

    initEventListeners() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Điều chỉnh góc của súng thần công và bắn
            this.cannon.adjustAngle(x, y);
            this.shootBullet(x, y);
        });
    }

    shootBullet(x, y) {
    const bullet = this.cannon.shoot();
    if (bullet) {
        this.bullets.push(bullet);
        this.spawnWeb(x, y, bullet.radius);  // Đảm bảo truyền radius của đạn cho web
    }
}

   spawnWeb(x, y, radius) {
    // Lấy cấp độ súng từ cannon và tạo web tương ứng với cấp độ đó
    const currentWebType = this.cannon.level; // Dùng cấp độ súng
    const web = new Web(currentWebType, x, y, radius, this.images.web); // Dùng cấp độ súng làm loại lưới
    this.webs.push(web);
}

    updateBullets() {
        this.bullets.forEach((bullet, index) => {
            bullet.update();
            if (bullet.isOutOfBounds(this.canvas.width, this.canvas.height)) {
                this.bullets.splice(index, 1);
            } else {
                // Kiểm tra va chạm với cá
                const collision = this.fishManager.checkCollision(bullet);
                if (collision) {
                    this.bullets.splice(index, 1);
                    this.spawnWeb(collision.x, collision.y, collision.radius);
                    this.score += collision.type.score;
                }
            }
        });
    }   

    updateWebs() {
        this.webs.forEach((web, index) => {
            web.update();
            if (web.isAnimationComplete()) {
                this.webs.splice(index, 1);
            }
        });
    }

    update() {
        this.fishManager.updateAndDraw();
        this.updateBullets();
        this.updateWebs();

        this.cannon.draw(this.ctx);

        // Vẽ đạn
        this.bullets.forEach((bullet) => bullet.draw(this.ctx));

        // Vẽ lưới
        this.webs.forEach((web) => web.draw(this.ctx));

        // Vẽ điểm số
        this.drawScore();
    }

    drawScore() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);
    }

    start() {
        const gameLoop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.update();
            this.animationId = requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }

    stop() {
        cancelAnimationFrame(this.animationId);
    }
}