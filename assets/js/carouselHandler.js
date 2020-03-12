import { Carousel } from "./carousel.js";

export class CarouselHandler {
  constructor(carousels, autoNavTime) {
    this.carousels = [...carousels];
    this.autoNavTime = autoNavTime;
    this.carouselObjects = [];
  }

  handleAllCarousels() {
    this.carousels.forEach(carousel => {
      this.carouselObjects.push(new Carousel(carousel, this.autoNavTime));
    });
  }
}
