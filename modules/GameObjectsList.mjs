let list = [];

export default {
    addGameObject(go) {
        list.push(go);
    },

    entityList(entityType) {
        return list.filter(go => go.type === entityType);
    },

    myHero() {
        return list.find(go => go.type === "Hero");
    },

    enemiesAlive() {
        return list.filter((go) => go.type === "Enemy" && !go.dead);
    },

    removeDead() {
        list = list.filter(go => !go.dead);
    },

    drawGameObjects() {
        list.forEach(go => go.draw());
    },

    clearList() {
        list = [];
    }
};