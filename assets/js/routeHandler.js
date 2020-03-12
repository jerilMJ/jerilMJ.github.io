export class RouteHandler {
  constructor(navList, navLinks) {
    this.navList = navList;
    this.navLinks = [...navLinks];
  }

  handleHover() {
    const navListItems = this.navList.querySelectorAll("li");

    this.navLinks.forEach((link, i) => {
      link.addEventListener("mouseover", () => {
        navListItems[i + 1].classList.add("hovered");
      }); // 1 is added to skip the logo which is also in the list-items

      link.addEventListener("mouseout", () => {
        navListItems[i + 1].classList.remove("hovered");
      });
    });
  }

  styleActiveRoute(routeNames) {
    const activeRoute = window.location.href;

    routeNames.forEach(routeName => {
      // checks if active route is the origin which is the about-me page
      if (activeRoute == window.location.origin + "/") {
        this.navLinks
          .find(link => {
            return link.id === "about-me-anchor";
          })
          .classList.add("active-route");
      } else if (activeRoute.includes(routeName)) {
        this.navLinks
          .find(link => {
            return link.id === routeName + "-anchor";
          })
          .classList.add("active-route");
      }
    });
  }
}
