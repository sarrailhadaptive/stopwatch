"use strict";
import {
  // HTMLSelectors.js
  selectors,
  // insertHTMLAndElements.js
  loaders,
  // addButtonStylesAndEvents.js
  styles,
  // startStopwatchHelpers.js
  helpers,
  // lapCalculations.js
  lapCalculations,
} from "./features/index.js";

// -------------------------------------------------------------------------------- //

let counter = 0;
let lapTimeCounter = 0;
let previousCounter = 0;
let lapTimesResetter = 0;
let lapTimes = {
  millis: 0,
  seconds: 0,
  minutes: 0,
};
let times = {
  millis: 0,
  seconds: 0,
  minutes: 0,
};
let requestAnimationFrame_ID = undefined;

// --------------------------------------------------------------------------------- //

loaders.loadDefaultLapTable();

const startStopwatchMain = () => {
  startStopwatch();
  selectors.startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
};
selectors.startStopButton.onclick = () => {
  startStopwatchMain();
};

const startStopwatch = () => {
  loaders.loadFirstLapHTML();
  requestAnimationFrame_ID = requestAnimationFrame(
    requestAnimationFrameCallback
  );
  styles.setStopButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
  styles.setLapButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    helpers.addNewLap(counter);
    lapTimesResetter = counter;
    lapCalculations.calculateLapTime(lapTimeCounter);
    lapTimeCounter = 0;
  };
};

const stopStopwatchCounter = () => {
  previousCounter = counter;
  cancelAnimationFrame(requestAnimationFrame_ID);
  styles.setStartButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    startStopwatch();
  };
  styles.setResetButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    resetStopwatch(helpers.lapNumber);
  };
};

const requestAnimationFrameCallback = () => {
  counter++;
  lapTimeCounter++;

  times.millis = counter % 100;
  times.seconds = Math.floor(counter / 100) % 60;
  times.minutes = Math.floor(counter / 6000) % 60;
  lapTimes.millis = lapTimeCounter % 100;
  lapTimes.seconds = Math.floor(lapTimeCounter / 100) % 60;
  lapTimes.minutes = Math.floor(lapTimeCounter / 6000) % 60;

  helpers.displayTimeOnMainTimer(times.millis, times.seconds, times.minutes);
  helpers.displayTimeOnFirstLapTimer(
    lapTimes.millis,
    lapTimes.seconds,
    lapTimes.minutes
  );
  requestAnimationFrame_ID = requestAnimationFrame(
    requestAnimationFrameCallback
  );
};

const resetStopwatch = () => {
  [...selectors.lapContainer].forEach((el, i) => {
    if (i < helpers.lapNumber + 7) el.remove();
  });
  loaders.loadDefaultLapTable();
  loaders.isFirstLapOnToggler();
  helpers.setLapNumberTo1();
  counter = 0;
  lapTimesResetter = 0;
  lapTimeCounter = 0;
  selectors.mainTimerOutput.innerText = "00:00.00";
  lapCalculations.resetSlowestAndFastestLap();
  selectors.resetLapButton.classList.remove("set-lap-button");
  selectors.resetLapButton.classList.add("reset-lap-button");
  selectors.resetLapButton.firstElementChild.innerText = "Lap";
  selectors.resetLapButton.onclick = null;
};
