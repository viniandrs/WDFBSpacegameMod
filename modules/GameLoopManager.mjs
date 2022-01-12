import StatusBar from "./StatusBar.mjs";
import GameObjectsList from "./GameObjectsList.mjs";
import updateGameObjects from "./update.mjs";
import EventEmitter from "./EventEmitter.mjs";
import addListeners from "./addListeners.mjs";
import Hero from "./Hero.mjs";
import Enemy from "./Enemy.mjs";

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

function createHero() {
    const canvas = document.getElementById("canvas");
    const hero = new Hero(
        canvas.width / 2 - 45,
        canvas.height - canvas.height / 4
    );

    GameObjectsList.addGameObject(hero);
}

function createEnemies() {
    const MONSTER_WIDTH = 98;
    const MONSTER_HEIGTH = 50;
    const MONSTERS_IN_COLUMN = 5;
    const MONSTERS_IN_LINE = 5;

    const canvas = document.getElementById("canvas");

    const MONSTER_LINE_WIDTH = MONSTERS_IN_LINE * MONSTER_WIDTH;
    const START_X = (canvas.width - MONSTER_LINE_WIDTH) / 2;
    const STOP_X = START_X + MONSTER_LINE_WIDTH;

    for (let x = START_X; x < STOP_X; x += MONSTER_WIDTH) {
        for (let y = 0; y < MONSTER_HEIGTH * MONSTERS_IN_COLUMN; y += MONSTER_HEIGTH) {
            const enemy = new Enemy(x, y);
            GameObjectsList.addGameObject(enemy);
        }
    }
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