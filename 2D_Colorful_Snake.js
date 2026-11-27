const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const N = 30;

const elems = Array.from({ length: N }, () => ({
    x: width / 2,
    y: height / 2
}));

const pointer = {
    x: width / 2,
    y: height / 2
};

window.addEventListener("mousemove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
});

function run() {
    ctx.clearRect(0, 0, width, height);

    elems[0].x += (pointer.x - elems[0].x) / 6;
    elems[0].y += (pointer.y - elems[0].y) / 6;

    for (let i = 1; i < N; i++) {
        const e = elems[i];
        const prev = elems[i - 1];

        e.x += (prev.x - e.x) * 0.35;
        e.y += (prev.y - e.y) * 0.35;
    }

    for (let i = 0; i < N - 1; i++) {
        const e = elems[i];
        const next = elems[i + 1];

        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = `hsl(${200 + i * 5}, 100%, 65%)`;
        ctx.lineWidth = Math.max(1, 12 - i * 0.35);
        ctx.lineCap = "round";
        ctx.stroke();
    }

    requestAnimationFrame(run);
}

run();