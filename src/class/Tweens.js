const easingFunctions = new Map();
easingFunctions.set('linear', (t) => t);
easingFunctions.set('quad', (t) => t * t);

export default class Tweens {

  constructor() {
    this.tweens = new Set();
  }

  create({
    duration = 1000,
    from = 0,
    to = 1,
    easing = 'linear',
    animate,
  }) {
    const tween = {
      from,
      to,
      duration,
      currentTime: 0,
      animate,
      easingFct: easingFunctions.get(easing),
    };
    this.tweens.add(tween);
  }

  update(dt) {
    for (const tween of this.tweens) {
      tween.currentTime += dt;
      let timeFraction = tween.currentTime / tween.duration;
      if (timeFraction > 1) timeFraction = 1;
      const progress = tween.from + (tween.to - tween.from) * tween.easingFct(timeFraction);
      tween.animate(progress);
      if (timeFraction === 1) {
        this.tweens.delete(tween);
      }
    }
  }


}