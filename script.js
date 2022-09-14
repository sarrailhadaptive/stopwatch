// SELECTING NECESSARY ELEMENTS
let outputMinutes = document.getElementById('minutes');
let outputSeconds = document.getElementById('seconds');
let outputMiliSeconds = document.getElementById('miliSeconds');
let miliSeconds = 0;
let seconds = 0;
let minutes = 0;
let interval;
const startStopBtn = document.getElementById('startBtnBorder');
const resetLapBtn = document.getElementById('resetLapBtn');

startStopBtn.addEventListener('click', () => {
    console.log('TEST')
    clearInterval(interval);
    interval = setInterval(startCounting, 10);
});

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

