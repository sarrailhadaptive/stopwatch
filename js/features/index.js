"use strict";
// HTMLSelectors.js
import * as selectors from "../selectors/HTMLSelectors.js";
export { selectors };
// insertHTMLAndElements.js
import {
  loadDefaultLapTable,
  loadFirstLapHTML,
  isFirstLapOnToggler,
} from "./insertHTMLAndElements.js";
export { loadDefaultLapTable, loadFirstLapHTML, isFirstLapOnToggler };

// addButtonStylesAndEvents.js
import {
  setStartButtonStylesAndEvents,
  setStopButtonStylesAndEvents,
  setResetButtonStylesAndEvents,
  setLapButtonStylesAndEvents,
} from "./addButtonStylesAndEvents.js";
export {
  setStartButtonStylesAndEvents,
  setStopButtonStylesAndEvents,
  setResetButtonStylesAndEvents,
  setLapButtonStylesAndEvents,
};

// startStopwatchHelpers.js
import {
  displayTimeOnMainTimer,
  addNewLap,
  lapNumber,
  setLapNumberTo1,
} from "./startStopwatchHelpers.js";
export { displayTimeOnMainTimer, addNewLap, lapNumber, setLapNumberTo1 };

// lapCalculations.js
import {
  calculateLapTime,
  resetSlowestAndFastestLap,
} from "./lapCalculations.js";
export { calculateLapTime, resetSlowestAndFastestLap };
