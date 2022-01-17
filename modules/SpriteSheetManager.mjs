let spriteSheetGallery = {};

function loadImage(path) {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = path
        img.onload = () => {
            resolve(img)
        }
    });
}

export default {
    async loadSpriteSheet(path, spriteSheetName){
        let spritesheet = await loadImage(path);
        spriteSheetGallery[spriteSheetName] = spritesheet;
    },

    getSpriteSheet(spriteSheetName){
        return spriteSheetGallery[spriteSheetName];
    }
};