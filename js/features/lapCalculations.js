"use strict";

let slowestLap = 0;
let fastestLap = Infinity;

export const calculateLapTime = (count, lapTimeSelector) => {
  if (slowestLap < count) {
    displayRedIfSlowest(lapTimeSelector);
    lapTimeSelector[1].parentElement.classList.add("slowest-lap");
    slowestLap = count;
  } else if (fastestLap > count) {
    displayGreenIfFastest(lapTimeSelector);
    lapTimeSelector[1].parentElement.classList.add("fastest-lap");
    fastestLap = count;
  }
};

export const resetSlowestAndFastestLap = () => {
  slowestLap = 0;
  fastestLap = Infinity;
};

export const displayRedIfSlowest = (lapTimeSelector) => {
  [...lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("slowest-lap");
  });
};

export const displayGreenIfFastest = (lapTimeSelector) => {
  [...lapTimeSelector].forEach((el) => {
    el.parentElement.classList.remove("fastest-lap");
  });
};

export const addNewLap = (
  previousCount,
  lapNumber,
  startDateObjectCounter,
  lapScrollbarDiv,
  lapTimerCounters,
  lapTimeSelector,
  lapContainer
) => {
  // 2: RESTART LAP TIME
  previousCount = 0;
  lapNumber++;
  startDateObjectCounter = new Date();
  // 3: PUSH PREVIOUS LAP DOWN THE TABLE
  lapScrollbarDiv.insertAdjacentHTML(
    "afterbegin",
    ` <table class="lap-container">
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
  // 5: DELETE EMPTY TABLE ROWS
  [...lapContainer].forEach((el, i) => {
    if (i > 5 && el.innerText === "") el.remove();
  });
};
