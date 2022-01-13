import GameObject from "./GameObject.mjs";

const speed = 1;

class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.loadImage("images/enemy/enemyShip.png", "default");
        this.currentImg = "default";

        this.width = 98;
        this.height = 50;
        this.type = "Enemy";

        const canvas =  document.getElementById("canvas");

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