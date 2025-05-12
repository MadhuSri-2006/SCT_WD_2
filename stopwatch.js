let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");
const alarmSound = document.getElementById("alarmSound");

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    startStopButton.textContent = "Pause";
    isRunning = true;

    // Restart animation every time start
    display.style.animation = 'none';
    void display.offsetWidth; // Trigger reflow
    display.style.animation = 'fadeInScale 1s ease forwards';
  } else {
    clearInterval(timerInterval);
    startStopButton.textContent = "Start";
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00";
  startStopButton.textContent = "Start";
  isRunning = false;
  lapsList.innerHTML = '';
  alarmSound.play();
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(li);

    // Trigger the animation for lap fade-in
    li.style.animation = 'fadeInLap 0.5s ease forwards';
  }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);
