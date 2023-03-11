let intervalId = null;
const refs = {};

document.addEventListener('DOMContentLoaded', () => {
  refs.btnStart = document.querySelector('[data-start]');
  refs.btnStop = document.querySelector('[data-stop]');

  if (refs.btnStart) {
    refs.btnStart.addEventListener('click', () => startChange(refs.btnStart, refs.btnStop));
  }

  if (refs.btnStop) {
    refs.btnStop.disabled = true;
    refs.btnStop.addEventListener('click', stopChange);
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChange() {
  intervalId = setInterval(changeBg, 1000);
}

function stopChange() {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function changeBg() {
  document.body.style.backgroundColor = getRandomHexColor();
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}
