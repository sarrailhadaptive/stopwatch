"use strict";

export const lapScrollbarDiv =
  document.getElementsByClassName("lap-scrollbar-div")[0];
export const mainTimerOutput =
  document.getElementById("timer").firstElementChild;
export const startStopButton =
  document.getElementsByClassName("start-stop-button")[0];
export const resetLapButton =
  document.getElementsByClassName("reset-lap-button")[0];
export const resetLapButtonContainer = document.getElementsByClassName(
  "reset-lap-button-container"
)[0];
export const startTimerButton = document.getElementsByClassName(
  "start-stop-button-container"
)[0];
export const lapContainer = document.getElementsByClassName("lap-container");
export const lapNumberSelector = document.getElementsByClassName("lap-number");
export const lapTimeSelector = document.getElementsByClassName("lap-time");

export const resetSelectorsBackToInitialValues = () => {
  mainTimerOutput.innerText = "00:00.00";
  resetLapButton.classList.remove("set-lap-button");
  resetLapButton.classList.add("reset-lap-button");
  resetLapButton.firstElementChild.innerText = "Lap";
  resetLapButton.onclick = null;
};
