class Web {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = `images/${type.image}`;
        this.rect = type.rect;
        this.regX = type.regX;
        this.regY = type.regY;
        this.polyArea = type.polyArea;
        this.isActive = true; // Lưới sẽ hoạt động cho đến khi hết hiệu lực
    }

    draw(ctx) {
        if (!this.isActive) return;

        ctx.drawImage(
            this.image,
            this.rect[0],
            this.rect[1],
            this.rect[2],
            this.rect[3],
            this.x - this.regX,
            this.y - this.regY,
            this.rect[2],
            this.rect[3]
        );
    }

    // Kiểm tra xem cá có nằm trong vùng lưới hay không
    isFishInside(fish) {
        if (!this.isActive) return false;

        const { x, y } = fish;
        return this.polyArea.some((point, index) => {
            const nextPoint = this.polyArea[(index + 1) % this.polyArea.length];
            const isInside =
                (point.x + this.x <= x && nextPoint.x + this.x >= x &&
                    point.y + this.y <= y && nextPoint.y + this.y >= y) ||
                (point.x + this.x >= x && nextPoint.x + this.x <= x &&
                    point.y + this.y >= y && nextPoint.y + this.y <= y);
            return isInside;
        });
    }

    deactivate() {
        this.isActive = false; // Lưới ngừng hoạt động sau khi kiểm tra va chạm
    }
}