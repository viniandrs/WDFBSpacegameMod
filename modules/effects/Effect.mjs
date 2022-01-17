class Effect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spritesheet = undefined;
        this.spriteWidth = undefined;
        this.spriteHeight = undefined;
        this.frames = undefined; // number of frames in the animation
        this.scale = undefined; // resizing factor
    }

    _animate() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const frameWidth = this.spritesheet.width / this.frames;

        let i = 0
        let id = setInterval(() => {
            if (i < this.frames) {

                ctx.drawImage(this.spritesheet,                 // spritesheet file
                    frameWidth * i, 0,                          // sprite location in the spritesheet
                    this.spriteWidth, this.spriteHeight,        // sprite dimensions
                    this.x - (this.spriteWidth*this.scale/2),   // drawing location on canvas
                    this.y - (this.spriteHeight*this.scale/2), 
                    this.spriteWidth * this.scale, this.spriteHeight * this.scale); // drawing dimensions

                i++;
            } else {
                clearInterval(id);
            }
        }, 75)
    }
}

export default Effect;