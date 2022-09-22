"use strict";
import { selectors } from "../index.js";

let isFirstLapOn = false;

export const loadDefaultLapTable = (lapScrollbarDiv) => {
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

export const loadFirstLapHTML = () => {
  if (!isFirstLapOn) {
    selectors.lapTimeSelector[0].insertAdjacentHTML(
      "beforeend",
      `
        <div id="lap-minutes">00</div>
        :
        <div id="lap-seconds">00</div>
        .
        <div id="lap-milli-seconds">00</div>
        `
    );
    selectors.lapNumberSelector[0].insertAdjacentHTML("beforeend", "Lap 1");
  }
  isFirstLapOn = true;
};
