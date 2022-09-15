// SELECTING NECESSARY ELEMENTS
let outputMinutes = document.getElementById('minutes');
let outputSeconds = document.getElementById('seconds');
let outputMiliSeconds = document.getElementById('miliSeconds');
let lapNumber = 2; 
const startStopBtn = document.getElementsByClassName('startBtnBorder')[0];
const resetLapBtn = document.getElementsByClassName('resetLapBtn')[0];
const resetBtnBorder = document.getElementsByClassName('resetBtnBorder')[0];
const startTimerBtn = document.getElementsByClassName('startTimerBtn')[0];
const defaultLapList = document.getElementsByClassName('defaultLap');
let lapMin;
let lapSec;
let lapMiliSec;
let firstLapHTML = '';

// DECLARING NECESSARY ELEMENTS
let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let togglerStartStop = false;
let togglerLapReset = false;


// STARTING EVENT LISTENERS
startStopBtn.addEventListener('click', startTimer);

// LOADERS
function loadFirstLapHTML(){
    lapMin = document.getElementsByClassName('lapMin')[0];
    lapSec = document.getElementsByClassName('lapSec')[0];
    lapMiliSec = document.getElementsByClassName('lapMiliSec')[0];
    return lapMin, lapSec, lapMiliSec;
}

// STARTING AND STOPPING TIMER
function startTimer(){
    if(firstLapHTML === '') {
        firstLapHTML = `
            <p class="lap">Lap 1</p><p class="lapTime"><span class="lapMin"></span>:<span class="lapSec"></span>.<span class="lapMiliSec"></span></p>
        `;
        defaultLapList[0].insertAdjacentHTML('afterbegin', firstLapHTML);
        loadFirstLapHTML();
    }
    lapMin.innerHTML = '00';
    lapSec.innerHTML = '00';
    lapMiliSec.innerHTML = '00';
    switchStartStopEventListeners();
    setStartStopBtnToStop();
    toggleLapResetBtn();
    lapEventListener();
    clearInterval(interval);
    interval = setInterval(startCounting, 10);
}

function stopTimer(){
    clearInterval(interval);
    startStopBtn.removeEventListener('click', stopTimer);
    startStopBtn.addEventListener('click', startTimer);
    setStartStopBtnToStart();
    setResetButton();
}

function startCounting() {
    loadFirstLapHTML();
    miliSeconds++;
    if(miliSeconds <= 9) {
        outputMiliSeconds.innerHTML = '0' + miliSeconds;
        lapMiliSec.innerHTML = '0' + miliSeconds;
    }
    if(miliSeconds > 9) {
        outputMiliSeconds.innerHTML = miliSeconds;
        lapMiliSec.innerHTML = miliSeconds;
    }    
    if(miliSeconds > 59) {
        seconds++;
        outputSeconds.innerHTML = '0' + seconds;
        lapSec.innerHTML = '0' + seconds;
        miliSeconds = 0;
        outputMiliSeconds.innerHTML = '0' + miliSeconds;
        lapMiliSec.innerHTML = '0' + miliSeconds;
    };
    if(seconds > 9) {
        outputSeconds.innerHTML = seconds;
        lapSec.innerHTML = seconds;
    }
    if(seconds > 59) {
        minutes++;
        outputMinutes.innerHTML = '0' + minutes;
        lapMin.innerHTML = '0' + minutes;
        seconds = 0;
        outputSeconds.innerHTML = '0' + seconds;
        lapSec.innerHTML = '0' + seconds;
    };
}
// ------------------------ //

// TOGGLING START/STOP BUTTONS
function setStartStopBtnToStart(){
    // CREATE A CLASS TO ASSIGN WHEN NEEDED INSTEAD OF PUSHING INLINE STYLE
    startStopBtn.setAttribute('id', 'default');
    startTimerBtn.setAttribute('style', 'background-color: #16472E');
    startStopBtn.firstElementChild.textContent = 'Start';
    togglerStartStop = !togglerStartStop;
}

function setStartStopBtnToStop(){
    // CREATE A CLASS TO ASSIGN WHEN NEEDED INSTEAD OF PUSHING INLINE STYLE
    startStopBtn.setAttribute('id', 'stopBtnBorder');
    startTimerBtn.setAttribute('style', 'background-color: #50211F');
    startStopBtn.firstElementChild.textContent = 'Stop';
    togglerStartStop = !togglerStartStop;
}

function switchStartStopEventListeners(){
    if(togglerStartStop === false) {
        startStopBtn.removeEventListener('click', startTimer);
        startStopBtn.addEventListener('click', stopTimer);
        // return this;
    };
    if(togglerStartStop === true) {
        startCounting();
        setStartStopBtnToStart();
        console.log(this)
        // return this;
    };
}
// --------------------------- //

// TOGGLING LAP/RESET BUTTONS
function activateLapBtn(){
    // CREATE A CLASS TO ASSIGN WHEN NEEDED INSTEAD OF PUSHING INLINE STYLE
    resetBtnBorder.setAttribute('style', 'background-color: #3A3A3C');
    resetLapBtn.setAttribute('style', 'background-color: #3A3A3C');
    resetBtnBorder.firstElementChild.setAttribute('style', 'color: #FFFFFF');
    resetBtnBorder.firstElementChild.innerHTML = 'Lap';
    togglerLapReset = !togglerLapReset;
}

function setResetButton(){
    resetBtnBorder.firstElementChild.innerHTML = 'Reset';
    togglerLapReset = !togglerLapReset;
    console.log(this) 
}

function toggleLapResetBtn(){
    if(togglerLapReset === false) {
        activateLapBtn();
        console.log(this)
        return this; // NEEDED TO WORK
    };
    if(togglerLapReset === true){
        setResetButton();
        console.log(this)
        // return this;
    };
}
// --------------------------- //

// RENDERING LAPS // IN PROGRESS
function lapEventListener(){
    resetBtnBorder.addEventListener('click', renderLap)
}

function renderLap(){
    let html = '';
    let lapTime = [outputMiliSeconds.innerHTML, outputSeconds.innerHTML, outputMinutes.innerHTML];
    console.log(lapTime);
    if(lapNumber < 6){
        html += `
        <p class="lap">Lap ${lapNumber}</p><p class="lapTime">${lapTime[2]}:${lapTime[1]}.${lapTime[0]}</p>
        `;
        defaultLapList[lapNumber - 1].insertAdjacentHTML('afterbegin', html);
        console.log(lapNumber)
        return lapNumber++;
    };
}
// --------------------------- //