import GameObject from "./GameObject.mjs";
import GameObjectsList from "../GameObjectsList.mjs";
import Laser from "./Laser.mjs";
import KeyManager from "../KeyManager.mjs";

const t = 0.25;
const acceleration = 5;
const max_speed = 30;
const canvas = document.getElementById("canvas");

class Hero extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.type = "Hero";

        this.cooldown = 0;
        this.life = 3;
        this.points = 0;

        this.x_speed = 0;
        this.x_acceleration = 0;

        this.sprites = {
            ship: {
                spritesheet: "spritesheet1",
                x: 224,
                y: 832,
                width: 99,
                height: 75
            }
        }
        this.currentSprite = "ship";

        this.width = 99;
        this.height = 75;        

        // movement interval
        let id = setInterval(() => {
            let arrowLeftPressed = KeyManager.isPressed("ArrowLeft");
            let arrowRightPressed = KeyManager.isPressed("ArrowRight");

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

        // checking if the player is on the borders
        if (this.x <= 0) {
            this.x = 1;
            this.x_speed = 0;
            return;
        } else if (this.x >= canvas.width - this.width) {
            this.x = canvas.width - this.width - 1;
            this.x_speed = 0;
            return;
        }

        // accelerated kinematics for a realistic control of the spaceship
        if (Math.abs(this.x_speed) < max_speed) {
            this.x_speed += this.x_acceleration * t;
        } else if (this.x_speed * this.x_acceleration < 0) {
            this.x_speed += this.x_acceleration * t;
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
        } else if (this.life === 1) {
            this.currentImg = "damaged";
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