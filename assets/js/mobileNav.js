export class MobileNav {
  constructor(header, callerButton, overlayPlaceholder, navList) {
    this.header = header;
    this.callerButton = callerButton;
    this.overlayPlaceholder = overlayPlaceholder;
    this.navList = navList;
  }

  setup() {
    const mq = window.matchMedia("(max-width: 850px)");

    if (mq.matches) {
      this.hideHeader();

      // hide navbar after clicking any menu-item
      this.header.querySelectorAll("a").forEach(anchor => {
        anchor.addEventListener("click", () => {
          this.hideHeader();
          this.removeOverlayAndShowButton();
        });
      });

      // show navbar w/ overlay after button click
      this.callerButton.addEventListener("click", () => {
        this.header.style.visibility = "visible";
        this.header.classList.remove("away");
        this.showOverlayAndRemoveButton();
      });

      this.header.addEventListener("click", event => {
        if (event.clientX > this.navList.getBoundingClientRect().width) {
          this.header.classList.add("away");
          this.removeOverlayAndShowButton();
        }
      });
    }
  }

  hideHeader() {
    this.header.style.visibility = "hidden";
    this.header.classList.add("away");
  }

  removeOverlayAndShowButton() {
    this.overlayPlaceholder.classList.remove("overlay");
    this.callerButton.classList.remove("call-nav-away");
  }

  showOverlayAndRemoveButton() {
    this.overlayPlaceholder.classList.add("overlay");
    this.callerButton.classList.add("call-nav-away");
  }
}
