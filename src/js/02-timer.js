import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timeSelector = document.querySelector('input[id="datetime-picker"]');
const startButton = document.querySelector('button[data-start]');
const daysCounter = document.querySelector('span[data-days]');
const hoursCounter = document.querySelector('span[data-hours]');
const minutesCounter = document.querySelector('span[data-minutes]');
const secondsCounter = document.querySelector('span[data-seconds]');

let selecteddDate;
let diff;
let timeIntervalID;
let currentDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selecteddDate = selectdDate.selectedDates[0];
    if (currentDate.getTime() > selecteddDate.getTime()) {
      //alert('Please choose a date in the future');
      iziToast.show({
        //title: 'Error',
        message: '❌ Please choose a date in the future',
        close: false,
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: 20,
        timeout: 0,
        position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      });
      startButton.setAttribute('disabled', true);
    } else {
      startButton.removeAttribute('disabled');
    }
  },
};

const selectdDate = flatpickr(timeSelector, options);

startButton.setAttribute('disabled', true);

timeSelector.addEventListener('change', selectDateHandler);
function selectDateHandler() {
  iziToast.destroy();
  
}

startButton.addEventListener('click', startTimeCountHandler);

function startTimeCountHandler() {
  if (new Date() - selecteddDate > 1000) {
    iziToast.show({
      //title: 'Error',
      message: '❌ Please choose a date in the future',
      close: false,
      backgroundColor: 'red',
      messageColor: 'white',
      messageSize: 20,
      timeout: 0,
      position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    });
    startButton.setAttribute('disabled', true);
    return;
  }
  startButton.setAttribute('disabled', true);
  timeSelector.setAttribute('disabled', true);
  timeIntervalID = setInterval(() => {
    currentDate = new Date();
    const daysLeft = convertMs(
      selecteddDate.getTime() - currentDate.getTime()
    ).days;
    if (daysLeft > 9) {
      daysCounter.textContent = daysLeft;
    } else {
      daysCounter.textContent = addLeadingZero(daysLeft);
    }
    hoursCounter.textContent = addLeadingZero(
      convertMs(selecteddDate.getTime() - currentDate.getTime()).hours
    );
    minutesCounter.textContent = addLeadingZero(
      convertMs(selecteddDate.getTime() - currentDate.getTime()).minutes
    );
    secondsCounter.textContent = addLeadingZero(
      convertMs(selecteddDate.getTime() - currentDate.getTime()).seconds
    );
    diff = selecteddDate.getTime() - currentDate.getTime();
    if (diff < 1000) {
      clearInterval(timeIntervalID);
      //startButton.removeAttribute('disabled');
      timeSelector.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
