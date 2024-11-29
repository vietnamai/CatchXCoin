const cannonMinus = {image:"bottom.png", up:{rect:[132,72,44,31]}, down:{rect:[88,72,44,31]}, width:44, height:31};

const cannonPlus = {image:"bottom.png", up:{rect:[44,72,44,31]}, down:{rect:[0,72,44,31]}, width:44, height:31};


const cannonTypes = [
    {
        image: "cannon1.png",
        frames: [
            { rect: [0, 0, 74, 74] },
            { rect: [0, 74, 74, 74] },
            { rect: [0, 148, 74, 74] },
            { rect: [0, 222, 74, 74] },
            { rect: [0, 296, 74, 74], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 1 }
    },
    {
        image: "cannon2.png",
        frames: [
            { rect: [0, 0, 74, 76] },
            { rect: [0, 76, 74, 76] },
            { rect: [0, 152, 74, 76] },
            { rect: [0, 228, 74, 76] },
            { rect: [0, 304, 74, 76], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 2 }
    },
    {
        image: "cannon3.png",
        frames: [
            { rect: [0, 0, 74, 76] },
            { rect: [0, 76, 74, 76] },
            { rect: [0, 152, 74, 76] },
            { rect: [0, 228, 74, 76] },
            { rect: [0, 304, 74, 76], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 3 }
    },
    {
        image: "cannon4.png",
        frames: [
            { rect: [0, 0, 74, 83] },
            { rect: [0, 83, 74, 83] },
            { rect: [0, 166, 74, 83] },
            { rect: [0, 249, 74, 83] },
            { rect: [0, 332, 74, 83], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 4 }
    },
    {
        image: "cannon5.png",
        frames: [
            { rect: [0, 0, 74, 85] },
            { rect: [0, 85, 74, 85] },
            { rect: [0, 170, 74, 85] },
            { rect: [0, 255, 74, 85] },
            { rect: [0, 340, 74, 85], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 5 }
    },
    {
        image: "cannon6.png",
        frames: [
            { rect: [0, 0, 74, 90] },
            { rect: [0, 90, 74, 90] },
            { rect: [0, 180, 74, 90] },
            { rect: [0, 270, 74, 90] },
            { rect: [0, 360, 74, 90], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 6 }
    },
    {
        image: "cannon7.png",
        frames: [
            { rect: [0, 0, 74, 94] },
            { rect: [0, 94, 74, 94] },
            { rect: [0, 188, 74, 94] },
            { rect: [0, 282, 74, 94] },
            { rect: [0, 376, 74, 94], stop: 1 }
        ],
        mixin: { regX: 37, regY: 45, useFrames: true, interval: 3, power: 7 }
    }
];