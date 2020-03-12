export class Timer {
  constructor(fn, time) {
    this.timer = setInterval(fn, time);
    this.fn = fn;
    this.time = time;
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    return this;
  }

  start() {
    if (!this.timer) {
      this.stop();
      this.timer = setInterval(this.fn, this.time);
    }
    return this;
  }

  reset(fn) {
    this.fn = fn;
    return this.stop().start();
  }
}
