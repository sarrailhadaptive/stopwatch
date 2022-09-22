"use strict";

let slowestLap = 0;
let fastestLap = Infinity;

export const calculateLapTime = (count, lapTimeSelector) => {
  if (slowestLap < count) {
    displayRedIfSlowest(lapTimeSelector);
    lapTimeSelector[1].parentElement.classList.add("slowest-lap");
    slowestLap = count;
  } else if (fastestLap > count) {
    displayGreenIfFastest(lapTimeSelector);
    lapTimeSelector[1].parentElement.classList.add("fastest-lap");
    fastestLap = count;
  }
};

export const resetSlowestAndFastestLap = () => {
  slowestLap = 0;
  fastestLap = Infinity;
};

export const displayRedIfSlowest = (lapTimeSelector) => {
  [...lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("slowest-lap");
  });
};

export const displayGreenIfFastest = (lapTimeSelector) => {
  [...lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("fastest-lap");
  });
};
