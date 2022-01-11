import GameObjectsList from "./GameObjectsList";

class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dead = false;
        this.type = "";
        this.width = 0;
        this.height = 0;
        this.img = undefined;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    rectFromGameObject() {
        return {
            top: this.y,
            left: this.x,
            bottom: this.y + this.height,
            right: this.x + this.width,
        };
    }
}


class Hero extends GameObject {
    constructor(x, y) {
        super(x, y);
        this.width = 99;
        this.height = 75;
        this.type = "Hero";
        this.speed = { x: 0, y: 0 };
        this.cooldown = 0;
        this.life = 3;
        this.points = 0;
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
}

class Enemy extends GameObject {
    constructor(x, y, enemyImg) {
        super(x, y);
        this.width = 98;
        this.height = 50;
        this.type = "Enemy";
        this.img = enemyImg;

        let id = setInterval(() => {
            if (this.y < canvas.height - this.height) {
                this.y += 5;
            } else {
                clearInterval(id);
            }
        }, 300)
    }
}

class Laser extends GameObject {
    constructor(x, y, laserImg) {
        super(x, y);
        this.width = 9;
        this.height = 33;
        this.type = 'Laser';
        this.img = laserImg;
        let id = setInterval(() => {
            if (this.y > 0) {
                this.y -= 15;
            } else {
                this.dead = true;
                clearInterval(id);
            }
        }, 100)
    }
}

export { Hero, Enemy, Laser };
