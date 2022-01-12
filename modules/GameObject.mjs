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

export default GameObject;
