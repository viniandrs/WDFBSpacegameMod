// Singleton that controls the game flow.

import StatusBar from "./StatusBar.mjs";
import GameObjectsList from "./GameObjectsList.mjs";
import updateGameObjects from "./update.mjs";
import EnemyGenerator from "./EnemyGenerator.mjs";
import SpriteSheetManager from "./SpriteSheetManager.mjs";
//import EventEmitter from "./EventEmitter.mjs";
import Hero from "./GameObjects/Hero.mjs";

let gameLoopId = undefined;
const fps = 30;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function displayMessage(message, color = "red") {
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

function createHero() {
    const hero = new Hero(
        canvas.width / 2 - 45,
        canvas.height - canvas.height / 4
    );

    GameObjectsList.addGameObject(hero);
}

export default {
    GameLoop() {
        const hero = GameObjectsList.myHero();

        gameLoopId = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // process collisions
            updateGameObjects();

            //drawing game objects in the canvas
            GameObjectsList.drawGameObjects();

            // update screen info
            StatusBar.drawStatusBar();

        }, 1000 / fps);
    },

    endGame(status) {
        EnemyGenerator.stopGenerating();
        clearInterval(gameLoopId);

        // set a delay so we are sure any paints have finished
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (status === "win") {
                displayMessage(
                    "Victory!!! Pew Pew... - Press [Enter] to start a new game Captain Pew Pew",
                    "green"
                );
            } else {
                displayMessage(
                    "You died !!! Press [Enter] to start a new game Captain Pew Pew"
                );
            }
        }, 1000);
    },

    initGame() {
        // loading spritesheets
        SpriteSheetManager.loadSpriteSheet("images/spritesheet1.png", "spritesheet1");
        SpriteSheetManager.loadSpriteSheet("images/explosion.png", "explosion");

        EnemyGenerator.startGenerating();
        createHero();

        this.GameLoop();
    },

    resetGame() {
        if (gameLoopId) {
            clearInterval(gameLoopId);
            //EventEmitter.clear();
            GameObjectsList.clearList();
            this.initGame();
        }
    },

    getGameLoopId() {
        return gameLoopId;
    }
};