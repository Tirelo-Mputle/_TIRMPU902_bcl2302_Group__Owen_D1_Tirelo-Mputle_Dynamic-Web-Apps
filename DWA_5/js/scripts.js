// @ts-check
const form = document.querySelector('[data-form]');
const result = document.querySelector('[data-result]');
const warning = document.querySelector('[data-warning]');
const body = document.querySelector('body');

/**
 * State of the app
 */
const state = {
  userDivedend: null,
  userDivider: null,
  correctResult: null,
};

/**
 * Check if the result of the division has a remainder
 */

const getFormData = (event) => {
  const entries = new FormData(event.target);
  let { dividend, divider } = Object.fromEntries(entries);
  return { dividend, divider };
};
const checkIfValidNumbers = (dividend, divider) => {
  if (dividend === '' || divider === '') {
    state.userDivedend = dividend;
    state.userDivider = divider;
  } else {
    state.userDivedend = parseFloat(dividend);
    state.userDivider = parseFloat(divider);
  }
  try {
    if (isNaN(dividend) || isNaN(divider)) {
      throw new Error('Something critical went wrong. Please reload the page');
    }
    state.correctResult = parseInt(state.userDivedend / state.userDivider);
  } catch (error) {
    body.innerHTML = 'Something critical went wrong. Please reload the page';
    console.log(error.stack);
  }
  return state.correctResult;
};
const checkIfPositiveNumber = () => {
  try {
    if (state.userDivedend < 0 || state.userDivider < 0) {
      state.correctResult = '';
      throw new Error(
        'Division not performed. Invalid number provided. Try again'
      );
    }
  } catch (error) {
    console.log(error.stack);
  }
};
const checkIfInputEmpty = () => {
  try {
    if (state.userDivedend === '' || state.userDivider === '') {
      state.correctResult = '';
      throw new Error(
        'Division not performed. Both values are required in inputs. Try again'
      );
    }
  } catch (error) {
    warning.innerText =
      'Division not performed. Both values are required in inputs. Try again.';
    console.log(error.stack);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { dividend, divider } = getFormData(event);
  checkIfValidNumbers(dividend, divider);
  checkIfPositiveNumber();
  checkIfInputEmpty();
  result.innerText = state.correctResult;
});
