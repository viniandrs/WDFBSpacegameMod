import GameObject from "./GameObject.mjs";

const speed = 15;

class Laser extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.sprites = {
            laser: {
                spritesheet: "spritesheet1",
                x: 858,
                y: 230,
                width: 9,
                height: 54
            }
        }
        this.currentSprite = "laser";

        this.width = 9;
        this.height = 33;
        this.type = "Laser";

        let id = setInterval(() => {
            if (this.y > 0) {
                this.y -= speed;
            } else {
                this.dead = true;
                clearInterval(id);
            }
        }, 50);
    }
}

export default Laser;

