const firstDelayField = document.querySelector('input[name="delay"]');
const stepOfDelayField = document.querySelector('input[name="step"]');
const numberOfDelaysField = document.querySelector('input[name="amount"]');
const createPromisesButton = document.querySelector('button[type="submit"]');
let firstDelay;
let stepOfDelay;
let numberOfDelays;

firstDelayField.addEventListener('blur', evt => {
  firstDelay = firstDelayField.value;
});

stepOfDelayField.addEventListener('blur', evt => {
  stepOfDelay = stepOfDelayField.value;
});

numberOfDelaysField.addEventListener('blur', evt => {
  numberOfDelays = numberOfDelaysField.value;
});

createPromisesButton.addEventListener('click', createPromiseClickHandler);
function createPromiseClickHandler() {
  for (let i = 1; i <= numberOfDelays; i++) {
    createPromise(i, firstDelay + stepOfDelay * (i - 1))
      .then(({ position, delay }) => {
        console.log(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Fulfill({position, delay});
  } else {
    Reject({position, delay});
  }
}
