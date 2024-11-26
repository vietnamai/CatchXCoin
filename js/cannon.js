// File: js/cannon.js

/**
 * Quản lý súng bắn cá và các hành vi liên quan
 */
const Cannon = (() => {
    let currentCannonIndex = 0; // Chỉ số loại súng hiện tại
    let currentCannon = null;  // Đối tượng súng hiện tại

    /**
     * Khởi tạo đối tượng súng dựa trên loại
     * @param {number} index - Chỉ số loại súng
     */
    const createCannon = (index) => {
        const cannonConfig = cannonTypes[index]; // Lấy cấu hình súng từ R_Cannon.js

        const cannonImage = new Image();
        cannonImage.src = `images/${cannonConfig.image}`;

        cannonImage.onload = () => {
            currentCannon = {
                type: index + 1, // Loại súng (1-7)
                power: cannonConfig.power,
                image: cannonImage,
                frames: cannonConfig.frames,
                bullet: cannonConfig.bullet,
                x: window.innerWidth / 2,
                y: window.innerHeight - 100,
                rotation: 0
            };
        };
    };

    /**
     * Vẽ súng lên canvas
     * @param {CanvasRenderingContext2D} ctx - Ngữ cảnh vẽ của canvas
     */
    const drawCannon = (ctx) => {
        if (!currentCannon) return;

        const { image, x, y, rotation } = currentCannon;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
    };

    /**
     * Xoay súng theo con trỏ chuột
     * @param {number} targetX - Tọa độ X của mục tiêu
     * @param {number} targetY - Tọa độ Y của mục tiêu
     */
    const aimCannon = (targetX, targetY) => {
        if (!currentCannon) return;

        const dx = targetX - currentCannon.x;
        const dy = targetY - currentCannon.y;
        currentCannon.rotation = (Math.atan2(dy, dx) * 180) / Math.PI;
    };

    /**
     * Chuyển đổi loại súng
     * @param {number} change - Thay đổi chỉ số loại súng (-1 hoặc 1)
     */
    const switchCannon = (change) => {
        currentCannonIndex = (currentCannonIndex + change + cannonTypes.length) % cannonTypes.length;
        createCannon(currentCannonIndex); // Tạo súng mới
    };

    /**
     * Vẽ nút chuyển đổi súng
     * @param {CanvasRenderingContext2D} ctx - Ngữ cảnh vẽ của canvas
     */
    const drawButtons = (ctx) => {
        Object.values(buttons).forEach(button => {
            ctx.drawImage(button.image, button.x, button.y, 60, 60);
        });
    };

    // Lắng nghe sự kiện chuột để xoay súng
    canvas.addEventListener("mousemove", (e) => {
        aimCannon(e.clientX, e.clientY);
    });

    // Lắng nghe sự kiện click để thay đổi loại súng
    canvas.addEventListener("click", (e) => {
        const { clientX: clickX, clientY: clickY } = e;

        if (
            clickX >= buttons.cannonMinus.x &&
            clickX <= buttons.cannonMinus.x + 60 &&
            clickY >= buttons.cannonMinus.y &&
            clickY <= buttons.cannonMinus.y + 60
        ) {
            switchCannon(-1); // Giảm cấp độ súng
        }

        if (
            clickX >= buttons.cannonPlus.x &&
            clickX <= buttons.cannonPlus.x + 60 &&
            clickY >= buttons.cannonPlus.y &&
            clickY <= buttons.cannonPlus.y + 60
        ) {
            switchCannon(1); // Tăng cấp độ súng
        }
    });

    // Public API
    return {
        createCannon,
        drawCannon,
        drawButtons
    };
})();
