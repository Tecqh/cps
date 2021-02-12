const container = document.querySelector('.container');
const timeLeft = document.querySelector('.time-left');
const tapArea = document.querySelector('.tap-area');
const start = document.querySelector('.start');
const taps = document.querySelector('.taps');
const tapsPerSecond = document.querySelector('.taps-per-second');

const timeFive = document.querySelector('.time-5');
const timeFiveSpan = document.querySelector('.time-5 span');
const timeTen = document.querySelector('.time-10');
const timeTenSpan = document.querySelector('.time-10 span');
const timeFifteen = document.querySelector('.time-15');
const timeFifteenSpan = document.querySelector('.time-15 span');

tapArea.classList.add('hide');

let tapsValue = 0;
let timeValue = 5000;
let time = 0;

let flagFive = true;
let flagTen = true;
let flagFifteen = true;

timeFive.addEventListener('click', () => {
    timeValue = 5000;
    timeLeft.textContent = "5.00";
    flagFifteen = false;
    flagTen = false;
    if (flagFive === false) {
        flagFive = true;
        timeFifteen.classList.remove('timeBgcChange');
        timeFifteenSpan.classList.remove('timeSpanColorChange');
        timeTen.classList.remove('timeBgcChange');
        timeTenSpan.classList.remove('timeSpanColorChange');
    }
    if (flagFive) {
        timeFive.classList.add('timeBgcChange');
        timeFiveSpan.classList.add('timeSpanColorChange');
    }
})

timeTen.addEventListener('click', () => {
    timeValue = 10000;
    timeLeft.textContent = "10.00";
    flagFifteen = false;
    flagFive = false;
    if (flagTen === false) {
        flagTen = true;
        timeFifteen.classList.remove('timeBgcChange');
        timeFifteenSpan.classList.remove('timeSpanColorChange');
        timeFive.classList.remove('timeBgcChange');
        timeFiveSpan.classList.remove('timeSpanColorChange');
    }
    if (flagTen) {
        timeTen.classList.add('timeBgcChange');
        timeTenSpan.classList.add('timeSpanColorChange');
    }
})

timeFifteen.addEventListener('click', () => {
    timeValue = 15000;
    timeLeft.textContent = "15.00";
    flagFive = false;
    flagTen = false;
    if (flagFifteen === false) {
        flagFifteen = true;
        timeFive.classList.remove('timeBgcChange');
        timeFiveSpan.classList.remove('timeSpanColorChange');
        timeTen.classList.remove('timeBgcChange');
        timeTenSpan.classList.remove('timeSpanColorChange');
    }
    if (flagFifteen) {
        timeFifteen.classList.add('timeBgcChange');
        timeFifteenSpan.classList.add('timeSpanColorChange');
    }
})

const startTapping = (e) => {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    let ripples = document.createElement('span');
    ripples.className = 'animation';
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    tapArea.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 500);

    tapsValue++;
    taps.textContent = `taps: ${tapsValue}`;
}

const render = () => {
    start.classList.add('hide');
    tapArea.classList.add('show');
    setTimeout(() => {
        let perSecond = tapsValue / (timeValue / 1000);
        tapsPerSecond.textContent = `taps per second: ${perSecond.toFixed(2)}`;
        setTimeout(() => {
            start.classList.remove('hide');
            tapArea.classList.remove('show');
        }, 2000);
    }, timeValue);
}

const countDown = () => {
    const idInterval = setInterval(() => {
        time++
        timeLeft.textContent = (time / 100).toFixed(2);
        if ((time * 10) === timeValue) {
            window.clearInterval(idInterval);
            tapArea.removeEventListener("click", startTapping);
        }
    }, 10);
}
const Start = () => {
    taps.textContent = `taps: 0`;
    tapsPerSecond.textContent = ``;
    tapsValue = 0;
    time = 0;
    render();
    countDown();
    tapArea.addEventListener("click", startTapping);
    tapArea.addEventListener('mouseup', () => {
        tapArea.classList.remove('change-size');
    })
    tapArea.addEventListener('mousedown', () => {
        tapArea.classList.add('change-size');
    })
}

start.addEventListener('click', Start);