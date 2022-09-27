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
  // rAFCountingTime.js
  rAFCountingTime,
  // resetStopwatch.js
  resetStopwatch,
} from "./features/index.js";

// ---------------------------------- //

const startStopwatch = () => {
  loaders.loadFirstLapHTML();
  rAFCountingTime.reAssignCallback();
  styles.setStopButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    stopStopwatch();
  };
  styles.setLapButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    helpers.addNewLap(rAFCountingTime.counter);
    rAFCountingTime.resetTimeForNewLap();
    lapCalculations.calculateLapTime(rAFCountingTime.lapTimeCounter);
    rAFCountingTime.setLapTimeCounterTo0();
  };
};

const stopStopwatch = () => {
  rAFCountingTime.savePreviousCounterTime();
  cancelAnimationFrame(rAFCountingTime.requestAnimationFrame_ID);
  styles.setStartButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    startStopwatch();
  };
  styles.setResetButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    resetStopwatch();
  };
};

const startApplication = () => {
  loaders.loadDefaultLapTable();
  selectors.startStopButton.onclick = () => {
    startStopwatch();
  };
};

startApplication();
