export default class Keyboard {

  constructor() {
    this.angle = false;
    this.startPos = { x: 0, y: 0 };
    document.addEventListener('touchstart', (e) => this.onTouchStart(e));
    document.addEventListener('touchmove', (e) => this.onTouchMove(e));
    document.addEventListener('touchend', (e) => this.onTouchEnd(e));
  }

  onTouchStart(e) {
    this.startPos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }

  onTouchMove(e) {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;
    const dx = x - this.startPos.x;
    const dy = y - this.startPos.y;
    const angle = Math.atan2(dy, dx);
    this.angle = angle;
  }

  onTouchEnd(e) {
    this.angle = false;
  }

  getAngle() {
    return this.angle;
  }


}