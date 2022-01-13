import GameObject from "./GameObject.mjs";

const speed = 15;

class Laser extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.loadImage("images/laserRed.png", "shot");
        this.currentImg = "shot";

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

