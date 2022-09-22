"use strict";

import { lapTimeSelector, mainTimerOutputs } from "./index.js";
// --------------------------------------------------------------------------  //

export const addPadStartToTime = (time) => {
  return time.toString().padStart(2, "0");
};

export const displayTimeOnMainTimer = (mainTimerCounters) => {
  // 1: DISPLAY MILLISECONDS
  mainTimerOutputs.outputMilliSeconds.innerText = addPadStartToTime(
    mainTimerCounters.milliSeconds
  );
  // 2: DISPLAY SECONDS
  mainTimerOutputs.outputSeconds.innerText = addPadStartToTime(
    mainTimerCounters.seconds
  );
  // 3: DISPLAY MINUTES
  mainTimerOutputs.outputMinutes.innerText = addPadStartToTime(
    mainTimerCounters.minutes
  );
};

export const displayTimeOnFirstLapTimer = (mainTimerCounters) => {
  // 1: DISPLAY MILLISECONDS
  lapTimeSelector[0].lastElementChild.innerText = addPadStartToTime(
    mainTimerCounters.milliSeconds
  );
  // 2: DISPLAY SECONDS
  lapTimeSelector[0].firstElementChild.nextElementSibling.innerText =
    addPadStartToTime(mainTimerCounters.seconds);
  // 3: DISPLAY MINUTES
  lapTimeSelector[0].firstElementChild.innerText = addPadStartToTime(
    mainTimerCounters.minutes
  );
};

export const displayTimeOnMainTimerAndFirstLap = (mainTimerCounters) => {
  displayTimeOnMainTimer(mainTimerCounters);
  displayTimeOnFirstLapTimer(mainTimerCounters);
};
