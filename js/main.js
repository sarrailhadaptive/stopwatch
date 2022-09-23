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
} from "./features/index.js";

// -------------------------------------------------------------------------------- //

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
  rAFCountingTime.reAssignCallback();
  styles.setStopButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
  styles.setLapButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    helpers.addNewLap(rAFCountingTime.counter);
    rAFCountingTime.resetTimeForNewLap();
    lapCalculations.calculateLapTime(rAFCountingTime.lapTimeCounter);
    rAFCountingTime.setLapTimeCounterTo0();
  };
};

const stopStopwatchCounter = () => {
  rAFCountingTime.savePreviousCounterTime();
  cancelAnimationFrame(rAFCountingTime.requestAnimationFrame_ID);
  styles.setStartButtonStylesAndEvents();
  selectors.startStopButton.onclick = () => {
    startStopwatch();
  };
  styles.setResetButtonStylesAndEvents();
  selectors.resetLapButton.onclick = () => {
    resetStopwatch(helpers.lapNumber);
  };
};

const resetStopwatch = () => {
  [...selectors.lapContainer].forEach((el, i) => {
    if (i < helpers.lapNumber + 7) el.remove();
  });
  loaders.loadDefaultLapTable();
  loaders.isFirstLapOnToggler();
  helpers.setLapNumberTo1();
  rAFCountingTime.rAFResettersForResetStopwatch();
  lapCalculations.resetSlowestAndFastestLap();
  styles.removeEventListenersFromResetLapButton();
  selectors.resetSelectorsBackToInitialValues();
};
