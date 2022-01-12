import GameObject from "./GameObject.mjs";

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
                this.y -= 15;
            } else {
                this.dead = true;
                clearInterval(id);
            }
        }, 100);
    }
}

export default Laser;

