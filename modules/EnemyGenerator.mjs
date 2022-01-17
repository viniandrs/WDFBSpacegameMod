import Enemy from "./GameObjects/Enemy.mjs";
import GameObjectsList from "./GameObjectsList.mjs";

let generateID = undefined;
const generateTime = 4000;
const MONSTER_Y = -50;
const MONSTER_WIDTH = 93; //change it later

function genereateEnemies() {
    const canvas = document.getElementById("canvas");

    let MONSTER_X = Math.random()*canvas.width;
    while (MONSTER_X > canvas.width - MONSTER_WIDTH){
        MONSTER_X = Math.random()*canvas.width;
    }

    const enemy = new Enemy(MONSTER_X, MONSTER_Y);
    GameObjectsList.addGameObject(enemy);
}

export default {
    startGenerating() {
        generateID = setInterval(() => {
            genereateEnemies();
        }, generateTime);
    },

    stopGenerating() {
        clearInterval(generateID);
    }

}