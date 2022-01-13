import GameObject from "./GameObject.mjs";
import GameObjectsList from "./GameObjectsList.mjs";
import Laser from "./Laser.mjs";
import KeyManager from "./KeyManager.mjs";

const t = 0.25;
const acceleration = 5;
const max_speed = 20;

const canvas = document.getElementById("canvas");

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

        this.x_speed = 0;
        this.x_acceleration = 0;

        this.cooldown = 0;
        this.life = 3;
        this.points = 0;
        this.currentImg = "default";

        let id = setInterval(() => {
            console.log("acceleration: " + this.x_acceleration);
            console.log("speed: " + this.x_speed);

            let arrowLeftPressed = KeyManager.isPressed("ArrowLeft");
            let arrowRightPressed = KeyManager.isPressed("ArrowRight");

            //console.log("acceleration: " + this.x_acceleration);
            //console.log("speed: " + this.x_speed);

            if (arrowLeftPressed === arrowRightPressed) {
                this.x_acceleration = 0;
            } else if (arrowLeftPressed) {
                this.x_acceleration = -acceleration;
            } else if (arrowRightPressed) {
                this.x_acceleration = acceleration;
            }
            this._move();
        }, 50);
    }

    _move() {
        if (this.x <= 0) {
            this.x = 10;
            this.x_speed = 0;
            return;
        } else if (this.x >= canvas.width - this.width) {
            this.x = canvas.width - this.width - 10;
            this.x_speed = 0;
            return;
        }

        if (Math.abs(this.x_speed) < max_speed) {
            this.x_speed += this.x_acceleration * t;
        } else {
            if(this.x_speed*this.x_acceleration < 0){
                this.x_speed += this.x_acceleration * t;
            }
        }
        this.x += (this.x_speed * t + this.x_acceleration * (Math.pow(t, 2) / 2));
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

    isHeroDead() {
        return this.life <= 0;
    }
}

export default Hero;