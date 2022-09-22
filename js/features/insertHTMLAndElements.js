"use strict";
let isFirstLapOn = false;
import { selectors } from "./index.js";
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
      00:00.00
    `
    );
    selectors.lapNumberSelector[0].insertAdjacentHTML("beforeend", "Lap 1");
  }
  isFirstLapOn = true;
};

export const isFirstLapOnToggler = () => {
  isFirstLapOn = false;
};
