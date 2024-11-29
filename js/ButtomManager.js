class Button {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = type.width;
        this.height = type.height;
        this.image = new Image();
        this.image.src = `images/${type.image}`;
        this.rect = type.up.rect; // Mặc định nút ở trạng thái "up"
        this.isPressed = false;
    }

    // Kiểm tra xem vị trí chuột có nằm trong nút không
    isMouseOver(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width &&
               mouseY >= this.y && mouseY <= this.y + this.height;
    }

    // Cập nhật trạng thái của nút
    update(mouseX, mouseY, isMouseDown) {
        if (this.isMouseOver(mouseX, mouseY)) {
            this.rect = this.type.down.rect; // Nếu chuột đang trên nút và nhấn, thay đổi thành "down"
            if (isMouseDown && !this.isPressed) {
                this.isPressed = true; // Đánh dấu nút đã được nhấn
                this.onClick(); // Gọi hàm xử lý khi nhấn nút
            }
        } else {
            this.rect = this.type.up.rect; // Nếu chuột không trên nút, thay về trạng thái "up"
            this.isPressed = false;
        }
    }

    // Hàm xử lý khi nhấn nút (Cần phải được định nghĩa khi khởi tạo nút)
    onClick() {}

    // Vẽ nút lên canvas
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.rect[0], this.rect[1], this.rect[2], this.rect[3],
            this.x, this.y,
            this.width, this.height
        );
    }
}

class ButtonManager {
    constructor() {
        this.buttons = [];
    }

    // Thêm nút vào quản lý
    addButton(type, x, y, onClick) {
        const button = new Button(type, x, y);
        button.onClick = onClick; // Định nghĩa hành động khi nút được nhấn
        this.buttons.push(button);
    }

    // Cập nhật trạng thái các nút
    update(mouseX, mouseY, isMouseDown) {
        this.buttons.forEach(button => {
            button.update(mouseX, mouseY, isMouseDown);
        });
    }

    // Vẽ tất cả các nút
    draw(ctx) {
        this.buttons.forEach(button => {
            button.draw(ctx);
        });
    }
}