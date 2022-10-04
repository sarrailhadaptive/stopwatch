"use strict";

export let isFirstLapOn = false;
import { selectors } from "./index.js";

// -------------------------------------- //

// Use a loop, insertCell, insertRow
// separate display and bussines logic
export const loadDefaultLapTable = () => {
  selectors.lapScrollbarDiv.insertAdjacentHTML(
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
export const loadFirstLapHTML = () => {
  if (!isFirstLapOn) {
    selectors.lapTimeSelector[0].insertAdjacentHTML(
      "beforeend",
      `
      <td class="lap-time">00:00.00</td>
    `
    );
    selectors.lapNumberSelector[0].insertAdjacentHTML("beforeend", "Lap 1");
  }
  isFirstLapOn = true;
};

export const isFirstLapOnToggler = () => {
  isFirstLapOn = false;
};
