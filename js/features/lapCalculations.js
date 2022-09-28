"use strict";

import { selectors } from "./index.js";
import { helpers } from "./index.js";

let slowestLap = 0;
let fastestLap = Infinity;
let firstLapTime = 0;

// --------------------------------------------- //

export const calculateLapTime = (lastLapTime) => {
  if (helpers.lapNumber == 2) {
    firstLapTime = lastLapTime;
  }
  if (helpers.lapNumber == 3) {
    slowestLap = lastLapTime;
    if (firstLapTime > slowestLap) {
      selectors.lapTimeSelector[2].parentElement.classList.add("slowest-lap");
      selectors.lapTimeSelector[1].parentElement.classList.add("fastest-lap");
    } else if (firstLapTime < fastestLap) {
      fastestLap = lastLapTime;
      selectors.lapTimeSelector[2].parentElement.classList.add("fastest-lap");
      selectors.lapTimeSelector[1].parentElement.classList.add("slowest-lap");
    }
  }
  if (helpers.lapNumber > 3) {
    if (lastLapTime > slowestLap) {
      slowestLap = lastLapTime;
      displaySlowestLapTime(selectors.lapTimeSelector);
    } else if (lastLapTime < fastestLap) {
      fastestLap = lastLapTime;
      displayFastestLapTime(selectors.lapTimeSelector);
    }
  }
};

// FIX RENDERING OF FIRST LAPS
// IF LAP NUMBER < 2 DONT CHANGE COLORS
// IF LAP NUMBER >= 2 CHANGE COLORS OF FIRST RENDERED LAP AND SECOND RENDERED LAP

export const resetLapStates = () => {
  slowestLap = 0;
  fastestLap = Infinity;
  firstLapTime = 0;
};

export const displaySlowestLapTime = () => {
  [...selectors.lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("slowest-lap");
  });
  selectors.lapTimeSelector[1].parentElement.classList.add("slowest-lap");
};

export const displayFastestLapTime = () => {
  [...selectors.lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("fastest-lap");
  });
  selectors.lapTimeSelector[1].parentElement.classList.add("fastest-lap");
};
