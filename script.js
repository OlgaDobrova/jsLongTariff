"use strict";

const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const ghost = document.querySelector(".flight-field img");

let active = false;
let topGhost = 397;
let leftGhost = 800;
let idInterval;

const reset = () => {
  topGhost = 397;
  leftGhost = 800;
  ghost.style.top = topGhost + "px";
  ghost.style.left = leftGhost + "px";
};

const flyAnimate = () => {
  topGhost--;
  leftGhost = leftGhost - 2;

  idInterval = requestAnimationFrame(flyAnimate);

  ghost.style.top = topGhost + "px";
  ghost.style.left = leftGhost + "px";

  if (topGhost == 0 || leftGhost == 0) reset();

  return idInterval;
};

startBtn.addEventListener("click", () => {
  if (active) {
    cancelAnimationFrame(idInterval);
    active = false;
  } else {
    idInterval = requestAnimationFrame(flyAnimate);
    active = true;
    return idInterval;
  }
});

resetBtn.addEventListener("click", () => {
  reset();
  cancelAnimationFrame(idInterval);
});
