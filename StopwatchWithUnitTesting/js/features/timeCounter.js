"use strict";

import { selectors } from "../index.js";

let currentCounter = 0;
let count = 0;
let lapCount = 0;
let previousCount = 0;
let startDateObjectCounter = 0;
let timeForClock = {
  minutes: 0,
  seconds: 0,
  centis: 0,
};
let timeForLaps = {
  minutes: 0,
  seconds: 0,
  centis: 0,
};

export const startingTime = () => {
  startDateObjectCounter = Date.now();
};

export const startCountingTime = () => {
  currentCounter = Date.now();
  count = currentCounter - +startDateObjectCounter + previousCount;
  lapCount = currentCounter - +startDateObjectCounter;
  timeForClock.centis = Math.floor((count % 1000) / 10);
  timeForClock.seconds = Math.floor(count / 1000) % 60;
  timeForClock.minutes = Math.floor(count / 60000) % 60;
  timeForLaps.centis = Math.floor((lapCount % 1000) / 10);
  timeForLaps.seconds = Math.floor(lapCount / 1000) % 60;
  timeForLaps.minutes = Math.floor(lapCount / 60000) % 60;
  displayTimeOnClock();
  console.log(count, lapCount);
};

export const resumeMainTimerCounter = () => {
  previousCount = count;
  console.log(count, previousCount);
};

export const addPadStartToTime = (time) => {
  return time.toString().padStart(2, "0");
};

export const displayTimeOnClock = () => {
  // TIME FOR MAIN CLOCK
  selectors.mainTimerOutputs.outputMilliSeconds.innerText = addPadStartToTime(
    timeForClock.centis
  );
  selectors.mainTimerOutputs.outputSeconds.innerText = addPadStartToTime(
    timeForClock.seconds
  );

  selectors.mainTimerOutputs.outputMinutes.innerText = addPadStartToTime(
    timeForClock.minutes
  );
  // TIME FOR FIRST LAP
  selectors.lapTimeSelector[0].lastElementChild.innerText = addPadStartToTime(
    timeForLaps.centis
  );
  selectors.lapTimeSelector[0].firstElementChild.nextElementSibling.innerText =
    addPadStartToTime(timeForLaps.seconds);
  selectors.lapTimeSelector[0].firstElementChild.innerText = addPadStartToTime(
    timeForLaps.minutes
  );
};
