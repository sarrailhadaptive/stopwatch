"use strict";
import { selectors } from "./index.js";
// import { helpers } from "./index.js";
let slowestLap = 0;
let fastestLap = Infinity;

export const calculateLapTime = (lastLapTime) => {
  console.log(
    `Last Lap Time: ${lastLapTime}  -  Slowest Lap: ${slowestLap}  -  Fastest Lap: ${fastestLap}`
  );
  if (lastLapTime > slowestLap) {
    displayRedIfSlowest(selectors.lapTimeSelector);
    selectors.lapTimeSelector[1].parentElement.classList.add("slowest-lap");
    slowestLap = lastLapTime;
  } else if (lastLapTime < fastestLap) {
    displayGreenIfFastest(selectors.lapTimeSelector);
    selectors.lapTimeSelector[1].parentElement.classList.add("fastest-lap");
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
};

export const displayGreenIfFastest = () => {
  [...selectors.lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("fastest-lap");
  });
};
