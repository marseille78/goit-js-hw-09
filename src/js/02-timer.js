import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {};
let intervalID;

document.addEventListener('DOMContentLoaded', () => {
  const opts = {};
  refs.btnStart = document.querySelector('[data-start]');
  refs.dateField = document.querySelector('#datetime-picker');
  refs.blockValue = document.querySelector('.timer');
  refs.btnStart.disabled = true;

  refs.btnStart.addEventListener('click', () => startTimer(opts.time));
  refs.dateField.addEventListener('focus', () => {
    clearInterval(intervalID);
  });

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const currentTime = selectedDates[0].getTime();
      if (isCorrectDate(currentTime)) {
        refs.btnStart.disabled = false;
        opts.time = currentTime;
      } else {
        Report.failure('Error', 'Please choose a date in the future', 'Ok');
        drawValue({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        })
        refs.btnStart.disabled = true;
      }
    },
  };

  flatpickr('#datetime-picker', options);
});

function isCorrectDate(ms) {
  return ms > Date.now();
}

function startTimer(ms) {
  intervalID = setInterval(() => {
    if (calculateDelta(ms) > 0) {
      drawValue(convertMs(calculateDelta(ms)));
    } else {
      Report.failure('Game Over', 'Your time was finished', 'Ok');
      clearInterval(intervalID);
    }
  }, 1000);
  refs.btnStart.disabled = true;
}

function calculateDelta(ms) {
  return ms - Date.now();
}

function drawValue(obj) {
  Object.keys(obj).forEach(key => {
    refs
      .blockValue
      .querySelector(`[data-${key}]`)
      .innerHTML = addLeadingZero(obj[key]);
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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