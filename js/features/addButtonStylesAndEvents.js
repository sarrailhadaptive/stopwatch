"use strict";
import { selectors } from "./index.js";
import { isFirstLapOn } from "./insertHTMLAndElements.js";
// BUTTON STYLES AND EVENTS
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

export function onMouseOverResetLapButton() {
  selectors.resetLapButton.classList.add("on-hover-button");
  selectors.resetLapButtonContainer.classList.add("on-hover-button");
}

export function onMouseOutResetLapButton() {
  selectors.resetLapButton.classList.remove("on-hover-button");
  selectors.resetLapButtonContainer.classList.remove("on-hover-button");
}

export const setLapButtonStylesAndEvents = () => {
  selectors.resetLapButton.firstElementChild.innerText = "Lap";
  selectors.resetLapButton.classList.remove("reset-lap-button");
  selectors.resetLapButton.classList.add("set-lap-button");
  selectors.resetLapButton.addEventListener(
    "mouseover",
    onMouseOverResetLapButton
  );
  selectors.resetLapButton.addEventListener(
    "mouseout",
    onMouseOutResetLapButton
  );
};

export const onMouseOverStartStopButton =
  selectors.startStopButton.addEventListener("mouseover", () => {
    selectors.startStopButton.classList.add("on-hover-button");
    selectors.startTimerButton.classList.add("on-hover-button");
  });

export const onMouseOutStartStopButton =
  selectors.startStopButton.addEventListener("mouseout", () => {
    selectors.startStopButton.classList.remove("on-hover-button");
    selectors.startTimerButton.classList.remove("on-hover-button");
  });

export const removeEventListenersFromResetLapButton = () => {
  selectors.resetLapButton.removeEventListener(
    "mouseover",
    onMouseOverResetLapButton
  );
  selectors.resetLapButton.removeEventListener(
    "mouseover",
    onMouseOutResetLapButton
  );
};
