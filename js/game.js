// Khởi tạo canvas và ngữ cảnh vẽ
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Khởi tạo các đối tượng game, sử dụng loại súng từ cannonTypes.js
const cannon = new Cannon(cannonTypes[0], canvas.width, canvas.height); // Sử dụng loại súng đầu tiên trong cannonTypes
const fishManager = new FishManager(canvas);
const bulletManager = new BulletManager();
const webManager = new WebManager();

// Biến lưu trạng thái game
let lastTime = 0;

// Biến kiểm tra nếu người dùng đang giữ click chuột
let isShooting = false;

// Lắng nghe sự kiện click của người dùng
canvas.addEventListener('mousedown', (event) => {
    isShooting = true; // Khi nhấn chuột, bắt đầu bắn
    shoot(event); // Xử lý bắn ngay lập tức khi người dùng nhấn chuột
});

canvas.addEventListener('mouseup', () => {
    isShooting = false; // Dừng bắn khi người dùng thả chuột
});

canvas.addEventListener('mousemove', (event) => {
    // Cập nhật vị trí cannon theo chuột
    updateCannonPosition(event); // Cập nhật hướng cannon khi di chuyển chuột
});

// Hàm xử lý bắn đạn
function shoot(event) {
    // Tính toán hướng bắn từ vị trí của cannon và điểm click của người dùng
    const cannonCenterX = cannon.x + cannon.mixin.regX; // Tính tọa độ trung tâm cannon
    const cannonCenterY = cannon.y + cannon.mixin.regY;

    const angle = Math.atan2(event.clientY - cannonCenterY, event.clientX - cannonCenterX); // Góc bắn tính từ cannon đến điểm click

    // Tạo một đối tượng Bullet và bắn theo hướng đã tính
    const bullet = new Bullet(bulletTypes[0], cannonCenterX, cannonCenterY, angle); // Tạo đạn từ loại đầu tiên trong bulletTypes
    bulletManager.addBullet(bullet); // Thêm đạn vào danh sách quản lý đạn
}

// Hàm cập nhật vị trí của cannon theo chuột
function updateCannonPosition(event) {
    const cannonCenterX = cannon.x + cannon.mixin.regX; // Tính tọa độ trung tâm cannon
    const cannonCenterY = cannon.y + cannon.mixin.regY;
    const angle = Math.atan2(event.clientY - cannonCenterY, event.clientX - cannonCenterX); // Cập nhật góc của cannon

    // Cập nhật góc của cannon để nó luôn hướng về phía chuột
    cannon.angle = angle;
}

// Hàm khởi tạo game
function init() {
    // Tải tài nguyên cần thiết và khởi tạo game
    cannon.init();
    fishManager.init();
    bulletManager.init();

    // Khởi tạo WebManager
    webManager.init();

    // Gọi hàm update lần đầu tiên
    lastTime = performance.now();
    requestAnimationFrame(update);
}

// Hàm cập nhật trạng thái game
function update(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Cập nhật trạng thái các đối tượng
    cannon.update(deltaTime);
    fishManager.update(deltaTime);
    bulletManager.update(deltaTime);

    // Cập nhật trạng thái của WebManager (kiểm tra va chạm, vẽ lưới)
    webManager.update(deltaTime);

    // Vẽ lại khung hình
    render();

    // Gọi update cho frame tiếp theo
    requestAnimationFrame(update);
}

// Hàm vẽ lại tất cả đối tượng lên canvas
function render() {
    // Xóa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ các đối tượng
    fishManager.render(ctx);
    bulletManager.render(ctx);
    webManager.render(ctx); // Vẽ các lưới
    cannon.render(ctx);
}

// Khởi chạy game
init();