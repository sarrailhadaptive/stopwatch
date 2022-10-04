"use strict";

import { helpers } from "./index.js";

export let counter = 0;
export let lapTimeCounter = 0;
export let previousCounter = 0;
export let lapTimesResetter = 0;
export let lapTimes = {
  centis: 0,
  seconds: 0,
  minutes: 0,
};
export let times = {
  centis: 0,
  seconds: 0,
  minutes: 0,
};
export let requestAnimationFrame_ID = undefined;

// -----------------------------------------------------
// 


export const resetTimeForNewLap = () => {
  lapTimesResetter = counter;
};

export const resetLapTimeCounter = () => {
  lapTimeCounter = 0;
};

export const savePreviousCounterTime = () => {
  previousCounter = counter;
};

export const reAssignCallback = () => {
  requestAnimationFrame_ID = requestAnimationFrame(
    requestAnimationFrameCallback
  );
};

export const rAFResettersForResetStopwatch = () => {
  counter = 0;
  lapTimesResetter = 0;
  resetLapTimeCounter();
  requestAnimationFrame_ID = undefined;
};

const formatMainTimer = () => {
  counter += 1;
  times.centis = Math.floor(counter % 100);
  times.seconds = Math.floor(counter / 100) % 60;
  times.minutes = Math.floor(counter / 6000) % 60;
};

const formatLapTimer = () => {
  lapTimeCounter += 1;
  lapTimes.centis = Math.floor(lapTimeCounter % 100);
  lapTimes.seconds = Math.floor(lapTimeCounter / 100) % 60;
  lapTimes.minutes = Math.floor(lapTimeCounter / 6000) % 60;
};

export const requestAnimationFrameCallback = () => {
  formatMainTimer();
  formatLapTimer();
  helpers.displayTimeOnMainTimer(times.centis, times.seconds, times.minutes);
  helpers.displayTimeOnFirstLapTimer(
    lapTimes.centis,
    lapTimes.seconds,
    lapTimes.minutes
  );
  requestAnimationFrame_ID = requestAnimationFrame(
    requestAnimationFrameCallback
  );
};
