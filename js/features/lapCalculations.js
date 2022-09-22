"use strict";
import { selectors } from "./index.js";
let slowestLap = 0;
let fastestLap = Infinity;

export const calculateLapTime = (count) => {
  if (slowestLap < count) {
    displayRedIfSlowest(selectors.lapTimeSelector);
    selectors.lapTimeSelector[1].parentElement.classList.add("slowest-lap");
    slowestLap = count;
  } else if (fastestLap > count) {
    displayGreenIfFastest(selectors.lapTimeSelector);
    selectors.lapTimeSelector[1].parentElement.classList.add("fastest-lap");
    fastestLap = count;
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
};

export const displayGreenIfFastest = () => {
  [...selectors.lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("fastest-lap");
  });
};
