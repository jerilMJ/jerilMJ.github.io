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

class Timer {
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

document.addEventListener("DOMContentLoaded", () => {
  let navList = document.getElementsByClassName("nav-list");
  let navLinks = document.getElementsByClassName("nav-link");

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("mouseover", () => {
      navList[0].querySelectorAll("li")[i + 1].classList.add("hovered");
    }); // +1 to skip the logo which is also in li

    navLinks[i].addEventListener("mouseout", () => {
      navList[0].querySelectorAll("li")[i + 1].classList.remove("hovered");
    });
  }

  let wrappers = document.getElementsByClassName("wrapper");
  let autoNavTime = 100 * 1000;

  for (let a = 0; a < wrappers.length; a++) {
    let mainContainers = wrappers[a].getElementsByClassName("main-container");
    let currentContainer = 0;

    let leftButton = wrappers[a].getElementsByClassName("left-button");
    let rightButton = wrappers[a].getElementsByClassName("right-button");

    wrappers[a].addEventListener("mousedown", event => {
      initPosX = event.screenX;
      if (!isDragging) {
        isDragging = true;
      }
    });

    wrappers[a].addEventListener("mouseup", event => {
      finalPosX = event.screenX;
      if (isDragging) {
        if (finalPosX - initPosX > 75) {
          handleLeftNav();
        } else if (finalPosX - initPosX < -75) {
          handleRightNav();
        }
        isDragging = false;
      }
    });
    wrappers[a].addEventListener("touchstart", event => {
      initPosX = event.touches[0]["screenX"];
      if (!isDragging) {
        isDragging = true;
      }
    });

    wrappers[a].addEventListener("touchend", event => {
      finalPosX = event.changedTouches[0]["screenX"];
      if (isDragging) {
        if (finalPosX - initPosX > 75) {
          handleLeftNav();
        } else if (finalPosX - initPosX < -75) {
          handleRightNav();
        }
        isDragging = false;
      }
    });
    let initPosX;
    let isDragging = false;

    leftButton[0].addEventListener("click", () => {
      handleLeftNav();
    });

    rightButton[0].addEventListener("click", () => {
      handleRightNav();
    });

    for (let i = 0; i < mainContainers.length; i++) {
      let offset = i * 300;
      mainContainers[i].classList.add("no-transitions");
      mainContainers[i].style.transform = `translateX(${offset}vh)`;
    }

    function handleRightNav() {
      if (currentContainer + 1 < mainContainers.length) {
        fadeAndShowRight(currentContainer, currentContainer + 1);
      } else {
        fadeAndShowRight(currentContainer, 0);
      }
      switchTimer = switchTimer.reset(autoRightNav);
    }

    function handleLeftNav() {
      if (currentContainer - 1 > -1) {
        fadeAndShowLeft(currentContainer, currentContainer - 1);
      } else {
        fadeAndShowLeft(currentContainer, mainContainers.length - 1);
      }
      switchTimer = switchTimer.reset(autoLeftNav);
    }

    function fadeAndShowLeft(i, j) {
      removeAllContainersExceptFor(i, j);
      fadeContainerRight(i);
      showContainerLeft(j);
      currentContainer = j;
    }

    function fadeAndShowRight(i, j) {
      removeAllContainersExceptFor(i, j);
      fadeContainerLeft(i);
      showContainerRight(j);
      currentContainer = j;
    }

    function removeAllContainersExceptFor(a, b) {
      for (let i = 0; i < mainContainers.length; i++) {
        if (i !== a && i !== b) {
          mainContainers[i].style.display = "none";
        } else {
          mainContainers[i].style.display = "grid";
        }
      }
    }

    function fadeContainerLeft() {
      for (let i = 0; i < mainContainers.length; i++) {
        mainContainers[i].classList.remove("fade-right");
        mainContainers[i].classList.remove("appear-left");
        mainContainers[i].classList.remove("appear-right");
        mainContainers[i].classList.add("fade-left");
      }
    }

    function fadeContainerRight() {
      for (let i = 0; i < mainContainers.length; i++) {
        mainContainers[i].classList.remove("fade-left");
        mainContainers[i].classList.remove("appear-left");
        mainContainers[i].classList.remove("appear-right");
        mainContainers[i].classList.add("fade-right");
      }
    }

    function showContainerRight(i) {
      mainContainers[i].classList.remove("fade-left");
      mainContainers[i].classList.remove("fade-right");
      mainContainers[i].classList.remove("appear-left");
      mainContainers[i].classList.add("appear-right");
    }

    function showContainerLeft(i) {
      mainContainers[i].classList.remove("fade-left");
      mainContainers[i].classList.remove("fade-right");
      mainContainers[i].classList.remove("appear-right");
      mainContainers[i].classList.add("appear-left");
    }

    let autoRightNav = () => {
      if (currentContainer + 1 < mainContainers.length) {
        fadeAndShowRight(currentContainer, currentContainer + 1);
      } else {
        fadeAndShowRight(currentContainer, 0);
      }
    };

    let autoLeftNav = () => {
      if (currentContainer - 1 > -1) {
        fadeAndShowLeft(currentContainer, currentContainer - 1);
      } else {
        fadeAndShowLeft(currentContainer, mainContainers.length - 1);
      }
    };

    let switchTimer = new Timer(autoRightNav, autoNavTime);
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  cards = document.getElementsByClassName("card");
  Array.prototype.forEach.call(cards, card => {
    card.addEventListener("mouseenter", () => {
      const skillId = card.id;
      card.getElementsByClassName("skill-bar")[0].style.visibility = "visible";

      card.getElementsByClassName(
        "skill-level"
      )[0].style.width = `${skills[skillId]}%`;
    });
  });

  const header = document.getElementsByTagName("header")[0];

  let mq = window.matchMedia("(max-width: 850px)");

  if (mq.matches) {
    header.style.visibility = "hidden";
    header.classList.add("away");
    const callerButton = this.document.getElementById("call-nav-button");
    const overlayPlaceholder = document.getElementById("overlay-placeholder");

    header.querySelectorAll("a").forEach(anchor => {
      anchor.addEventListener("click", () => {
        header.classList.add("away");
        overlayPlaceholder.classList.remove("overlay");
        callerButton.classList.remove("call-nav-away");
      });
    });

    callerButton.addEventListener("click", () => {
      header.style.visibility = "visible";
      header.classList.remove("away");
      overlayPlaceholder.classList.add("overlay");
      callerButton.classList.add("call-nav-away");
    });
    // window width is at less than 850px
    header.addEventListener("click", event => {
      if (
        event.clientX >
        this.document
          .getElementsByClassName("nav-list")[0]
          .getBoundingClientRect().width
      ) {
        header.classList.add("away");
        overlayPlaceholder.classList.remove("overlay");
        callerButton.classList.remove("call-nav-away");
      }
    });
  } else {
    // window width is greater than 850px
  }
});

window.onscroll = function(ev) {
  const topNavButton = document.getElementById("top-nav-button");
  if (window.scrollY > window.innerHeight) {
    topNavButton.classList.add("top-nav-move-in");
  } else {
    topNavButton.classList.remove("top-nav-move-in");
  }
};
