"use strict";

// REFACTORING
// FUNCTIONAL PROGRAMMING - DECLARATIVE PROGRAMMING

//PseudoCode

// What do we need in order to make a StopWatch Application?
// Variables/States
// isStopwatchRunning
// startCountingTime
// stopCountingTime
// elapsedCountingTime
// lapTime
// minimumLapTime
// maximumLapTime
// lapNumber

// Main Functionality
// startStopwatch
// stopStopwatch
// startTimer
// stopTimer
// resetStopwatch
// addNewLap
// compareLapTimes

// Build Application

// Insert Default Table
// Step 1: Create one table row
// Step 2: Insert table row in DOM 6 times

// Add OnClick Event to Start Button
// Step 1: Select Start Button
// Step 2: Add OnClick Event and pass on startStopwatch Function

// Running Application

// Start Button --> startStopwatch
// Step 1: createFirstLap
// Step 2: startTimer
// Step 3: switchStartStopButtons (Could be one function for both Buttons)
// Step 4: enableLapButton

// createFirstLap
// Step 1: Insert Table row

// startTimer
// Step 1: Start Counting Time (Date Object, SetTimeout, RAF)
// Step 2: Format counter into Minutes, Seconds and CentiSeconds
// Step 3: Output time in Main Timer
// Step 4: Output time in First Lap Timer

// switchStartStopButtons (Could be one function for both Buttons)
// Step 1: Make Start Button Red
// Step 2: Change innerText from Start to Stop
// Step 3: Change OnClick Event from startStopwatch to stopStopwatch

// enableLapButton
// Step 1: Change Styles of Lap Button
// Step 2: Set OnClick Event to addNewLap

// Stop Button --> Stop Stopwatch
// Step 1: stopTimer
// Step 2: switchStartStopButtons (Could be one function for both Buttons)
// Step 3: switchLapResetButtons (Maybe no need to make a fn)

// stopTimer
// Step 1: Stop Counting Time
// Step 2: Save Elapsed Time

// switchStartStopButtons (Could be one function for both Buttons)
// Step 1: Make Stop Button Green
// Step 2: Change innerText from Stop to Start
// Step 3: Change OnClick Event from stopStopwatch to startStopwatch

// switchLapResetButtons
// Step 1: Change innerText from Lap to Reset
// Step 2: Change OnClick Event from addNewLap to resetStopwatch

// resetStopwatch
// Step 1: Set all variables/states back to initial values
// Step 2: Set all Styles back to initial values

// addNewLap
// Step 1: Save elapsedTime
// Step 2: Insert New Row
// Step 3: Render Lap Number
// Step 4: Render Lap Time
// Step 5: If Lap Number > 2 compareLapTimes

// compareLapTimes
// Step 1: If Current Lap > All Previous Lap then Add slowest-lap Class
// Step 2: Remove slowest-lap Class from previous Slowest Lap
// Step 3: If Current Lap < All Previous Lap then Add fastest-lap Class
// Step 4: Remove fastest-lap Class from previous Fastest Lap

import {
  selectors,
  loaders,
  styles,
  helpers,
  lapCalculations,
  rAFCountingTime,
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
    rAFCountingTime.resetLapTimeCounter();
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
