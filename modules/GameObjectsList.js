let list = [];

export default {
    addGameObject(go) {
        list.push(go);
    },

    entityList(entityType) {
        return list.filter(go => go.type === entityType);
    }
};