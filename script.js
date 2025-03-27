let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;

// Get button elements
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

// Start Button Logic
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        timer = setInterval(updateTime, 10);
        isRunning = true;
        startBtn.innerText = 'Resume';
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

// Pause Button Logic
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        pauseBtn.innerText = 'Paused';
    }
});

// Reset Button Logic
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    startBtn.innerText = 'Start';
    pauseBtn.innerText = 'Pause';
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    document.getElementById('laps').innerHTML = '';
});

// Update Time Logic
function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Update Display Logic
function updateDisplay() {
    document.getElementById('milliseconds').innerText = formatTime(milliseconds / 10);
    document.getElementById('seconds').innerText = formatTime(seconds);
    document.getElementById('minutes').innerText = formatTime(minutes);
}

// Format Time to Display 00
function formatTime(value) {
    return value < 10 ? `0${Math.floor(value)}` : Math.floor(value);
}

// Record Lap Logic
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds / 10)}`;
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
    }
});
