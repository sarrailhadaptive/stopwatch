"use strict";

import { selectors } from "./index.js";
let lapCounter = 0;
export let lapNumber = 1;
// --------------------------------------------------------------------------  //

export const addPadStartToTime = (time) => {
  return time.toString().padStart(2, "0");
};

export const displayTimeOnMainTimer = (millis, seconds, minutes) => {
  return (selectors.mainTimerOutput.innerText = `${addPadStartToTime(
    minutes
  )}:${addPadStartToTime(seconds)}.${addPadStartToTime(millis)}`);
};

export const displayTimeOnFirstLapTimer = (lapTimerCounters) => {
  // 1: DISPLAY MILLISECONDS
  selectors.lapTimeSelector[0].lastElementChild.innerText = addPadStartToTime(
    lapTimerCounters.milliSeconds
  );
  // 2: DISPLAY SECONDS
  selectors.lapTimeSelector[0].firstElementChild.nextElementSibling.innerText =
    addPadStartToTime(lapTimerCounters.seconds);
  // 3: DISPLAY MINUTES
  selectors.lapTimeSelector[0].firstElementChild.innerText = addPadStartToTime(
    lapTimerCounters.minutes
  );
};

export const displayTimeOnMainTimerAndFirstLap = (
  mainTimerCounters,
  lapTimerCounters
) => {
  displayTimeOnMainTimer(mainTimerCounters);
  displayTimeOnFirstLapTimer(lapTimerCounters);
};

export const addNewLap = (counter) => {
  lapCounter = counter;
  lapNumber++;
  // 3: PUSH PREVIOUS LAP DOWN THE TABLE
  selectors.lapScrollbarDiv.insertAdjacentHTML(
    "afterbegin",
    ` <table class="lap-container">
        <tr>
          <td class="lap-number">Lap ${lapNumber}</td>
          <td class="lap-time">${addPadStartToTime(
            Math.floor(lapCounter / 6000) % 60
          )}:${addPadStartToTime(
      Math.floor(lapCounter / 100) % 60
    )}.${addPadStartToTime(lapCounter % 100)}</td>
        </tr>
      </table>`
  );
  // 5: DELETE EMPTY TABLE ROWS
  [...selectors.lapContainer].forEach((el, i) => {
    if (i > 5 && el.innerText === "") el.remove();
  });
};

export const setLapNumberTo1 = () => {
  lapNumber = 1;
};
