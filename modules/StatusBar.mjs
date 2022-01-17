import GameObjectsList from "./GameObjectsList.mjs"
import SpriteSheetManager from "./SpriteSheetManager.mjs"

const sprites = {
    life: {
        spritesheet: "spritesheet1",
        x: 775,
        y: 301,
        width: 33,
        height: 26
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export default {
    drawStatusBar() {
        const hero = GameObjectsList.myHero();
        const START_POS = canvas.width - 180;

        // obtaining the spritesheet file from the Manager
        let sprite = sprites["life"];
        let spritesheet = SpriteSheetManager.getSpriteSheet(sprite.spritesheet);

        for (let i = 0; i < hero.life; i++) {
            ctx.drawImage(spritesheet,                // spritesheet file
                sprite.x, sprite.y,                   // sprite location in the spritesheet
                sprite.width, sprite.height,          // sprite dimensions
                START_POS + (45 * (i + 1)), 10,     // drawing location on canvas
                sprite.width, sprite.height);           // drawing dimensions
        }

        ctx.font = "30px Times New Roman";
        ctx.fillStyle = "red";
        ctx.textAlign = "left";
        ctx.fillText("Points: " + hero.points, 10, 30);
    }
}