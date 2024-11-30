// Khởi tạo canvas và ngữ cảnh vẽ
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Khởi tạo các đối tượng game, sử dụng loại súng từ cannonTypes.js
const cannon = new Cannon(cannonTypes[0], canvas.width, canvas.height); // Sử dụng loại súng đầu tiên trong cannonTypes
const fishManager = new FishManager(canvas);
const bulletManager = new BulletManager();
const webManager = new WebManager();

// Khởi tạo ButtonManager
const buttonManager = new ButtonManager();

// Thêm các nút vào ButtonManager
buttonManager.addButton(cannonMinus, 50, canvas.height - 60, () => {
    // Logic giảm cấp độ súng
    if (cannon.type !== cannonTypes[0]) { // Đảm bảo không hạ xuống dưới mức súng đầu tiên
        upgradeCannon(cannonTypes[cannonTypes.indexOf(cannon.type) - 1]);
    }
});

buttonManager.addButton(cannonPlus, canvas.width - 100, canvas.height - 60, () => {
    // Logic tăng cấp độ súng
    if (cannon.type !== cannonTypes[cannonTypes.length - 1]) { // Đảm bảo không vượt quá súng tối đa
        upgradeCannon(cannonTypes[cannonTypes.indexOf(cannon.type) + 1]);
    }
});

// Biến lưu trạng thái game
let lastTime = 0;
let isShooting = false; // Biến kiểm tra nếu người dùng đang giữ click chuột

// Cập nhật loại web ban đầu
webManager.upgradeWeb(cannonTypes[0].webType); // Nâng cấp lưới theo loại súng đầu tiên

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
    updateCannonPosition(event);
});

// Hàm xử lý bắn đạn
function shoot(event) {
    const cannonCenterX = cannon.x + cannon.mixin.regX; // Tính tọa độ trung tâm cannon
    const cannonCenterY = cannon.y + cannon.mixin.regY;

    const angle = Math.atan2(event.clientY - cannonCenterX, event.clientX - cannonCenterY); // Góc bắn
    cannon.angle = angle; // Cập nhật góc cho cannon

    // Tạo một viên đạn mới
    const bulletType = bulletTypes[cannon.type.bulletIndex]; // Lấy loại đạn tương ứng với súng
    bulletManager.addBullet(bulletType, cannonCenterX, cannonCenterY, event.clientX, event.clientY);

    // Tạo lưới ngay tại vị trí viên đạn
    webManager.createWeb(event.clientX, event.clientY);
}

// Hàm nâng cấp súng
function upgradeCannon(newCannonType) {
    cannon.upgrade(newCannonType); // Nâng cấp súng
    webManager.upgradeWeb(newCannonType.webType); // Nâng cấp lưới theo loại súng mới
}

// Hàm cập nhật vị trí của cannon theo chuột
function updateCannonPosition(event) {
    const cannonCenterX = cannon.x + cannon.mixin.regX;
    const cannonCenterY = cannon.y + cannon.mixin.regY;

    const angle = Math.atan2(event.clientY - cannonCenterY, event.clientX - cannonCenterX);
    cannon.angle = angle; // Cập nhật góc của cannon
}

// Hàm cập nhật trạng thái game
function update(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Cập nhật trạng thái các đối tượng
    cannon.update();
    fishManager.updateAndDraw();
    bulletManager.updateAndDraw(ctx, fishManager.fishes); // Truyền danh sách cá từ fishManager
    webManager.cleanup(); // Dọn dẹp lưới không còn hiệu lực

    // Cập nhật trạng thái các nút
    buttonManager.update(canvas.mouseX, canvas.mouseY, canvas.isMouseDown);

    // Vẽ lại khung hình
    render();

    // Gọi update cho frame tiếp theo
    requestAnimationFrame(update);
}

// Hàm vẽ lại tất cả đối tượng lên canvas
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas

    // Vẽ các đối tượng
    fishManager.render(ctx);
    bulletManager.render(ctx);
    webManager.drawAll(ctx); // Vẽ tất cả lưới
    cannon.render(ctx);

    // Vẽ các nút
    buttonManager.draw(ctx);
}

// Hàm khởi tạo game
function init() {
    lastTime = performance.now(); // Gọi hàm update lần đầu tiên
    requestAnimationFrame(update);
}

// Khởi chạy game
init();