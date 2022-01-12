// Singleton that controls the emission of messages for the
// pub/sub pattern.

let listeners = {};

export default {
    on(message, listener) {
        if (!listeners[message]) {
            listeners[message] = [];
        }
        listeners[message].push(listener);
    },

    // run the function assigned to a message
    emit(message, payload = null) {        
        if (listeners[message]) {
            listeners[message].forEach((l) => l(payload));
        }
    },

    clear() {
        listeners = {};
    }
};