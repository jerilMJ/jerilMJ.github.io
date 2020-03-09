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

    if (!window.mobilecheck()) {
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
    } else {
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
    }
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
});

window.onscroll = function(ev) {
  const topNavButton = document.getElementById("top-nav-button");
  if (window.scrollY > window.innerHeight) {
    topNavButton.classList.add("top-nav-move-in");
  } else {
    topNavButton.classList.remove("top-nav-move-in");
  }
};

window.mobilecheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
