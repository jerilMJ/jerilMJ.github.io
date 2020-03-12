export class Utilities {
  setupNavigateToTopButton() {
    window.onscroll = function(ev) {
      const topNavButton = document.getElementById("top-nav-button");
      if (window.scrollY > window.innerHeight) {
        topNavButton.classList.add("top-nav-move-in");
      } else {
        topNavButton.classList.remove("top-nav-move-in");
      }
    };
  }
}
