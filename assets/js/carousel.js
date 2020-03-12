import { Timer } from "./timer.js";

export class Carousel {
  constructor(carousel, autoNavTime) {
    this.carousel = carousel;
    this.carouselItems = [...carousel.getElementsByClassName("carousel-item")];
    this.currentCarouselItem = 0;
    this.autoNavTime = autoNavTime;

    this.switchTimer = new Timer(
      this.autoRightNav.bind(this),
      this.autoNavTime
    );

    this.leftButton = carousel.getElementsByClassName("left-button");
    this.rightButton = carousel.getElementsByClassName("right-button");

    this.implementMouseSwipe();
    this.implementTouchSwipe();
    this.addNavButtons();
  }

  implementMouseSwipe() {
    let initPosX;
    let finalPosX;
    let isDragging = false;

    this.carousel.addEventListener("mousedown", event => {
      initPosX = event.screenX;
      if (!isDragging) {
        isDragging = true;
      }
    });

    this.carousel.addEventListener("mouseup", event => {
      finalPosX = event.screenX;
      if (isDragging) {
        if (finalPosX - initPosX > 75) {
          this.handleLeftNav();
        } else if (finalPosX - initPosX < -75) {
          this.handleRightNav();
        }
        isDragging = false;
      }
    });
  }

  implementTouchSwipe() {
    let initPosX;
    let finalPosX;
    let isDragging = false;

    this.carousel.addEventListener("touchstart", event => {
      initPosX = event.touches[0]["screenX"];
      if (!isDragging) {
        isDragging = true;
      }
    });

    this.carousel.addEventListener("touchend", event => {
      finalPosX = event.changedTouches[0]["screenX"];
      if (isDragging) {
        if (finalPosX - initPosX > 75) {
          this.handleLeftNav();
        } else if (finalPosX - initPosX < -75) {
          this.handleRightNav();
        }
        isDragging = false;
      }
    });
  }

  addNavButtons() {
    if (this.leftButton.length !== 0 && this.rightButton.length !== 0) {
      this.leftButton[0].addEventListener("click", () => {
        this.handleLeftNav();
      });

      this.rightButton[0].addEventListener("click", () => {
        this.handleRightNav();
      });
    }
  }

  handleLeftNav() {
    if (this.currentCarouselItem - 1 > -1) {
      this.fadeAndShowLeft(
        this.currentCarouselItem,
        this.currentCarouselItem - 1
      );
    } else {
      this.fadeAndShowLeft(
        this.currentCarouselItem,
        this.carouselItems.length - 1
      );
    }
    this.switchTimer = this.switchTimer.reset(this.autoLeftNav.bind(this));
  }

  handleRightNav() {
    if (this.currentCarouselItem + 1 < this.carouselItems.length) {
      this.fadeAndShowRight(
        this.currentCarouselItem,
        this.currentCarouselItem + 1
      );
    } else {
      this.fadeAndShowRight(this.currentCarouselItem, 0);
    }
    this.switchTimer = this.switchTimer.reset(this.autoRightNav.bind(this));
  }

  fadeAndShowLeft(i, j) {
    this.removeAllItemsExceptFor(i, j);
    this.fadeItemRight(i);
    this.showItemLeft(j);
    this.currentCarouselItem = j;
  }

  fadeAndShowRight(i, j) {
    this.removeAllItemsExceptFor(i, j);
    this.fadeItemLeft(i);
    this.showItemRight(j);
    this.currentCarouselItem = j;
  }

  removeAllItemsExceptFor(a, b) {
    for (let i = 0; i < this.carouselItems.length; i++) {
      if (i !== a && i !== b) {
        this.carouselItems[i].style.display = "none";
      } else {
        this.carouselItems[i].style.display = "grid";
      }
    }
  }

  fadeItemLeft() {
    for (let i = 0; i < this.carouselItems.length; i++) {
      this.carouselItems[i].classList.remove("fade-right");
      this.carouselItems[i].classList.remove("appear-left");
      this.carouselItems[i].classList.remove("appear-right");
      this.carouselItems[i].classList.add("fade-left");
    }
  }

  fadeItemRight() {
    for (let i = 0; i < this.carouselItems.length; i++) {
      this.carouselItems[i].classList.remove("fade-left");
      this.carouselItems[i].classList.remove("appear-left");
      this.carouselItems[i].classList.remove("appear-right");
      this.carouselItems[i].classList.add("fade-right");
    }
  }

  showItemLeft(i) {
    this.carouselItems[i].classList.remove("fade-left");
    this.carouselItems[i].classList.remove("fade-right");
    this.carouselItems[i].classList.remove("appear-right");
    this.carouselItems[i].classList.add("appear-left");
  }

  showItemRight(i) {
    this.carouselItems[i].classList.remove("fade-left");
    this.carouselItems[i].classList.remove("fade-right");
    this.carouselItems[i].classList.remove("appear-left");
    this.carouselItems[i].classList.add("appear-right");
  }

  autoRightNav() {
    if (this.currentCarouselItem + 1 < this.carouselItems.length) {
      this.fadeAndShowRight(
        this.currentCarouselItem,
        this.currentCarouselItem + 1
      );
    } else {
      this.fadeAndShowRight(this.currentCarouselItem, 0);
    }
  }

  autoLeftNav() {
    if (this.currentCarouselItem - 1 > -1) {
      this.fadeAndShowLeft(
        this.currentCarouselItem,
        this.currentCarouselItem - 1
      );
    } else {
      this.fadeAndShowLeft(
        this.currentCarouselItem,
        this.carouselItems.length - 1
      );
    }
  }
}
