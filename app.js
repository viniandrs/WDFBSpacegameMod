import EventEmitter from "./modules/EventEmitter.mjs";
import Messages from "./modules/messages.mjs";
import GameObjectsList from "./modules/GameObjectsList.mjs";
import GameLoopManager from "./modules/GameLoopManager.mjs";

let onKeyDown = function (e) {
    switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
            e.preventDefault();
            break; // Space
        default:
            break; // do not block other keys
    }
};

window.addEventListener('keydown', onKeyDown);

window.addEventListener("keyup", (evt) => {
    const hero = GameObjectsList.myHero();

    if (evt.key === "ArrowUp") {
        EventEmitter.emit(Messages.KEY_EVENT_UP, hero);
    } else if (evt.key === "ArrowDown") {
        EventEmitter.emit(Messages.KEY_EVENT_DOWN, hero);
    } else if (evt.key === "ArrowLeft") {
        EventEmitter.emit(Messages.KEY_EVENT_LEFT, hero);
    } else if (evt.key === "ArrowRight") {
        EventEmitter.emit(Messages.KEY_EVENT_RIGHT, hero);
    } else if (evt.keyCode === 32) {
        EventEmitter.emit(Messages.KEY_EVENT_SPACE, hero);
    } else if (evt.key === "Enter") {
        EventEmitter.emit(Messages.KEY_EVENT_ENTER);
    }
});

window.onload = async () => {
    GameLoopManager.initGame();
};