// File: js/R_Fish.js

var fishTypes = [
    {
        image: "fish1.png",
        frames: [
            { rect: [0, 0, 55, 37], label: "swim" },
            { rect: [0, 37, 55, 37] },
            { rect: [0, 74, 55, 37] },
            { rect: [0, 111, 55, 37], jump: "swim" },
            { rect: [0, 148, 55, 37], label: "capture" },
            { rect: [0, 185, 55, 37] },
            { rect: [0, 222, 55, 37] },
            { rect: [0, 259, 55, 37], jump: "capture" }
        ],
        polyArea: [{ x: 10, y: 5 }, { x: 55, y: 5 }, { x: 55, y: 22 }, { x: 10, y: 22 }],
        mixin: { coin: 1, captureRate: 0.55, maxNumGroup: 8, minSpeed: 0.5, maxSpeed: 1.2, regX: 35, regY: 12, interval: 10 }
    },
    {
        image: "fish2.png",
        frames: [
            { rect: [0, 0, 78, 64], label: "swim" },
            { rect: [0, 64, 78, 64] },
            { rect: [0, 128, 78, 64] },
            { rect: [0, 192, 78, 64], jump: "swim" },
            { rect: [0, 256, 78, 64], label: "capture" },
            { rect: [0, 320, 78, 64] },
            { rect: [0, 384, 78, 64] },
            { rect: [0, 448, 78, 64], jump: "capture" }
        ],
        polyArea: [{ x: 15, y: 10 }, { x: 78, y: 10 }, { x: 78, y: 32 }, { x: 15, y: 32 }],
        mixin: { coin: 3, captureRate: 0.50, maxNumGroup: 6, minSpeed: 0.5, maxSpeed: 1.2, regX: 58, regY: 20, interval: 10 }
    },
    {
        image: "fish3.png",
        frames: [
            { rect: [0, 0, 72, 56], label: "swim" },
            { rect: [0, 56, 72, 56] },
            { rect: [0, 112, 72, 56] },
            { rect: [0, 168, 72, 56], jump: "swim" },
            { rect: [0, 224, 72, 56], label: "capture" },
            { rect: [0, 280, 72, 56] },
            { rect: [0, 336, 72, 56] },
            { rect: [0, 392, 72, 56], jump: "capture" }
        ],
        polyArea: [{ x: 5, y: 5 }, { x: 72, y: 5 }, { x: 72, y: 28 }, { x: 5, y: 28 }],
        mixin: { coin: 5, captureRate: 0.45, maxNumGroup: 6, minSpeed: 0.5, maxSpeed: 1.2, regX: 52, regY: 18, interval: 10 }
    },
    {
        image: "fish4.png",
        frames: [
            { rect: [0, 0, 77, 59], label: "swim" },
            { rect: [0, 59, 77, 59] },
            { rect: [0, 118, 77, 59] },
            { rect: [0, 177, 77, 59], jump: "swim" },
            { rect: [0, 236, 77, 59], label: "capture" },
            { rect: [0, 295, 77, 59] },
            { rect: [0, 354, 77, 59] },
            { rect: [0, 413, 77, 59], jump: "capture" }
        ],
        polyArea: [{ x: 10, y: 5 }, { x: 77, y: 5 }, { x: 77, y: 28 }, { x: 10, y: 28 }],
        mixin: { coin: 8, captureRate: 0.40, maxNumGroup: 6, minSpeed: 0.5, maxSpeed: 1.2, regX: 57, regY: 18, interval: 10 }
    },
    {
        image: "fish5.png",
        frames: [
            { rect: [0, 0, 107, 122], label: "swim" },
            { rect: [0, 122, 107, 122] },
            { rect: [0, 244, 107, 122] },
            { rect: [0, 366, 107, 122], jump: "swim" },
            { rect: [0, 488, 107, 122], label: "capture" },
            { rect: [0, 610, 107, 122] },
            { rect: [0, 732, 107, 122] },
            { rect: [0, 854, 107, 122], jump: "capture" }
        ],
        polyArea: [{ x: 20, y: 30 }, { x: 100, y: 30 }, { x: 100, y: 70 }, { x: 20, y: 70 }],
        mixin: { coin: 10, captureRate: 0.35, maxNumGroup: 5, minSpeed: 0.5, maxSpeed: 1.2, regX: 67, regY: 50, interval: 10 }
    },
    {
        image: "fish6.png",
        frames: [
            { rect: [0, 0, 105, 79], label: "swim" },
            { rect: [0, 79, 105, 79] },
            { rect: [0, 158, 105, 79] },
            { rect: [0, 237, 105, 79] },
            { rect: [0, 316, 105, 79] },
            { rect: [0, 395, 105, 79] },
            { rect: [0, 474, 105, 79] },
            { rect: [0, 553, 105, 79], jump: "swim" },
            { rect: [0, 632, 105, 79], label: "capture" },
            { rect: [0, 711, 105, 79] },
            { rect: [0, 790, 105, 79] },
            { rect: [0, 869, 105, 79], jump: "capture" }
        ],
        polyArea: [{ x: 45, y: 0 }, { x: 105, y: 0 }, { x: 105, y: 55 }, { x: 45, y: 55 }],
        mixin: { coin: 20, captureRate: 0.30, maxNumGroup: 3, minSpeed: 0.5, maxSpeed: 1.2, regX: 65, regY: 25, interval: 10 }
    },
    {
        image: "fish7.png",
        frames: [
            { rect: [0, 0, 92, 151], label: "swim" },
            { rect: [0, 151, 92, 151] },
            { rect: [0, 302, 92, 151] },
            { rect: [0, 453, 92, 151] },
            { rect: [0, 604, 92, 151] },
            { rect: [0, 755, 92, 151], jump: "swim" },
            { rect: [0, 906, 92, 151], label: "capture" },
            { rect: [0, 1057, 92, 151] },
            { rect: [0, 1208, 92, 151] },
            { rect: [0, 1359, 92, 151], jump: "capture" }
        ],
        polyArea: [{ x: 15, y: 5 }, { x: 85, y: 5 }, { x: 85, y: 80 }, { x: 15, y: 80 }],
        mixin: { coin: 30, captureRate: 0.25, maxNumGroup: 5, minSpeed: 0.5, maxSpeed: 0.8, regX: 40, regY: 50, interval: 10 }
    }
];;