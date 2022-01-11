class Cooldown {
    constructor(time) {
        this.cool = false;
        setTimeout(() => {
            this.cool = true;
        }, time)
    }
}

export { Cooldown };