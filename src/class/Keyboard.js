export default class Keyboard {

  constructor() {
    this.keys = new Set();
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  onKeyDown(e) {
    this.keys.add(e.code);
  }

  onKeyUp(e) {
    this.keys.delete(e.code);
  }

  isKeyDown(code) {
    return this.keys.has(code);
  }

}