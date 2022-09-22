"use strict";

// BUTTON STYLES AND EVENTS
export const setStartButtonStylesAndEvents = (
  startStopButton,
  startTimerButton
) => {
  startStopButton.classList.remove("set-stop-button");
  startStopButton.classList.add("start-stop-button");
  startTimerButton.setAttribute("style", "background-color: #516472e");
  startStopButton.firstElementChild.textContent = "Start";
};

export const setStopButtonStylesAndEvents = (
  startStopButton,
  startTimerButton
) => {
  startStopButton.classList.remove("start-stop-button");
  startStopButton.classList.add("set-stop-button");
  startTimerButton.setAttribute("style", "background-color: #50211F");
  startStopButton.firstElementChild.textContent = "Stop";
};

export const setResetButtonStylesAndEvents = (resetLapButton) => {
  resetLapButton.firstElementChild.innerText = "Reset";
};

export const setLapButtonStylesAndEvents = (resetLapButton) => {
  resetLapButton.firstElementChild.innerText = "Lap";
  resetLapButton.classList.remove("reset-lap-button");
  resetLapButton.classList.add("set-lap-button");
};
