"use strict";
// GLOBAL SELECTORS
// HTML ELEMENTS
const lapScrollbarDiv = document.getElementsByClassName("lap-scrollbar-div")[0];
const mainTimerOutputs = {
  outputMinutes: document.getElementById("timer-minutes"),
  outputSeconds: document.getElementById("timer-seconds"),
  outputMilliSeconds: document.getElementById("timer-milli-seconds"),
};
const startStopButton = document.getElementsByClassName("start-stop-button")[0];
const resetLapButton = document.getElementsByClassName("reset-lap-button")[0];
const resetTimerButton = document.getElementsByClassName(
  "reset-lap-button-container"
)[0];
const startTimerButton = document.getElementsByClassName(
  "start-stop-button-container"
)[0];
const lapContainer = document.getElementsByClassName("lap-container");
const lapTableBodySelector = document.getElementsByTagName("table");
const lapNumberSelector = document.getElementsByClassName("lap-number");
const lapTimeSelector = document.getElementsByClassName("lap-time");
// -------------------------------------------------------------------------------- //
// FUNCTION VARIABLES
let mainTimerCounters = {
  minutes: 0,
  seconds: 0,
  milliSeconds: 0,
};
let lapTimerCounters = {
  minutes: 0,
  seconds: 0,
  milliSeconds: 0,
};
let defaultLapTableHTML = "";
let firstLapHTML = "";
let newLapHTML = "";
let newLapElementTable = "";
let newLapElementBody = "";
let lapNumber = 1;
let count = 0;
let interval;
let startCounter = 0;
let currentCounter = 0;
let previousLapTime = 0;
let currentLapTime = 0;
// let requestAnimationFrame_ID;
let isStartButtonSet = false;
let isLapButtonSet = false;
let isTheFastestLap = false;
let isTheSlowestLap = false;

// --------------------------------------------------------------------------------- //

// STARTER FUNCTIONS
const loadDefaultLapTable = () => {
  defaultLapTableHTML = `
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
      `;
  lapScrollbarDiv.insertAdjacentHTML("afterbegin", defaultLapTableHTML);
};

loadDefaultLapTable();

startStopButton.onclick = () => {
  clearInterval(interval);
  startCounter = new Date();
  startStopwatch();
};

// FUNCTIONS THAT WE WILL (MOST LIKELY) NEED IN THIS APP
// startStopwatch(); ---------------------------  DONE /
// startCountingTime(); ------------------------  DONE /
// loadFirstLap(); -----------------------------  DONE /
// stopStopwatchCounter(); ---------------------  DONE /
// setStartButtonStylesAndEvents(); ------------  DONE /
// setStopButtonStylesAndEvents(); -------------  DONE /
// setLapButtonStylesAndEvents(); --------------  DONE /
// setResetButtonStylesAndEvents(); ------------  DONE /
// addLapToTable(); ----------------------------  DONE /
// resetStopwatch(); ---------------------------  DONE /
// compareLapsSpeed();

const startStopwatch = () => {
  // 1: START COUNTING TIME
  interval = setInterval(startCountingTime, 10);
  // 2: CREATE FIRST LAP
  loadFirstLapHTML();
  // 4: CHANGE START BUTTON TO STOP BUTTON
  setStopButtonStylesAndEvents();
  // 5: CHANGE ONCLICK EVENT FROM START TO STOP
  startStopButton.onclick = () => {
    stopStopwatchCounter();
  };
  // 6: SET LAP BUTTON STYLE
  setLapButtonStylesAndEvents();
};

const stopStopwatchCounter = () => {
  // 1: STOP COUNTING TIME
  clearInterval(interval);
  // 2: CHANGE STOP BUTTON TO START BUTTON
  setStartButtonStylesAndEvents();
  // 3: CHANGE ONCLICK EVENT FROM START TO STOP
  startStopButton.onclick = () => {
    startStopwatch();
  };
  // 4: SET LAP BUTTON TO RESET BUTTON
  setResetButtonStylesAndEvents();
};

// BUTTON STYLES AND EVENTS
const setStartButtonStylesAndEvents = () => {
  startStopButton.classList.remove("set-stop-button");
  startStopButton.classList.add("start-stop-button");
  startTimerButton.setAttribute("style", "background-color: #516472e");
  startStopButton.firstElementChild.textContent = "Start";
  isStartButtonSet = !isStartButtonSet;
};

const setStopButtonStylesAndEvents = () => {
  startStopButton.classList.remove("start-stop-button");
  startStopButton.classList.add("set-stop-button");
  startTimerButton.setAttribute("style", "background-color: #50211F");
  startStopButton.firstElementChild.textContent = "Stop";
  isStartButtonSet = !isStartButtonSet;
};

const setResetButtonStylesAndEvents = () => {
  resetLapButton.firstElementChild.innerText = "Reset";
  resetLapButton.onclick = () => {
    resetStopwatch();
  };
};

const setLapButtonStylesAndEvents = () => {
  resetLapButton.firstElementChild.innerText = "Lap";
  resetLapButton.classList.remove("reset-lap-button");
  resetLapButton.classList.add("set-lap-button");

  resetLapButton.onclick = () => {
    addNewLap();
  };
};
// ------------------------------------------------------------ //

// startStopwatch HELPER FUNCTIONS
const startCountingTime = () => {
  console.log(
    `startCounter: ${+startCounter}  currentCounter: ${+currentCounter}  count: ${count}`
  );
  currentCounter = new Date();
  count = +currentCounter - +startCounter;
  mainTimerCounters.milliSeconds = count % 1000;
  mainTimerCounters.seconds = Math.floor(count / 1000) % 60;
  mainTimerCounters.minutes = Math.floor(count / 60000) % 60;
  if (mainTimerCounters.milliSeconds < 9) {
    mainTimerOutputs.outputMilliSeconds.innerText = `0${
      mainTimerCounters.milliSeconds / 10
    }`;
    lapTimeSelector[0].lastElementChild.innerText = `0${
      mainTimerCounters.milliSeconds / 10
    }`;
  }
  if (mainTimerCounters.milliSeconds > 9) {
    mainTimerOutputs.outputMilliSeconds.innerText =
      mainTimerCounters.milliSeconds.toString().slice(0, -1);
    lapTimeSelector[0].lastElementChild.innerText =
      mainTimerCounters.milliSeconds.toString().slice(0, -1);
  }
  if (mainTimerCounters.seconds < 9) {
    mainTimerOutputs.outputSeconds.innerText = `0${mainTimerCounters.seconds}`;
    lapTimeSelector[0].firstElementChild.nextElementSibling.innerText = `0${mainTimerCounters.seconds}`;
  }
  if (mainTimerCounters.seconds > 9 && mainTimerCounters.seconds < 59) {
    mainTimerOutputs.outputSeconds.innerText = mainTimerCounters.seconds;
    lapTimeSelector[0].firstElementChild.nextElementSibling.innerText =
      mainTimerCounters.seconds;
  }
  if (mainTimerCounters.minutes < 9) {
    mainTimerOutputs.outputMinutes.innerText = `0${mainTimerCounters.minutes}`;
    lapTimeSelector[0].firstElementChild.innerText = `0${mainTimerCounters.minutes}`;
  }
  if (mainTimerCounters.minutes > 9) {
    mainTimerCounters.outputMinutes.innerText = mainTimerCounters.minutes;
    lapTimeSelector[0].firstElementChild.innerText = mainTimerCounters.minutes;
  }
};

const loadFirstLapHTML = () => {
  if (firstLapHTML === "") {
    firstLapHTML = `
          <div id="lap-minutes">00</div>
          :
          <div id="lap-seconds">00</div>
          .
          <div id="lap-milli-seconds">00</div>
          `;
    lapTimeSelector[0].insertAdjacentHTML("beforeend", firstLapHTML);
    lapNumberSelector[0].insertAdjacentHTML("beforeend", "Lap 1");
  }
};

const addNewLap = () => {
  // 1: CREATE NEW LAP ELEMENT
  lapNumber++;
  newLapElementTable = document.createElement("table");
  newLapElementTable.classList.add("lap-container");
  newLapElementBody = document.createElement("tbody");
  // 2: SAVE PREVIOUS LAP TIMES
  previousLapTime = count;
  startCounter = new Date();
  newLapHTML = `
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
  `;
  // 3: PUSH PREVIOUS LAP DOWN THE TABLE
  lapScrollbarDiv.insertAdjacentElement("afterbegin", newLapElementTable);
  newLapElementTable.insertAdjacentElement("afterbegin", newLapElementBody);
  newLapElementBody.insertAdjacentHTML("afterbegin", newLapHTML);
  // 4: DELETE EMPTY TABLE ROWS
  [...lapContainer].forEach((el, i) => {
    if (i > 5 && el.innerText === "") el.remove();
  });
  // 4: SET LAP TO FASTEST OR SLOWEST
  calculateCurrentLapTime();
  if (previousLapTime > currentLapTime) console.log("fast");
};

const calculateCurrentLapTime = () => {
  currentLapTime =
    lapTimerCounters.milliSeconds +
    (Math.floor(lapTimerCounters.seconds / 1000) % 60) +
    (Math.floor(lapTimerCounters.minutes / 60000) % 60);
  console.log(previousLapTime);
  console.log(currentLapTime);
};

const resetStopwatch = () => {
  lapNumber = 1;
  startCounter = new Date();
  currentCounter = 0;
  clearInterval(interval);
  isStartButtonSet = false;
  isLapButtonSet = false;
  mainTimerOutputs.outputMilliSeconds.innerText = "00";
  mainTimerOutputs.outputSeconds.innerText = "00";
  mainTimerOutputs.outputMinutes.innerText = "00";
  [...lapContainer].forEach((el) => {
    el.innerText = "";
  });
  loadDefaultLapTable();
  count = 0;
  defaultLapTableHTML = "";
  firstLapHTML = "";
  newLapHTML = "";
  newLapElementTable = "";
  newLapElementBody = "";
  mainTimerCounters = {
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  };
  lapTimerCounters = {
    minutes: 0,
    seconds: 0,
    milliSeconds: 0,
  };
};

// ------------------------------------------------------------ //

// TRYING REQUESTANIMATIONFRAMECALL
// const requestAnimationFrameCallback = (callback) => {
//   count = callback;

//   mainTimerCounters.milliSeconds = count % 1000;
//   console.log(mainTimerCounters.milliSeconds);
//   mainTimerCounters.seconds = Math.floor(count / 1000) % 60;
//   mainTimerCounters.minutes = Math.floor(count / 60000) % 60;

//   if (mainTimerCounters.milliSeconds < 9) {
//     mainTimerOutputs.outputMilliSeconds.innerText = `0${mainTimerCounters.milliSeconds}`;
//   }
//   if (mainTimerCounters.milliSeconds > 9) {
//     mainTimerOutputs.outputMilliSeconds.innerText =
//       mainTimerCounters.milliSeconds.toString().slice(0, -1);
//   }
//   if (mainTimerCounters.seconds < 9) {
//     mainTimerOutputs.outputSeconds.innerText = `0${mainTimerCounters.seconds}`;
//   }
//   if (mainTimerCounters.seconds > 9 && mainTimerCounters.seconds < 59) {
//     mainTimerOutputs.outputSeconds.innerText = mainTimerCounters.seconds;
//   }
//   if (mainTimerCounters.minutes < 9) {
//     mainTimerOutputs.outputMinutes.innerText = `0${mainTimerCounters.minutes}`;
//   }
//   if (mainTimerCounters.minutes > 9) {
//     mainTimerCounters.outputMinutes.innerText = mainTimerCounters.minutes;
//   }
// };
// requestAnimationFrame_ID = requestAnimationFrame(requestAnimationFrameCallback);

// NO IDEA WHAT I WAS TRYING TO DO HERE
// const renderLapTimes = () => {
//   if (lapTimerCounters.milliSeconds < 9)
//     lapTimeSelector[1].lastElementChild.innerText = `0${lapTimerCounters.milliSeconds}`;
//   if (lapTimerCounters.milliSeconds > 9)
//     lapTimeSelector[1].lastElementChild.innerText =
//       lapTimerCounters.milliSeconds;
//   if (lapTimerCounters.seconds < 9)
//     lapTimeSelector[1].firstElementChild.nextSibling.innerText = `0${lapTimerCounters.seconds}`;
//   if (lapTimerCounters.seconds > 9)
//     lapTimeSelector[1].firstElementChild.nextSibling.innerText =
//       lapTimerCounters.seconds;
//   if (lapTimerCounters.minutes < 9)
//     lapTimeSelector[1].firstElementChild.innerText = `0${lapTimerCounters.minutes}`;
//   if (lapTimerCounters.minutes > 9)
//     lapTimeSelector[1].firstElementChild.innerText = lapTimerCounters.minutes;
// };
