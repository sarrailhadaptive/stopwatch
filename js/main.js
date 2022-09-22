"use strict";
import {
  // HTMLSelectors.js
  lapScrollbarDiv,
  mainTimerOutputs,
  startStopButton,
  resetLapButton,
  startTimerButton,
  lapContainer,
  lapNumberSelector,
  lapTimeSelector,
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
  displayTimeOnMainTimerAndFirstLap,
  // lapCalculations.js
  calculateLapTime,
  resetSlowestAndFastestLap,
} from "./features/index.js";
// -------------------------------------------------------------------------------- //
// FUNCTION VARIABLES
let mainTimerCounters = {
  minutes: 0,
  seconds: 0,
  milliSeconds: 0,
};
let lapTimerCounters = {
  minutes: 0,
  seconds: 0,
  milliSeconds: 0,
};
let lapNumber = 1;
let count = 0;
let previousCount = 0;
let startDateObjectCounter = 0;
let currentCounter = 0;
let interval;
// --------------------------------------------------------------------------------- //
// STARTER FUNCTIONS
loadDefaultLapTable();

const startStopwatchMain = () => {
  startStopwatch();
  startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
};
startStopButton.onclick = () => {
  clearInterval(interval);
  startStopwatchMain();
};

const startStopwatch = () => {
  // 1: START COUNTING TIME
  startDateObjectCounter = new Date();
  interval = setInterval(startCountingTime, 10);
  // 2: CREATE FIRST LAP
  loadFirstLapHTML(lapTimeSelector, lapNumberSelector);
  // 3: CHANGE START BUTTON TO STOP BUTTON
  setStopButtonStylesAndEvents(startStopButton, startTimerButton);
  startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
  // 4: SET LAP BUTTON STYLE
  setLapButtonStylesAndEvents(resetLapButton);
  resetLapButton.onclick = () => {
    addNewLap();
    calculateLapTime(count, lapTimeSelector);
  };
};

const stopStopwatchCounter = () => {
  // 1: STOP COUNTING TIME
  clearInterval(interval);
  previousCount = count;
  // 2: CHANGE STOP BUTTON TO START BUTTON
  setStartButtonStylesAndEvents(startStopButton, startTimerButton);
  // 3: CHANGE ONCLICK EVENT FROM START TO STOP
  startStopButton.onclick = () => {
    startStopwatch();
  };
  // 4: SET LAP BUTTON TO RESET BUTTON
  setResetButtonStylesAndEvents(resetLapButton, lapNumberSelector);
  resetLapButton.onclick = () => {
    resetStopwatch();
  };
};

// // startStopwatch HELPER FUNCTIONS
const getFormattedTime = () => {
  currentCounter = new Date();
  count = +currentCounter - +startDateObjectCounter + previousCount;
  mainTimerCounters.milliSeconds = Math.floor((count % 1000) / 10);
  mainTimerCounters.seconds = Math.floor(count / 1000) % 60;
  mainTimerCounters.minutes = Math.floor(count / 60000) % 60;
};

const startCountingTime = () => {
  getFormattedTime();
  displayTimeOnMainTimerAndFirstLap(mainTimerCounters);
};
// ------------------------------------------------------------------- //

const addNewLap = () => {
  // 2: RESTART LAP TIME
  previousCount = 0;
  lapNumber++;
  startDateObjectCounter = new Date();
  // 3: PUSH PREVIOUS LAP DOWN THE TABLE
  lapScrollbarDiv.insertAdjacentHTML(
    "afterbegin",
    ` <table class="lap-container">
        <tr>
          <td class="lap-number">Lap ${lapNumber}</td>
          <td class="lap-time">
            <div id="lap-minutes">${(lapTimerCounters.minutes =
              lapTimeSelector[0].firstElementChild)}</div>
            :
            <div id="lap-seconds">${(lapTimerCounters.seconds =
              lapTimeSelector[0].firstElementChild.nextElementSibling)}</div>
            .
            <div id="lap-milli-seconds">${(lapTimerCounters.milliSeconds =
              lapTimeSelector[0].lastElementChild)}</div>
          </td>
        </tr>
      </table>`
  );
  // 5: DELETE EMPTY TABLE ROWS
  [...lapContainer].forEach((el, i) => {
    if (i > 5 && el.innerText === "") el.remove();
  });
};
// ---------------------------------------------------------------------  //
const resetStopwatch = () => {
  [...lapContainer].forEach((el, i) => {
    if (i < lapNumber + 7) el.remove();
  });
  loadDefaultLapTable();
  isFirstLapOnToggler();
  lapNumber = 1;
  startDateObjectCounter = null;
  currentCounter = 0;
  count = 0;
  previousCount = 0;
  clearInterval(interval);
  mainTimerOutputs.outputMilliSeconds.innerText = "00";
  mainTimerOutputs.outputSeconds.innerText = "00";
  mainTimerOutputs.outputMinutes.innerText = "00";
  mainTimerCounters = {
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  };
  lapTimerCounters = {
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  };
  resetSlowestAndFastestLap();
  resetLapButton.classList.remove("set-lap-button");
  resetLapButton.classList.add("reset-lap-button");
  resetLapButton.firstElementChild.innerText = "Lap";
  resetLapButton.onclick = null;
};
// ------------------------------------------------------------ //
