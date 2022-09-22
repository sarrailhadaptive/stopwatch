"use strict";
import {
  // HTMLSelectors.js
  selectors,
  // insertHTMLAndElements.js
  loadDefaultLapTable,
  loadFirstLapHTML,
  isFirstLapOnToggler,
  // addButtonStylesAndEvents.js
  setStartButtonStylesAndEvents,
  setStopButtonStylesAndEvents,
  setResetButtonStylesAndEvents,
  setLapButtonStylesAndEvents,
  // startStopwatchHelpers.js
  displayTimeOnMainTimer,
  addNewLap,
  lapNumber,
  setLapNumberTo1,
  // lapCalculations.js
  calculateLapTime,
  resetSlowestAndFastestLap,
} from "./features/index.js";
// -------------------------------------------------------------------------------- //

// FUNCTION VARIABLES
let counter = 0;
let previousCounter = 0;
let times = {
  millis: 0,
  seconds: 0,
  minutes: 0,
};
let requestAnimationFrame_ID = undefined;
// --------------------------------------------------------------------------------- //

// STARTER FUNCTIONS
loadDefaultLapTable();

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
  // 1: START COUNTING TIME
  requestAnimationFrame_ID = requestAnimationFrame(
    requestAnimationFrameCallback
  );
  // 2: CREATE FIRST LAP
  loadFirstLapHTML();
  // 3: CHANGE START BUTTON TO STOP BUTTON
  setStopButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
  // 4: SET LAP BUTTON STYLE
  setLapButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    addNewLap(counter);
  };
};

const stopStopwatchCounter = () => {
  // 1: STOP COUNTING TIME
  previousCounter = counter;
  cancelAnimationFrame(requestAnimationFrame_ID);
  // 2: CHANGE STOP BUTTON TO START BUTTON
  setStartButtonStylesAndEvents();
  // 3: CHANGE ONCLICK EVENT FROM START TO STOP
  selectors.startStopButton.onclick = () => {
    startStopwatch();
  };
  // 4: SET LAP BUTTON TO RESET BUTTON
  setResetButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    resetStopwatch(lapNumber);
  };
};

// // startStopwatch HELPER FUNCTIONS
const requestAnimationFrameCallback = () => {
  counter++;
  console.log(`Counter: ${counter}`);

  times.millis = counter % 100;
  times.seconds = Math.floor(counter / 100) % 60;
  times.minutes = Math.floor(counter / 6000) % 60;

  displayTimeOnMainTimer(times.millis, times.seconds, times.minutes);
  requestAnimationFrame_ID = requestAnimationFrame(
    requestAnimationFrameCallback
  );
};
// ------------------------------------------------------------------- //

// ---------------------------------------------------------------------  //
const resetStopwatch = () => {
  [...selectors.lapContainer].forEach((el, i) => {
    if (i < lapNumber + 7) el.remove();
  });
  loadDefaultLapTable();
  isFirstLapOnToggler();
  setLapNumberTo1();
  counter = 0;
  selectors.mainTimerOutput.innerText = "00:00.00";
  resetSlowestAndFastestLap();
  selectors.resetLapButton.classList.remove("set-lap-button");
  selectors.resetLapButton.classList.add("reset-lap-button");
  selectors.resetLapButton.firstElementChild.innerText = "Lap";
  selectors.resetLapButton.onclick = null;
};
// ------------------------------------------------------------ //
