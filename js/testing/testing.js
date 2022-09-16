"use strict";
// SELECTING/DECLARING NECESSARY ELEMENTS
let outputMinutes = document.getElementById("minutes");
let outputSeconds = document.getElementById("seconds");
let outputMiliSeconds = document.getElementById("miliSeconds");
let lapNumber = 2; // THIS MUST BE 2 BECAUSE THE FIRST LAP IS RENDERED AUTOMATICALLY
const startStopButton = document.getElementsByClassName("startButtonBorder")[0];
const resetLapButton = document.getElementsByClassName("resetLapButton")[0];
const resetButtonBorder =
  document.getElementsByClassName("resetButtonBorder")[0];
const startTimerButton = document.getElementsByClassName("startTimerButton")[0];
const defaultLapList = document.getElementsByClassName("defaultLap");
const defaultLapContainer = document.getElementsByClassName("listingLaps")[0];
let lapMinutes;
let lapSec;
let lapMiliSec;
let firstLapHTML = "";
let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let togglerStartStop = false;
let togglerLapReset = false;

// STARTERS
startStopButton.addEventListener("click", startTimer);
let lapListStartingHTML = `
<li class="defaultLap"></li>
<li class="defaultLap"></li>
<li class="defaultLap"></li>
<li class="defaultLap"></li>
<li class="defaultLap"></li>
<li class="defaultLap"></li>`;
defaultLapContainer.insertAdjacentHTML("afterbegin", lapListStartingHTML);

// LOADERS / DRY FUNCTIONS
function loadFirstLapHTML() {
  if (firstLapHTML === "") {
    firstLapHTML = `
              <p class="lap">Lap 1</p><p class="lapTime"><span class="lapMinutes"></span>:<span class="lapSec"></span>.<span class="lapMiliSec"></span></p>
          `;
    defaultLapList[0].insertAdjacentHTML("afterbegin", firstLapHTML);
  }
  let lapTimeOfFirstDefaultLap =
    document.getElementsByClassName("defaultLap")[0].lastElementChild;
  lapMinutes = lapTimeOfFirstDefaultLap.firstElementChild;
  lapSec = lapTimeOfFirstDefaultLap.firstElementChild.nextElementSibling;
  lapMiliSec = lapTimeOfFirstDefaultLap.lastElementChild;
  //   lapMinutes = document.getElementsByClassName("lapMinutes")[0];
  //   lapSec = document.getElementsByClassName("lapSec")[0];
  //   lapMiliSec = document.getElementsByClassName("lapMiliSec")[0];
  lapMinutes.innerHTML = "00";
  lapSec.innerHTML = "00";
  lapMiliSec.innerHTML = "00";
}

function resetOutputInnerHTML() {
  outputMiliSeconds.innerHTML = "00";
  outputMinutes.innerHTML = "00";
  outputSeconds.innerHTML = "00";
}

function toggleLapResetButton() {
  togglerLapReset === false ? activateLapButton() : setResetButton();
}

// STARTING AND STOPPING TIMER
function startTimer() {
  loadFirstLapHTML();
  switchStartStopEventListeners();
  setStartStopButtonToStop();
  toggleLapResetButton();
  lapEventListener();
  clearInterval(interval);
  interval = setInterval(startCounting, 10);
}

function stopTimer() {
  clearInterval(interval);
  startStopButton.removeEventListener("click", stopTimer);
  startStopButton.addEventListener("click", startTimer);
  setStartStopButtonToStart();
  setResetButton();
}

function startCounting() {
  // NEEDS FIXING, STOP FIRST LAP
  lapTimeOfFirstDefaultLap = console.log(
    document.getElementsByClassName("defaultLap")[0].lastElementChild
  );
  miliSeconds++;
  if (miliSeconds <= 9) {
    outputMiliSeconds.innerHTML = "0" + miliSeconds;
    lapMiliSec.innerHTML = "0" + miliSeconds;
  }
  if (miliSeconds > 9) {
    outputMiliSeconds.innerHTML = miliSeconds;
    lapMiliSec.innerHTML = miliSeconds;
  }
  if (miliSeconds > 59) {
    seconds++;
    outputSeconds.innerHTML = "0" + seconds;
    lapSec.innerHTML = "0" + seconds;
    miliSeconds = 0;
    outputMiliSeconds.innerHTML = "0" + miliSeconds;
    lapMiliSec.innerHTML = "0" + miliSeconds;
  }
  if (seconds > 9) {
    outputSeconds.innerHTML = seconds;
    lapSec.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    outputMinutes.innerHTML = "0" + minutes;
    lapMinutes.innerHTML = "0" + minutes;
    seconds = 0;
    outputSeconds.innerHTML = "0" + seconds;
    lapSec.innerHTML = "0" + seconds;
  }
}
// ------------------------ //

// TOGGLING START/STOP BUTTONS
function setStartStopButtonToStart() {
  // CREATE A CLASS TO ASSIGN WHEN NEEDED INSTEAD OF PUSHING INLINE STYLE
  startStopButton.setAttribute("id", "default");
  startTimerButton.setAttribute("style", "background-color: #16472E");
  startStopButton.firstElementChild.textContent = "Start";
  togglerStartStop = !togglerStartStop;
}

function setStartStopButtonToStop() {
  // CREATE A CLASS TO ASSIGN WHEN NEEDED INSTEAD OF PUSHING INLINE STYLE
  startStopButton.setAttribute("id", "stopButtonBorder");
  startTimerButton.setAttribute("style", "background-color: #50211F");
  startStopButton.firstElementChild.textContent = "Stop";
  togglerStartStop = !togglerStartStop;
}

function switchStartStopEventListeners() {
  if (togglerStartStop === false) {
    startStopButton.removeEventListener("click", startTimer);
    startStopButton.addEventListener("click", stopTimer);
    // return this;
  }
  if (togglerStartStop === true) {
    startCounting();
    setStartStopButtonToStart();
    // return this;
  }
}
// --------------------------- //

// TOGGLING LAP/RESET BUTTONS
function activateLapButton() {
  resetButtonBorder.setAttribute("style", "background-color: #3A3A3C");
  resetButtonBorder.setAttribute("style", "opacity: unset");
  resetLapButton.setAttribute("style", "background-color: #3A3A3C");
  resetButtonBorder.firstElementChild.setAttribute("style", "color: #FFFFFF");
  resetButtonBorder.firstElementChild.innerHTML = "Lap";
  togglerLapReset = !togglerLapReset;
  resetButtonBorder.removeEventListener("click", resetTimer);
  resetButtonBorder.addEventListener("click", renderLap);
  console.log(togglerLapReset);
}

function setResetButton() {
  resetButtonBorder.firstElementChild.innerHTML = "Reset";
  togglerLapReset = !togglerLapReset;
  console.log(togglerLapReset);
  resetButtonBorder.removeEventListener("click", renderLap);
  resetButtonBorder.addEventListener("click", resetTimer);
}

// --------------------------- //

// RENDERING LAPS // IN PROGRESS
function lapEventListener() {
  resetButtonBorder.addEventListener("click", renderLap);
}

// NEEDS REFACTORING
function renderLap() {
  let html = "";
  let lapTime = [
    outputMiliSeconds.innerHTML,
    outputSeconds.innerHTML,
    outputMinutes.innerHTML,
  ];
  lapNumber++;
  const listItemScrollBar = document.createElement("li");
  listItemScrollBar.setAttribute("class", "defaultLap");
  defaultLapContainer.insertAdjacentElement("afterbegin", listItemScrollBar);
  html += `
    <p class="lap">Lap ${lapNumber - 1}</p><p class="lapTime">${lapTime[2]}:${
    lapTime[1]
  }.${lapTime[0]}</p>
    `;
  listItemScrollBar.insertAdjacentHTML("afterbegin", html);
  [...defaultLapList].forEach((el, i) => {
    if (i > 5 && el.innerHTML === "") el.remove();
  });
}

// --------------------------- //

// RESET TIMER //
function resetTimer() {
  resetButtonBorder.removeEventListener("click", resetTimer);
  resetButtonBorder.removeEventListener("click", renderLap);
  lapNumber = 2;
  miliSeconds = 0;
  seconds = 0;
  minutes = 0;
  resetOutputInnerHTML();
  html = "";
  [...defaultLapList].forEach((el, i) => {
    i < 6 ? (el.innerHTML = "") : el.remove();
  });
  firstLapHTML = "";
  togglerLapReset = false;
  togglerStartStop = false;
  resetButtonBorder.setAttribute("style", "background-color: #2C2C2E");
  resetButtonBorder.setAttribute("style", "opacity: 0.5");
  resetLapButton.setAttribute("style", "background-color: #2C2C2E");
  resetButtonBorder.firstElementChild.setAttribute("style", "color: #8D8D92");
}
// ---------------------------- //

// FASTEST AND SLOWEST LAP LOGIC //
// 1 : RESET NEXT LAP TIME TO 0
// 2 : COMPARE PREVIOUS LAP AND ACTUAL LAP (ARRAY METHOD REDUCE??)
// 3 : IF CURRENT LAP IS FASTER THAN ALL PREVIOUS LAPS THEN MAKE TEXT COLOR GREEN AND SAVE IN FASTESTLAP VARIABLE AND PRINT LAP IN VIEW
// 4 : IF CURRENT LAP IS SLOWER THAN ALL PREVIOUS LAPS THEN MAKE TEXT COLOR RED AND SAVE IN SLOWESTLAP VARIABLE AND PRINT LAP IN VIEW
// 5 : IF CURRENT LAP IS NOT FASTER OR SLOWER THAN ALL PREVIOUS LAPS THEN JUST PRINT LAP IN VIEW
// -------------------------- //
