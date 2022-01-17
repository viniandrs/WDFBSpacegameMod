import EventEmitter from "./EventEmitter.mjs";
import Explosion from "./effects/Explosion.mjs";
import GameObjectsList from "./GameObjectsList.mjs";
import Messages from "./messages.mjs";
import GameLoopManager  from "./GameLoopManager.mjs";

function isEnemiesDead() {
    const enemies = GameObjectsList.enemiesAlive();
    return enemies.length === 0;
}

function addListeners() {
    // Write all event messages and add them to the EventEmitter object.
    EventEmitter.on(Messages.KEY_EVENT_SPACE, (hero) => {
        if (hero.canFire()) {
            hero.fire();
        }
    });

    EventEmitter.on(Messages.COLLISION_ENEMY_LASER, ({ laser, enemy, hero }) => {
        let explosion = new Explosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
        setTimeout(()=>{
            explosion = null;
        }, 800);
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