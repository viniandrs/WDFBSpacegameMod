let imgLife = undefined;

function loadImage(path) {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = path
        img.onload = () => {
            resolve(img)
        }
    })
}

export default {
    async loadLife(path) {
        imgLife = await loadImage(path);
    },

    drawLife(canvas, hero) {
        const START_POS = canvas.width - 180;
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < hero.life; i++) {
            ctx.drawImage(
                imgLife,
                START_POS + (45 * (i + 1)),
                37);
        }
    },

    drawPoints(ctx, hero) {
        ctx.font = "30px Times New Roman";
        ctx.fillStyle = "red";
        ctx.textAlign = "left";
        ctx.fillText("Points: " + hero.points, 10, 20);
    }
}