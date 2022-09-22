"use strict";

export const lapScrollbarDiv =
  document.getElementsByClassName("lap-scrollbar-div")[0];
export const mainTimerOutputs = {
  outputMinutes: document.getElementById("timer-minutes"),
  outputSeconds: document.getElementById("timer-seconds"),
  outputMilliSeconds: document.getElementById("timer-milli-seconds"),
};
export const startStopButton =
  document.getElementsByClassName("start-stop-button")[0];
export const resetLapButton =
  document.getElementsByClassName("reset-lap-button")[0];
export const startTimerButton = document.getElementsByClassName(
  "start-stop-button-container"
)[0];
export const lapContainer = document.getElementsByClassName("lap-container");
export const lapNumberSelector = document.getElementsByClassName("lap-number");
export const lapTimeSelector = document.getElementsByClassName("lap-time");
