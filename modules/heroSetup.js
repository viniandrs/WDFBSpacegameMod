import { Hero } from "./GameObjects.js";
import GameObjectsList from "./GameObjectsList.js";

function createHero() {
    const canvas = document.getElementById("canvas");
    const hero = new Hero(
        canvas.width / 2 - 45,
        canvas.height - canvas.height / 4
    );

    GameObjectsList.addGameObject(hero);
    //return hero;
}

export default createHero;