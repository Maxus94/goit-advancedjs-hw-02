import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const firstDelayField = document.querySelector('input[name="delay"]');
const stepOfDelayField = document.querySelector('input[name="step"]');
const numberOfDelaysField = document.querySelector('input[name="amount"]');

form.addEventListener('submit', createPromiseClickHandler);
function createPromiseClickHandler(evt) {
  evt.preventDefault();
  iziToast.destroy();  
  for (let i = 1; i <= Number(numberOfDelaysField.value); i++) {
    createPromise(
      i,
      Number(firstDelayField.value) + Number(stepOfDelayField.value) * (i - 1)
    )
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        iziToast.show({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          close: true,
          backgroundColor: 'green',
          messageColor: 'white',
          messageSize: 20,
          timeout: 0,
          position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        });
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        iziToast.show({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          close: true,
          backgroundColor: 'red',
          messageColor: 'white',
          messageSize: 20,
          timeout: 0,
          position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        });
      });
  }
  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
