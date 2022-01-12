import GameObjectsList from "./GameObjectsList.js";
import EventEmitter from "./EventEmitter.js";
import Messages from "./messages.js";

function intersectRect(r1, r2) {
    return !(
      r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top
    );
  }

function updateGameObjects() {
    const enemies = GameObjectsList.entityList("Enemy");
    const lasers = GameObjectsList.entityList("Laser");
    const h = GameObjectsList.myHero();

    // laser hit enemy
    lasers.forEach((l) => {
        enemies.forEach((m) => {
            if (intersectRect(l.rectFromGameObject(), m.rectFromGameObject())) {
                EventEmitter.emit(Messages.COLLISION_ENEMY_LASER, {
                    laser: l,
                    enemy: m,
                    hero: h
                });
            }
        });
    });

    // player hit enemies
    enemies.forEach(m => {
        const heroRect = h.rectFromGameObject();
        if (intersectRect(heroRect, m.rectFromGameObject())) {
            EventEmitter.emit(Messages.COLLISION_ENEMY_HERO, { 
                enemy: m,
                hero: h });
        }
    });

    // deleting dead game objects
    GameObjectsList.removeDead();
}

export default updateGameObjects;