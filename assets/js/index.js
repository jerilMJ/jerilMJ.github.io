import { CardHandler } from "./cardHandler.js";
import { RouteHandler } from "./routeHandler.js";
import { CarouselHandler } from "./carouselHandler.js";
import { MobileNav } from "./mobileNav.js";
import { Utilities } from "./utilities.js";

const routes = ["experience", "skills", "my-projects", "blog"];
const skills = {
  html: 80,
  css: 70,
  js: 85,
  ts: 85,
  python: 90,
  cpp: 75,
  java: 80,
  dart: 75,
  csharp: 80,
  sql: 55,
  asm: 50,
  angular: 90,
  bootstrap: 85,
  flutter: 80,
  unity: 50,
  arduino: 90,
  pi: 75,
  firebase: 75
};

document.addEventListener("DOMContentLoaded", () => {
  // Fetching all DOM elements
  const navList = document.getElementsByClassName("nav-list")[0];
  const navLinks = document.getElementsByClassName("nav-link");
  const skillCards = document.getElementsByClassName("card");
  const carousels = document.getElementsByClassName("carousel");
  const header = document.getElementsByTagName("header")[0];
  const callerButton = document.getElementById("call-nav-button");
  const overlayPlaceholder = document.getElementById("overlay-placeholder");
  // -------------------------

  // Constants
  const autoNavTime = 10 * 1000;
  // -------------------------

  // Setting up all imported modules
  const routeHandler = new RouteHandler(navList, navLinks);
  routeHandler.styleActiveRoute(routes);
  routeHandler.handleHover();

  const skillCardHandler = new CardHandler(skillCards);
  skillCardHandler.addSkillBar(skills);

  const carouselHandler = new CarouselHandler(carousels, autoNavTime);
  carouselHandler.handleAllCarousels();

  const mobileNav = new MobileNav(
    header,
    callerButton,
    overlayPlaceholder,
    navList
  );
  mobileNav.setup();

  const utilites = new Utilities();
  utilites.setupNavigateToTopButton();
  // -------------------------
});
