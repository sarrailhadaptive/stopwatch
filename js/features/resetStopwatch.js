"use strict";

import {
  selectors,
  loaders,
  helpers,
  rAFCountingTime,
  lapCalculations,
  styles,
} from "./index.js";

export const resetStopwatch = () => {
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
