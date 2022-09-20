// SELECTING/DECLARING NECESSARY ELEMENTS
const outputTimes = {
  outputMinutes: document.getElementById("minutes"),
  outputSeconds: document.getElementById("seconds"),
  outputMilliSeconds: document.getElementById("milliSeconds"),
};
const outputMinutes = document.getElementById("minutes");
const outputSeconds = document.getElementById("seconds");
const outputMilliSeconds = document.getElementById("milliSeconds");
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
let milliSeconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let togglerStartStop = false;
let togglerLapReset = false;
// ADD STATE CONTROL
// DONT USE THE DOM FOR STATE CONTROL
// SEPARATE LOGIC FROM DISPLAY
// FIND BETTER WAYS THAN ADDING UP MILLISECONDS

// STARTERS
startStopButton.addEventListener("click", startTimer);
const lapListStartingHTML = `
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
  lapMinutes = document.getElementsByClassName("lapMinutes")[0];
  lapSec = document.getElementsByClassName("lapSec")[0];
  lapMiliSec = document.getElementsByClassName("lapMiliSec")[0];
  lapMinutes.innerText = "00";
  lapSec.innerText = "00";
  lapMiliSec.innerText = "00";
}

function resetOutputinnerText() {
  outputMilliSeconds.innerText = "00";
  outputMinutes.innerText = "00";
  outputSeconds.innerText = "00";
}

function toggleLapResetButton() {
  togglerLapReset === false ? activateLapButton() : setResetButton();
}

// STARTING AND STOPPING TIMER
function startTimer() {
  clearInterval(interval);
  interval = setInterval(startCounting, 10);
  loadFirstLapHTML();
  switchStartStopEventListeners();
  setStartStopButtonToStop();
  toggleLapResetButton();
  lapEventListener();
}

function stopTimer() {
  clearInterval(interval);
  startStopButton.removeEventListener("click", stopTimer); // .ONCLICK
  startStopButton.addEventListener("click", startTimer);
  setStartStopButtonToStart();
  setResetButton();
}

function startCounting() {
  // NEEDS FIXING, STOP FIRST LAP / JAVASCRIPT IN BUILT SUPPORT
  milliSeconds++;
  if (milliSeconds <= 9) {
    outputMilliSeconds.innerText = `0${milliSeconds}`; // USE INNERTEXT / CHANGE THIS EVERYWHERE
    lapMiliSec.innerText = "0" + milliSeconds;
  }
  if (milliSeconds > 9) {
    outputMilliSeconds.innerText = milliSeconds;
    lapMiliSec.innerText = milliSeconds;
  }
  if (milliSeconds > 100) {
    seconds++;
    outputSeconds.innerText = "0" + seconds;
    lapSec.innerText = "0" + seconds;
    milliSeconds = 0;
    outputMilliSeconds.innerText = "0" + milliSeconds;
    lapMiliSec.innerText = "0" + milliSeconds;
  }
  if (seconds > 9) {
    outputSeconds.innerText = seconds;
    lapSec.innerText = seconds;
  }
  if (seconds > 59) {
    minutes++;
    outputMinutes.innerText = "0" + minutes;
    lapMinutes.innerText = "0" + minutes;
    seconds = 0;
    outputSeconds.innerText = "0" + seconds;
    lapSec.innerText = "0" + seconds;
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
  if (!togglerStartStop) {
    startStopButton.removeEventListener("click", startTimer);
    startStopButton.addEventListener("click", stopTimer);
  }
  if (togglerStartStop) {
    startCounting();
    setStartStopButtonToStart();
  }
}
// --------------------------- //

// TOGGLING LAP/RESET BUTTONS
function activateLapButton() {
  resetButtonBorder.setAttribute("style", "background-color: #3A3A3C");
  resetButtonBorder.setAttribute("style", "opacity: unset");
  resetLapButton.setAttribute("style", "background-color: #3A3A3C");
  resetButtonBorder.firstElementChild.setAttribute("style", "color: #FFFFFF");
  resetButtonBorder.firstElementChild.innerText = "Lap";
  togglerLapReset = !togglerLapReset;
  resetButtonBorder.removeEventListener("click", resetTimer);
  resetButtonBorder.addEventListener("click", renderLap);
}

function setResetButton() {
  resetButtonBorder.firstElementChild.innerText = "Reset";
  togglerLapReset = !togglerLapReset;
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
  lapMinutes = document.getElementsByClassName("lapMinutes")[lapNumber - 1];
  lapSec = document.getElementsByClassName("lapSec")[lapNumber - 1];
  lapMiliSec = document.getElementsByClassName("lapMiliSec")[lapNumber - 1];
  console.log(document.getElementsByClassName("listingLaps"));
  let html = "";
  let lapTime = [
    outputMilliSeconds.innerText,
    outputSeconds.innerText,
    outputMinutes.innerText,
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
    if (i > 5 && el.innerText === "") el.remove();
  });
}

// --------------------------- //

// RESET TIMER //
function resetTimer() {
  resetButtonBorder.removeEventListener("click", resetTimer);
  resetButtonBorder.removeEventListener("click", renderLap);
  lapNumber = 2;
  milliSeconds = 0;
  seconds = 0;
  minutes = 0;
  resetOutputinnerText();
  html = "";
  [...defaultLapList].forEach((el, i) => {
    i < 6 ? (el.innerText = "") : el.remove();
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
function compareLapSpeed() {
  // 1 : RESET NEXT LAP TIME TO 0
  // 2 : COMPARE PREVIOUS LAP AND ACTUAL LAP (ARRAY METHOD REDUCE??)
  // 3 : IF CURRENT LAP IS FASTER THAN ALL PREVIOUS LAPS THEN MAKE TEXT COLOR GREEN AND SAVE IN FASTESTLAP VARIABLE AND PRINT LAP IN VIEW
  // 4 : IF CURRENT LAP IS SLOWER THAN ALL PREVIOUS LAPS THEN MAKE TEXT COLOR RED AND SAVE IN SLOWESTLAP VARIABLE AND PRINT LAP IN VIEW
  // 5 : IF CURRENT LAP IS NOT FASTER OR SLOWER THAN ALL PREVIOUS LAPS THEN JUST PRINT LAP IN VIEW
}
// -------------------------- //
