import GameObject from "./GameObject.mjs";

const speed = 1;
const canvas =  document.getElementById("canvas");

class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.sprites = {
            ship: {
                spritesheet: "spritesheet1",
                x: 423,
                y: 728,
                width: 93,
                height: 84
            }
        }
        this.currentSprite = "ship";

        this.width = 93;
        this.height = 84;
        this.type = "Enemy";

        let id = setInterval(() => {
            if (this.y < canvas.height - this.height) {
                this.y += speed;
            } else {
                clearInterval(id);
            }
        }, 50)
    }
}

export default Enemy;