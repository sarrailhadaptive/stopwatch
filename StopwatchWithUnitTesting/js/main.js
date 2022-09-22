"use strict";

import { selectors, loaders, counters, styles } from "./index.js";

class StopWatch {
  // MAIN APP
  _interval;
  constructor() {
    loaders.loadDefaultLapTable(selectors.lapScrollbarDiv);
    selectors.startStopButton.onclick = () => {
      clearInterval(this._interval);
      this.startStopwatch();
    };
  }

  startStopwatch() {
    counters.startingTime();
    this._interval = setInterval(counters.startCountingTime, 10);
    loaders.loadFirstLapHTML();
    styles.setStopButtonStylesAndEvents();
    selectors.startStopButton.onclick = () => {
      this.stopStopwatch();
    };
  }

  stopStopwatch() {
    clearInterval(this._interval);
    counters.resumeMainTimerCounter();
    styles.setStartButtonStylesAndEvents();
    selectors.startStopButton.onclick = () => {
      this.startStopwatch();
    };
  }

  addNewLap() {}
}

const startApp = new StopWatch();

// FOR ONCLICK BTN START STOPWATCH
// loaders.loadFirstLapHTML(
//   selectors.lapTimeSelector,
//   selectors.lapNumberSelector
// );
