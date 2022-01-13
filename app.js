import EventEmitter from "./modules/EventEmitter.mjs";
import Messages from "./modules/messages.mjs";
import GameObjectsList from "./modules/GameObjectsList.mjs";
import GameLoopManager from "./modules/GameLoopManager.mjs";
import KeyManager from "./modules/KeyManager.mjs";

window.addEventListener('keydown', (evt) => {
    const hero = GameObjectsList.myHero();
    KeyManager.keyPressed(evt.key);

    switch (evt.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
            evt.preventDefault();
            break; // Space
        default:
            break; // do not block other keys
    }

    if (evt.key === "ArrowLeft") {
        EventEmitter.emit(Messages.KEY_EVENT_LEFT, hero);
    } else if (evt.key === "ArrowRight") {
        EventEmitter.emit(Messages.KEY_EVENT_RIGHT, hero);
    } else if (evt.keyCode === 32) {
        EventEmitter.emit(Messages.KEY_EVENT_SPACE, hero);
    } else if (evt.key === "Enter") {
        EventEmitter.emit(Messages.KEY_EVENT_ENTER);
    }
});

window.addEventListener("keyup", (evt) => {
    KeyManager.keyReleased(evt.key);
});

window.onload = async () => {
    GameLoopManager.initGame();
};