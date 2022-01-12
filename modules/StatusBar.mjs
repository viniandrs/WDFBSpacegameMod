import GameObjectsList from "./GameObjectsList.mjs"

let imgLife = undefined;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

    drawLife() {
        const hero = GameObjectsList.myHero();
        const START_POS = canvas.width - 180;

        for (let i = 0; i < hero.life; i++) {
            ctx.drawImage(
                imgLife,
                START_POS + (45 * (i + 1)),
                37);
        }
    },

    drawPoints() {
        const hero = GameObjectsList.myHero();
        ctx.font = "30px Times New Roman";
        ctx.fillStyle = "red";
        ctx.textAlign = "left";
        ctx.fillText("Points: " + hero.points, 10, 20);
    }
}