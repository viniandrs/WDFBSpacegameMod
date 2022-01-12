import GameObject from "./GameObject.mjs";
import GameObjectsList from "./GameObjectsList.mjs";
import Laser from "./Laser.mjs";

class Hero extends GameObject {
    constructor(x, y) {
        super(x, y);

        // loading images
        this.loadImage("images/hero/player.png", "default");
        this.loadImage("images/hero/playerDamaged.png", "damaged");
        this.loadImage("images/hero/playerLeft.png", "left");
        this.loadImage("images/hero/playerRight.png", "right");

        this.width = 99;
        this.height = 75;
        this.type = "Hero";
        this.speed = { x: 0, y: 0 };
        this.cooldown = 0;
        this.life = 3;
        this.points = 0;
        this.currentImg = "default";
    }

    fire() {
        GameObjectsList.addGameObject(new Laser(this.x + 45, this.y - 10));
        this.cooldown = 500;

        let id = setInterval(() => {
            if (this.cooldown > 0) {
                this.cooldown -= 100;
            } else {
                clearInterval(id);
            }
        }, 200);
    }

    canFire() {
        return this.cooldown === 0;
    }

    decrementLife() {
        this.life--;
        if (this.life === 0) {
            this.dead = true;
        }
    }

    incrementPoints() {
        this.points += 100;
    }

    isHeroDead(){
        return this.life <= 0;
    }
}

export default Hero;