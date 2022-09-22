"use strict";
import { selectors } from "../index.js";

export const setStartButtonStylesAndEvents = () => {
  selectors.startStopButton.classList.remove("set-stop-button");
  selectors.startStopButton.classList.add("start-stop-button");
  selectors.startTimerButton.setAttribute(
    "style",
    "background-color: #516472e"
  );
  selectors.startStopButton.firstElementChild.textContent = "Start";
};

export const setStopButtonStylesAndEvents = () => {
  selectors.startStopButton.classList.remove("start-stop-button");
  selectors.startStopButton.classList.add("set-stop-button");
  selectors.startTimerButton.setAttribute("style", "background-color: #50211F");
  selectors.startStopButton.firstElementChild.textContent = "Stop";
};

export const setResetButtonStylesAndEvents = () => {
  selectors.resetLapButton.firstElementChild.innerText = "Reset";
};

export const setLapButtonStylesAndEvents = () => {
  selectors.resetLapButton.firstElementChild.innerText = "Lap";
  selectors.resetLapButton.classList.remove("reset-lap-button");
  selectors.resetLapButton.classList.add("set-lap-button");
};
