const body = document.querySelector('body')
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let IntervalId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function onStartBtn(evt) {
    startBtn.disabled = true;
    stopBtn.disabled = false;    
    IntervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
}

function onStopBtn(evt) {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(IntervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}