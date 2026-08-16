const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

function resize() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", () => {

    resize();
    createTree();

});


// =====================================
// COLORS
// =====================================

const colors = [

    "#ff4f81",
    "#ff6b9a",
    "#ff8fab",
    "#ffb3c6",
    "#e91e63",
    "#f06292",
    "#ff4081",
    "#ff7eb3",
    "#ff9f1c",
    "#ffd166",
    "#ff5252",
    "#d81b60"

];


// =====================================
// HEARTS
// =====================================

const hearts = [];

function heartPath(ctx, x, y, size) {

    ctx.beginPath();

    ctx.moveTo(x, y + size * 0.35);

    ctx.bezierCurveTo(
        x - size * 0.9,
        y - size * 0.25,
        x - size * 0.55,
        y - size,
        x,
        y - size * 0.45
    );

    ctx.bezierCurveTo(
        x + size * 0.55,
        y - size,
        x + size * 0.9,
        y - size * 0.25,
        x,
        y + size * 0.35
    );

    ctx.closePath();
}


// =====================================
// CREATE HEART TREE
// =====================================

function createTree() {

    hearts.length = 0;

    const centerX = width / 2;

    const treeTop = height * 0.28;
    const treeBottom = height * 0.69;

    const treeWidth = Math.min(width * 0.76, 450);

    for (let i = 0; i < 750; i++) {

        let x;
        let y;

        while (true) {

            x =
                centerX +
                (Math.random() - 0.5) * treeWidth;

            y =
                treeTop +
                Math.random() *
                (treeBottom - treeTop);

            let nx =
                (x - centerX) /
                (treeWidth / 2);

            let ny =
                (y - (treeTop + treeBottom) / 2) /
                ((treeBottom - treeTop) / 2);

            let shape =
                Math.pow(
                    nx * nx + ny * ny - 1,
                    3
                )
                -
                nx * nx *
                Math.pow(ny, 3);

            if (shape <= 0) {
                break;
            }
        }

        hearts.push({

            x: x,

            y: y,

            size:
                Math.random() * 6 + 3,

            color:
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ],

            rotation:
                Math.random() *
                Math.PI * 2,

            speed:
                Math.random() *
                0.025 + 0.005,

            phase:
                Math.random() *
                Math.PI * 2

        });

    }

}


// =====================================
// TRUNK
// =====================================

function drawTrunk() {

    const centerX = width / 2;

    const top = height * 0.56;
    const bottom = height * 0.84;

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(centerX - 13, bottom);

    ctx.lineTo(centerX - 8, top);

    ctx.lineTo(centerX + 8, top);

    ctx.lineTo(centerX + 14, bottom);

    ctx.closePath();

    ctx.fillStyle = "#e7a5b9";

    ctx.fill();

    ctx.restore();

}


// =====================================
// BRANCHES
// =====================================

function drawBranches() {

    const centerX = width / 2;

    ctx.save();

    ctx.strokeStyle = "#dda0b3";

    ctx.lineWidth = 3;

    ctx.lineCap = "round";

    // Main branch

    ctx.beginPath();

    ctx.moveTo(centerX, height * 0.64);

    ctx.lineTo(centerX, height * 0.40);

    ctx.stroke();


    // Left

    ctx.beginPath();

    ctx.moveTo(centerX, height * 0.57);

    ctx.lineTo(centerX - 100, height * 0.40);

    ctx.stroke();


    // Right

    ctx.beginPath();

    ctx.moveTo(centerX, height * 0.55);

    ctx.lineTo(centerX + 110, height * 0.38);

    ctx.stroke();


    // Extra branches

    ctx.beginPath();

    ctx.moveTo(centerX - 15, height * 0.51);

    ctx.lineTo(centerX - 135, height * 0.32);

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(centerX + 15, height * 0.50);

    ctx.lineTo(centerX + 135, height * 0.31);

    ctx.stroke();

    ctx.restore();

}


// =====================================
// DRAW HEARTS
// =====================================

function drawHearts(time) {

    hearts.forEach(heart => {

        const floating =
            Math.sin(
                time * heart.speed +
                heart.phase
            ) * 2;

        ctx.save();

        ctx.translate(
            heart.x,
            heart.y + floating
        );

        ctx.rotate(heart.rotation);

        ctx.globalAlpha = 0.88;

        ctx.fillStyle = heart.color;

        heartPath(
            ctx,
            0,
            0,
            heart.size
        );

        ctx.fill();

        ctx.restore();

        heart.rotation += 0.001;

    });

}


// =====================================
// FLOATING HEARTS
// =====================================

const floatingHearts = [];

for (let i = 0; i < 50; i++) {

    floatingHearts.push({

        x:
            Math.random() *
            window.innerWidth,

        y:
            Math.random() *
            window.innerHeight,

        size:
            Math.random() * 6 + 3,

        speed:
            Math.random() * 0.45 + 0.12,

        color:
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ],

        alpha:
            Math.random() * 0.6 + 0.2

    });

}


function drawFloatingHearts() {

    floatingHearts.forEach(h => {

        h.y -= h.speed;

        if (h.y < -20) {

            h.y = height + 20;

            h.x =
                Math.random() *
                width;

        }

        ctx.save();

        ctx.globalAlpha = h.alpha;

        ctx.fillStyle = h.color;

        heartPath(
            ctx,
            h.x,
            h.y,
            h.size
        );

        ctx.fill();

        ctx.restore();

    });

}


// =====================================
// SPARKLES
// =====================================

function drawSparkles(time) {

    for (let i = 0; i < 35; i++) {

        const x =
            Math.random() * width;

        const y =
            Math.random() * height;

        const size =
            Math.random() * 2 + 1;

        const alpha =
            0.2 +
            Math.abs(
                Math.sin(time * 0.002 + i)
            ) * 0.6;

        ctx.save();

        ctx.globalAlpha = alpha;

        ctx.fillStyle = "#ffd6e5";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}


// =====================================
// ANIMATION
// =====================================

function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    drawSparkles(time);

    drawTrunk();

    drawBranches();

    drawHearts(time);

    drawFloatingHearts();

    requestAnimationFrame(animate);

}

createTree();

requestAnimationFrame(animate);


// =====================================
// MUSIC
// =====================================

const music =
    document.getElementById("birthdayMusic");

const musicBtn =
    document.getElementById("musicBtn");


musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicBtn.innerHTML =
            "🔊 إيقاف الموسيقى";

    } else {

        music.pause();

        musicBtn.innerHTML =
            "🎵 تشغيل الموسيقى";

    }

});


// =====================================
// COUNTDOWN
// =====================================

// حطي هون تاريخ عيد الميلاد

const birthday =
    new Date("2027-03-25T00:00:00");


function updateCountdown() {

    const now = new Date();

    const difference =
        birthday - now;

    if (difference <= 0) {

        document.getElementById(
            "countdown"
        ).innerHTML =
            "🎉 HAPPY BIRTHDAY! 🎉";

        return;

    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    document.getElementById(
        "countdown"
    ).innerHTML =

        `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);