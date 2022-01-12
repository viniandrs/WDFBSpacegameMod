import StatusBar from "./StatusBar.js";
import GameObjectsList from "./GameObjectsList.js";
import updateGameObjects from "./update.js";
import EventEmitter from "./EventEmitter.js";
import addListeners from "./addListeners.js";
import createEnemies from "./enemiesSetup.js";
import createHero from "./heroSetup.js";

let gameLoopId = undefined;
const fps = 10;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function displayMessage(message, color = "red") {
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
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

            // update screen info
            StatusBar.drawLife(canvas, hero);
            StatusBar.drawPoints(ctx, hero);

            //drawing game objects in the canvas
            GameObjectsList.drawGameObjects(ctx);

        }, 1000 / fps);
    },

    endGame(status) {
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
        }, 200)
    },

    initGame() {
        addListeners();
        createEnemies();
        createHero();
        StatusBar.loadLife("images/life.png");

        this.GameLoop();
    },

    resetGame() {
        if (gameLoopId) {
            clearInterval(gameLoopId);
            EventEmitter.clear();
            GameObjectsList.clearList();
            this.initGame();
        }
    },

    getGameLoopId() {
        return gameLoopId;
    }
};