import Effect from "./Effect.mjs";
import SpriteSheetManager from "../SpriteSheetManager.mjs";

class Explosion extends Effect {
    constructor(x, y) {
        super(x, y);

        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.frames = 8; 
        this.scale = 5;
        this.spritesheet = SpriteSheetManager.getSpriteSheet("explosion");

        this._animate();
    }
}

export default Explosion;