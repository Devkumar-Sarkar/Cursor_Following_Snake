const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const N = 28;

const pointer = {
    x: width / 2,
    y: height / 2
};

const elems = Array.from({ length: N }, () => ({
    x: pointer.x,
    y: pointer.y
}));

window.addEventListener("mousemove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
});

function run() {
    ctx.clearRect(0, 0, width, height);

    // Head follows the cursor
    elems[0].x += (pointer.x - elems[0].x) * 0.25;
    elems[0].y += (pointer.y - elems[0].y) * 0.25;

    // Body follows the previous segment
    for (let i = 1; i < N; i++) {
        const e = elems[i];
        const prev = elems[i - 1];

        e.x += (prev.x - e.x) * 0.35;
        e.y += (prev.y - e.y) * 0.35;
    }

    // Draw the spine
    for (let i = 1; i < N; i++) {
        const e = elems[i];
        const prev = elems[i - 1];

        const angle = Math.atan2(prev.y - e.y, prev.x - e.x);
        const size = 12 * (1 - i / N) + 2;

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.rotate(angle);

        // Vertebra
        ctx.fillStyle = "#e8e8e8";
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();

        // Spine spikes
        ctx.fillStyle = "#ffffff";

        ctx.beginPath();
        ctx.moveTo(-size * 0.3, -size * 0.4);
        ctx.lineTo(-size * 1.5, -size * 2);
        ctx.lineTo(size * 0.4, -size * 0.5);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-size * 0.3, size * 0.4);
        ctx.lineTo(-size * 1.5, size * 2);
        ctx.lineTo(size * 0.4, size * 0.5);
        ctx.fill();

        ctx.restore();
    }

    requestAnimationFrame(run);
}

run();