import { Enemy } from "./GameObjects";

const MONSTER_WIDTH = 98;
const MONSTER_HEIGTH = 50;
const MONSTERS_IN_COLUMN = 5;
const MONSTERS_IN_LINE = 5;

function createEnemies(canvas) {
    const MONSTER_LINE_WIDTH = MONSTERS_IN_LINE * MONSTER_WIDTH;
    const START_X = (canvas.width - MONSTER_LINE_WIDTH) / 2;
    const STOP_X = START_X + MONSTER_LINE_WIDTH;

    for (let x = START_X; x < STOP_X; x += MONSTER_WIDTH) {
        for (let y = 0; y < MONSTER_HEIGTH * MONSTERS_IN_COLUMN; y += MONSTER_HEIGTH) {
            const enemy = new Enemy(x, y);
            enemy.img = enemyImg;
            gameObjects.push(enemy);
        }
    }
}

export { createEnemies };