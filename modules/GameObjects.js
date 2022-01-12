import GameObjectsList from "./GameObjectsList.js";

class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dead = false;
        this.type = "";
        this.width = 0;
        this.height = 0;
        this.imgList = {};
        this.currentImg = undefined;
    }

    _loadAsset(path) {
        return new Promise((resolve) => {
            const img = new Image()
            img.src = path
            img.onload = () => {
                resolve(img)
            }
        });
    }

    async loadImage(path, imgName) {
        let img = new Image();
        img = await this._loadAsset(path);
        this.imgList[imgName] = img;
    }

    draw(ctx) {
        ctx.drawImage(this.imgList[this.currentImg], this.x, this.y, this.width, this.height);
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

class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.loadImage("images/enemy/enemyShip.png", "default");
        this.currentImg = "default";

        this.width = 98;
        this.height = 50;
        this.type = "Enemy";

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

export { Hero, Enemy, Laser };
