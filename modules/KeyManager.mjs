let pressed_keys = [];

export default {
    keyPressed(key) {
        if (!pressed_keys.find((element) => element === key)) {
            pressed_keys.push(key);
        }
    },

    keyReleased(key) {
        const index = pressed_keys.indexOf(key);
        if (index > -1) {
            pressed_keys.splice(index, 1);
            return;
        }
        console.log("ERROR IN KEY RELEASED FUNCTION");
    },

    isPressed(key) {
        return pressed_keys.find(element => element === key) != undefined;
    },

    keyList() {
        return pressed_keys;
    }
}