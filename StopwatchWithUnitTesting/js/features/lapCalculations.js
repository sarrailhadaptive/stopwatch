"use strict";

export const addNewLap = () => {
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
