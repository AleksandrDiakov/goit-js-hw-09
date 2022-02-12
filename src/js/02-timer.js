import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let timerId = null;
let timeForTimer = new Date();

buttonRef.addEventListener('click', () => {
    timerId = setInterval(() => {upDateTimer();
    }, 1000);
});

const options = {
    enableTime: true,
    time_24hr: true,
    minDate: "today",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            buttonRef.setAttribute('disabled', true)
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        else {
            buttonRef.removeAttribute('disabled', true)
            timeForTimer = selectedDates[0] - options.defaultDate;
        }
            console.log(selectedDates[0]);
    },
};

flatpickr('#datetime-picker', options);


function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days/hours/minutes/seconds
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

 function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function upDateTimer() {
  if(timeForTimer < 0){
    clearInterval(timerId);
    return;
  }
  else {let converTime = convertMs(timeForTimer);
    daysRef.textContent = addLeadingZero(converTime.days);
    hoursRef.textContent = addLeadingZero(converTime.hours);
    minutesRef.textContent = addLeadingZero(converTime.minutes);
    secondsRef.textContent = addLeadingZero(converTime.seconds);
    timeForTimer -= 1000; }
};