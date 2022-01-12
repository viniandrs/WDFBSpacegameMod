import EventEmitter from "./EventEmitter.js";
import GameObjectsList from "./GameObjectsList.js";
import Messages from "./messages.js";
import GameLoopManager  from "./GameLoopManager.js";

function isEnemiesDead() {
    const enemies = GameObjectsList.enemiesAlive();
    return enemies.length === 0;
}

function addListeners() {
    // registering the messages
    EventEmitter.on(Messages.KEY_EVENT_UP, (hero) => {
        hero.y -= 5;
    })

    EventEmitter.on(Messages.KEY_EVENT_DOWN, (hero) => {
        hero.y += 5;
    });

    EventEmitter.on(Messages.KEY_EVENT_LEFT, (hero) => {
        hero.x -= 5;
    });

    EventEmitter.on(Messages.KEY_EVENT_RIGHT, (hero) => {
        hero.x += 5;
    });

    EventEmitter.on(Messages.KEY_EVENT_SPACE, (hero) => {
        if (hero.canFire()) {
            hero.fire();
        }
    });

    EventEmitter.on(Messages.COLLISION_ENEMY_LASER, ({ laser, enemy, hero }) => {
        enemy.dead = true;
        laser.dead = true;
        hero.incrementPoints();

        if (isEnemiesDead()) {
            EventEmitter.emit(Messages.GAME_END_WIN);
        }
    });

    EventEmitter.on(Messages.COLLISION_ENEMY_HERO, ({ enemy, hero }) => {
        enemy.dead = true;
        hero.decrementLife();

        if (hero.isHeroDead()) {
            EventEmitter.emit(Messages.GAME_END_LOSS);
            return; // loss before victory
        }
        if (isEnemiesDead()) {
            EventEmitter.emit(Messages.GAME_END_WIN);
        }
    });

    EventEmitter.on(Messages.GAME_END_WIN, () => {
        GameLoopManager.endGame("win");
    });

    EventEmitter.on(Messages.GAME_END_LOSS, () => {
        GameLoopManager.endGame("loose");
    });

    EventEmitter.on(Messages.KEY_EVENT_ENTER, () => {
        GameLoopManager.resetGame();
    });
}

export default addListeners;