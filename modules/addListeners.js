import EventEmitter from "./EventEmitter";

function addListeners() {
    // registering the messages
    EventEmitter.on(Messages.KEY_EVENT_UP, (_, hero) => {
        hero.y -= 5;
    })

    EventEmitter.on(Messages.KEY_EVENT_DOWN, (_, hero) => {
        hero.y += 5;
    });

    EventEmitter.on(Messages.KEY_EVENT_LEFT, (_, hero) => {
        hero.x -= 5;
    });

    EventEmitter.on(Messages.KEY_EVENT_RIGHT, (_, hero) => {
        hero.x += 5;
    });

    EventEmitter.on(Messages.KEY_EVENT_SPACE, (_, hero) => {
        if (hero.canFire()) {
            hero.fire();
        }
    });

    EventEmitter.on(Messages.COLLISION_ENEMY_LASER, (_, { first, second }) => {
        first.dead = true;
        second.explode();
        hero.incrementPoints();

        if (isEnemiesDead()) {
            EventEmitter.emit(Messages.GAME_END_WIN);
        }
    });

    EventEmitter.on(Messages.COLLISION_ENEMY_HERO, (_, { enemy }) => {
        enemy.dead = true;
        hero.decrementLife();

        if (isHeroDead()) {
            EventEmitter.emit(Messages.GAME_END_LOSS);
            return; // loss before victory
        }
        if (isEnemiesDead()) {
            EventEmitter.emit(Messages.GAME_END_WIN);
        }
    });

    EventEmitter.on(Messages.GAME_END_WIN, () => {
        endGame(true);
    });

    EventEmitter.on(Messages.GAME_END_LOSS, () => {
        endGame(false);
    });

    EventEmitter.on(Messages.KEY_EVENT_ENTER, () => {
        resetGame();
    });
}

export { addListeners };