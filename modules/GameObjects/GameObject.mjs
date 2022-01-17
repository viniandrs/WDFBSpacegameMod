import SpriteSheetManager from "../SpriteSheetManager.mjs";

class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dead = false;
        this.type = "";
        this.width = 0;
        this.height = 0;
        this.sprites = {};
        this.currentSprite = undefined;
    }

    draw() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // obtaining the spritesheet file from the Manager
        let sprite = this.sprites[this.currentSprite];
        let spritesheet = SpriteSheetManager.getSpriteSheet(sprite.spritesheet);

        ctx.drawImage(spritesheet,              // spritesheet file
            sprite.x, sprite.y,                 // sprite location in the spritesheet
            sprite.width, sprite.height,        // sprite dimensions
            this.x, this.y,                     // drawing location on canvas
            sprite.width, sprite.height);       // drawing dimensions
    }

    rectFromGameObject() {
        return {
            top: this.y,
            left: this.x,
            bottom: this.y + this.height,
            right: this.x + this.width
        };
    }
}

export default GameObject;
