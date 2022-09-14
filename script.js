// SELECTING NECESSARY ELEMENTS
let outputMinutes = document.getElementById('minutes');
let outputSeconds = document.getElementById('seconds');
let outputMiliSeconds = document.getElementById('miliSeconds');
let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
let toggler = false;
const startStopBtn = document.getElementsByClassName('startBtnBorder')[0];
const resetLapBtn = document.getElementsByClassName('resetLapBtn')[0];
const startTimerBtn = document.getElementsByClassName('startTimerBtn')[0];
console.log(outputMinutes)

startStopBtn.addEventListener('click', startTimer);

function startTimer(){
    toggleBtn();
    clearInterval(interval);
    interval = setInterval(startCounting, 10);
}

function stopTimer(){
    clearInterval(interval);
    startStopBtn.removeEventListener('click', stopTimer);
    startStopBtn.addEventListener('click', startTimer);
    startStopBtn.setAttribute('id', 'default');
    startTimerBtn.setAttribute('style', 'background-color: #16472E');
    startStopBtn.firstElementChild.textContent = 'Start';
    toggler = !toggler;
}

function toggleBtn(){
    console.log('Toggle Class')
    // NEEDS FIXING TOGGLING DOESNT WORK, ONLY CHANGES ONCE
    // if(startStopBtn.hasAttribute('id', 'stopBtnBorder')) startStopBtn.setAttribute('id', 'default');
    // if(startStopBtn.hasAttribute('id', 'default')) startStopBtn.setAttribute('id', 'stopBtnBorder');
    // THIS WORKS BUT ITS INCOMPLETE
    // toggler === false ? startStopBtn.setAttribute('id', 'stopBtnBorder') : startStopBtn.setAttribute('id', 'default');
    if(toggler === false) {
        startStopBtn.removeEventListener('click', startTimer);
        startStopBtn.addEventListener('click', stopTimer);
        startStopBtn.setAttribute('id', 'stopBtnBorder');
        startTimerBtn.setAttribute('style', 'background-color: #50211F');
        startStopBtn.firstElementChild.textContent = 'Stop';
        toggler = !toggler;
        return this;
    };
    if(toggler === true) {
        startCounting();
        startStopBtn.setAttribute('id', 'default');
        startTimerBtn.setAttribute('style', 'background-color: #16472E');
        startStopBtn.firstElementChild.textContent = 'Start';
        toggler = !toggler;
        return this;
    };
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
    }
}

