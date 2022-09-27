"use strict";
import { selectors } from "./index.js";
let slowestLap = 0;
let fastestLap = Infinity;
export const calculateLapTime = (lastLapTime) => {
  if (lastLapTime > slowestLap) {
    displayRedIfSlowest(selectors.lapTimeSelector);
    slowestLap = lastLapTime;
  } else if (lastLapTime < fastestLap) {
    displayGreenIfFastest(selectors.lapTimeSelector);
    fastestLap = lastLapTime;
  }
};

export const resetSlowestAndFastestLap = () => {
  slowestLap = 0;
  fastestLap = Infinity;
};

export const displayRedIfSlowest = () => {
  [...selectors.lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("slowest-lap");
  });
  selectors.lapTimeSelector[1].parentElement.classList.add("slowest-lap");
};

export const displayGreenIfFastest = () => {
  [...selectors.lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("fastest-lap");
  });
  selectors.lapTimeSelector[1].parentElement.classList.add("fastest-lap");
};
