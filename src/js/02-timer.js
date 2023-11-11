import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
      //instance.close;
      alert('Please choose a date in the future');
    }
  },
};

const selectdDate = flatpickr(timeSelector, options);


timeSelector.addEventListener('change', selectDateHandler);
function selectDateHandler() {
  console.log(selectdDate.selectedDates[0], 'date in handler');

  //   selectdDate.onClose(selecteddDate, () => {

  //   })
}

startButton.addEventListener('click', startTimeCountHandler);

function startTimeCountHandler() {
  timeIntervalID = setInterval(() => {
    currentDate = new Date();
    daysCounter.textContent = convertMs(
      selecteddDate.getTime() - currentDate.getTime()
    ).days;
    hoursCounter.textContent = convertMs(
      selecteddDate.getTime() - currentDate.getTime()
    ).hours;
    minutesCounter.textContent = convertMs(
      selecteddDate.getTime() - currentDate.getTime()
    ).minutes;
    secondsCounter.textContent = convertMs(
      selecteddDate.getTime() - currentDate.getTime()
    ).seconds;
    diff = selecteddDate.getTime() - currentDate.getTime();
    if (diff <= 0) {
      clearInterval(timeIntervalID);
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
