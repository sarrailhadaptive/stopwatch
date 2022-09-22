"use strict";
let isFirstLapOn = false;
import { lapScrollbarDiv } from "./index.js";
export const loadDefaultLapTable = () => {
  lapScrollbarDiv.insertAdjacentHTML(
    "afterbegin",
    `
  <table class="lap-container">
    <tr>
      <td class="lap-number"></td>
      <td class="lap-time"></td>
    </tr>
  </table>
  <table class="lap-container">
    <tr>
      <td class="lap-number"></td>
      <td class="lap-time"></td>
    </tr>
  </table>
  <table class="lap-container">
    <tr>
      <td class="lap-number"></td>
      <td class="lap-time"></td>
    </tr>
  </table>
  <table class="lap-container">
    <tr>
      <td class="lap-number"></td>
      <td class="lap-time"></td>
    </tr>
  </table>
  <table class="lap-container">
    <tr>
      <td class="lap-number"></td>
      <td class="lap-time"></td>
    </tr>
  </table>
  <table class="lap-container">
    <tr>
      <td class="lap-number"></td>
      <td class="lap-time"></td>
    </tr>
  </table>
  `
  );
};
export const loadFirstLapHTML = (lapTimeSelector, lapNumberSelector) => {
  if (!isFirstLapOn) {
    lapTimeSelector[0].insertAdjacentHTML(
      "beforeend",
      `
    <div id="lap-minutes">00</div>
    :
    <div id="lap-seconds">00</div>
    .
    <div id="lap-milli-seconds">00</div>
    `
    );
    lapNumberSelector[0].insertAdjacentHTML("beforeend", "Lap 1");
  }
  isFirstLapOn = true;
};

export const isFirstLapOnToggler = () => {
  isFirstLapOn = false;
};

export const addNewLap = () => {
  // 1: CREATE NEW LAP ELEMENT
  previousCount = 0;
  lapNumber++;
  // 2: SAVE PREVIOUS LAP TIMES
  startDateObjectCounter = new Date();
  // 3: PUSH PREVIOUS LAP DOWN THE TABLE
  lapScrollbarDiv.insertAdjacentHTML(
    "afterbegin",
    `
  <table class="lap-container">
    <tr>
      <td class="lap-number">Lap ${lapNumber}</td>
      <td class="lap-time">  
        <div id="lap-minutes">${(lapTimerCounters.minutes =
          lapTimeSelector[0].firstElementChild)}</div>
        :
        <div id="lap-seconds">${(lapTimerCounters.seconds =
          lapTimeSelector[0].firstElementChild.nextElementSibling)}</div>
        .
        <div id="lap-milli-seconds">${(lapTimerCounters.milliSeconds =
          lapTimeSelector[0].lastElementChild)}</div>
      </td>
    </tr>
  </table>`
  );
  // 4: PUSH LAP INTO TOTALLAPS ARRAY
  totalLaps.unshift(count);
  // 5: DELETE EMPTY TABLE ROWS
  [...lapContainer].forEach((el, i) => {
    if (i > 5 && el.innerText === "") el.remove();
  });
};
