const body = document.querySelector('body');
const startButton = body.querySelector('button[data-start]');
const stopButton = body.querySelector('button[data-stop]');
let intervalID;

stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', startButtonClickHandler);
stopButton.addEventListener('click', stopButtonClickHandler);

function startButtonClickHandler() {
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  const timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  intervalID = timerID;
}

function stopButtonClickHandler() {
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', true);
    clearInterval(intervalID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
