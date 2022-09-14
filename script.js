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
        outputMiliSeconds.innerHTML = '0' + miliSeconds;
        miliSeconds = 0;
    };
}

