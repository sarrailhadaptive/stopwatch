// SELECTING NECESSARY ELEMENTS
let outputMinutes = document.getElementById('minutes');
let outputSeconds = document.getElementById('seconds');
let outputMiliSeconds = document.getElementById('miliSeconds');
let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let togglerStartStop = false;
let togglerLapReset = false;
const startStopBtn = document.getElementsByClassName('startBtnBorder')[0];
const resetLapBtn = document.getElementsByClassName('resetLapBtn')[0];
const resetBtnBorder = document.getElementsByClassName('resetBtnBorder')[0];
const startTimerBtn = document.getElementsByClassName('startTimerBtn')[0];

// STARTING EVENT LISTENERS
startStopBtn.addEventListener('click', startTimer);

// STARTING AND STOPPING TIMER
function startTimer(){
    toggleStartStopBtn();
    setStartStopBtnToStop();
    toggleLapResetBtn();
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
    miliSeconds++;
    if(miliSeconds <= 9) outputMiliSeconds.innerHTML = '0' + miliSeconds;
    if(miliSeconds > 9) outputMiliSeconds.innerHTML = miliSeconds;
    if(miliSeconds > 59) {
        seconds++;
        outputSeconds.innerHTML = '0' + seconds;
        miliSeconds = 0;
        outputMiliSeconds.innerHTML = '0' + miliSeconds;
    };
    if(seconds > 9) outputSeconds.innerHTML = seconds;
    if(seconds > 59) {
        minutes++;
        outputMinutes.innerHTML = '0' + minutes;
        seconds = 0;
        outputSeconds.innerHTML = '0' + seconds;
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

function toggleStartStopBtn(){
    if(togglerStartStop === false) {
        startStopBtn.removeEventListener('click', startTimer);
        startStopBtn.addEventListener('click', stopTimer);
        return this;
    };
    if(togglerStartStop === true) {
        startCounting();
        setStartStopBtnToStart();
        return this;
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
}

function toggleLapResetBtn(){
    if(togglerLapReset === false) {
        activateLapBtn();
        return this;
    };
    if(togglerLapReset === true){
        setResetButton();
        return this;
    }
}
// --------------------------- //