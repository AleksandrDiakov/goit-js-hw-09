import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', onFormInput)

let formData = {};
let delay = 0;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
      }
        else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
  })
};

function onFormInput(evt) {
  formData[evt.target.name] = Number(evt.target.value);
  return formData;
};

function onFormSubmit(evt) {
  evt.preventDefault();

  delay = formData.delay;
  for (let position = 1; position <= formData.amount; position++) {
    delay += formData.step;
    
    createPromise(position, delay)
      .then(value => Notiflix.Notify.success(value))
      .catch(error => Notiflix.Notify.failure(error));
  }
};