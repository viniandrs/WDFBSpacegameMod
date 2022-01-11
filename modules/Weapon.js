import { Cooldown } from "./Cooldown";

class Weapon {
    constructor() { };
  
    fire() {
      if (!this.cooldown || this.cooldown.cool) {
        // produce a laser
        this.cooldown = new Cooldown(500);
      } else {
        // do nothing - it hasn't cooled down yet.
      }
    }
  }

  export { Weapon };