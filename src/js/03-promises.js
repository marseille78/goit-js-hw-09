import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {};
const opts = {};

document.addEventListener('DOMContentLoaded', () => {
  refs.form = document.querySelector('.form');

  refs.form.addEventListener('submit', handleSubmit);
});

function handleSubmit(e) {
  e.preventDefault();
  gatherData(refs.form);
  let delay = 0;

  delay += opts.delay;

  setTimeout(() => {
    for (let i = 1; i <= opts.amount; i++) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      delay += opts.step;
    }
  }, delay);

  refs.form.reset();
}

function gatherData(form) {
  new FormData(form).forEach((value, key) => {
    opts[key] = +value;
  });
}

function createPromise(position, delay) {
  const data = {position, delay};
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(data);
      }

      reject(data);
    }, delay);
  });
}
