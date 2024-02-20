const start = document.querySelector(".start");
const stop = document.querySelector(".pause");
const reset = document.querySelector(".reset");
const lap = document.querySelector(".lap");

window.onload = function () {
  document.querySelector(".pause").style.display = "none";
  document.querySelector(".reset").style.display = "none";
  document.querySelector(".lap").style.display = "none";
};

start.addEventListener("click", function () {
  start.style.display = "none";
  reset.style.display = "none";
  stop.style.display = "inline-block";
  lap.style.display = "inline-block";
});

stop.addEventListener("click", function () {
  start.style.display = "inline-block";
  reset.style.display = "inline-block";
  stop.style.display = "none";
  lap.style.display = "none";
});

reset.addEventListener("click", function () {
  start.style.display = "inline-block";
  reset.style.display = "none";
  stop.style.display = "none";
  lap.style.display = "none";
});

function createStopwatch() {
  let startTime,
    endTime,
    running,
    duration = 0;
  let intervalId;
  let laps = [];

  function start() {
    if (running) return;
    running = true;
    startTime = new Date() - duration;
    intervalId = setInterval(updateTime, 1);
  }

  function stop() {
    if (!running) return;
    running = false;
    clearInterval(intervalId);
    endTime = new Date();
    duration = endTime - startTime;
  }

  function reset() {
    running = false;
    clearInterval(intervalId);
    startTime = null;
    endTime = null;
    duration = 0;
    laps = [];
    document.querySelector(".displayLap").innerHTML = "";
    document.querySelector(".Time").textContent = "00:00:00";
  }

  function lap() {
    if (!running) return;
    laps.push(duration);
    const lapTime = `${laps.length}. ${formatTime(duration)}`;
    const lapElement = document.createElement("p");
    lapElement.innerHTML = lapTime;
    document.querySelector(".displayLap").appendChild(lapElement);
  }

  function updateTime() {
    const time = new Date() - startTime;
    duration = time;
    document.querySelector(".Time").innerHTML = formatTime(time);
  }

  function formatTime(time) {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    return `<span class="minutes"> ${minutes
      .toString()
      .padStart(2, "0")}</span>:<span class="seconds"> ${seconds
      .toString()
      .padStart(2, "0")}</span>:<span class="milliseconds">${milliseconds
      .toString()
      .padStart(3, "0")}</span>`;
  }

  return {
    start,
    stop,
    reset,
    lap,
  };
}

const stopwatch = createStopwatch();

document.querySelector(".start").addEventListener("click", stopwatch.start);
document.querySelector(".pause").addEventListener("click", stopwatch.stop);
document.querySelector(".reset").addEventListener("click", stopwatch.reset);
document.querySelector(".lap").addEventListener("click", stopwatch.lap);
