// File: js/R_Cannon.js

export const cannonTypes = [
    {
        image: "cannon1.png",
        power: 1,
        frames: [
            { rect: [0, 0, 74, 74], label: "default" },
            { rect: [74, 0, 74, 74] },
            { rect: [148, 0, 74, 74] },
            { rect: [222, 0, 74, 74], jump: "default" }
        ],
        bullet: "bullet1.png"
    },
    {
        image: "cannon2.png",
        power: 2,
        frames: [
            { rect: [0, 0, 74, 76], label: "default" },
            { rect: [74, 0, 74, 76] },
            { rect: [148, 0, 74, 76] },
            { rect: [222, 0, 74, 76], jump: "default" }
        ],
        bullet: "bullet2.png"
    },
    // Các súng khác...
];