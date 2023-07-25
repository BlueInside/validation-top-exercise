const email = document.getElementById('mail');
const emailErrorDisplay = document.querySelector('#mail + span');

email.addEventListener('input', () => {
  if (!email.validity.valid) {
    showEmailValidationError();
  } else {
    hideErrorMessage(emailErrorDisplay);
  }
});

const password = document.getElementById('password');
const passwordErrorDisplay = document.querySelector('#password + span');

password.addEventListener('input', () => {
  if (!password.validity.valid) {
    showPasswordValidationError();
  } else {
    hideErrorMessage(passwordErrorDisplay);
  }
});

const form = document.getElementById('form');
const submitFormBtn = document.getElementById('submitForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
  } else {
    if (!password.validity.valid) {
      showPasswordValidationError();
    }
    if (!email.validity.valid) {
      showEmailValidationError();
    }
    checkPostCode();
    console.log('error');
  }
});

const postCode = document.getElementById('postCode');
postCode.addEventListener('input', checkPostCode);
function checkPostCode() {
  const constraints = {
    pl: [
      '^[0-9]{2}-?[0-9]{3}',
      'Poland post code must have exactly 5 digits : e.g. 27600 or 27-600',
    ],
    uk: [
      '^[a-zA-Z]{1,2}\\d[a-zA-Z\\d]?\\s?\\d[a-zA-Z]{2}$',
      'England post code must have 5 and 7 letters and numbers.: e.g : BA11 2PX',
    ],
    de: [
      `^\\d{5}$`,
      'Germany post code must have exactly 5 digits: e.g. D-12345 or 12345',
    ],
    nl: [
      '^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$',
      'Netherland post code must have exactly 4 digits, followed by 2 letters except SA, SD and SS',
    ],
    cz: [
      '[0-9]{3} ?[0-9]{2}',
      'Czech Republic post code must have 5 numbers : e.g 11111 or 111-11',
    ],
  };
  const country = document.getElementById('country').value;
  const postalCode = document.getElementById('postCode');
  const postCodeErrorDisplay = document.querySelector('#postCode + span');
  const constraint = new RegExp(constraints[country][0], '');
  console.log(constraint);

  if (constraint.test(postalCode.value)) {
    postCodeErrorDisplay.innerText = '';
    postCodeErrorDisplay.className = 'error';
    postCode.classList.remove('invalid');
    postCode.setCustomValidity('');
  } else {
    postCodeErrorDisplay.innerText = constraints[country][1];
    postCodeErrorDisplay.className = 'error active';
    postCode.classList.add('invalid');
    postCode.setCustomValidity('Invalid post code');
  }
  if (postalCode.validity.valueMissing) {
    postCodeErrorDisplay.innerText = 'This field cannot be empty';
    postCodeErrorDisplay.className = 'error active';
    postCode.setCustomValidity('Post code field cannot be empty');
  }
}

function showEmailValidationError() {
  if (email.validity.valueMissing) {
    emailErrorDisplay.textContent = 'Email cannot be empty';
  }
  if (email.validity.typeMismatch) {
    emailErrorDisplay.textContent =
      'Please enter email in correct format example: email@address.com';
  }
  if (email.validity.tooShort) {
    emailErrorDisplay.textContent = 'Minimum 6 characters';
  }
  if (email.validity.tooLong) {
    emailErrorDisplay.textContent = 'Your email is too long';
  }
  emailErrorDisplay.className = 'error active';
}

function showPasswordValidationError() {
  if (password.validity.valueMissing) {
    passwordErrorDisplay.textContent = 'Password field cannot be empty';
  }
  if (password.validity.patternMismatch) {
    passwordErrorDisplay.innerText = `Password must be: 
      - 8-15 characters long 
      - contains 1 capital letter and 1 number!
      `;
  }
  if (password.value.length > 15) {
    passwordErrorDisplay.textContent = 'Maximum 15 characters!';
  }
  passwordErrorDisplay.className = 'error active';
}

function hideErrorMessage(errorContainer) {
  errorContainer.textContent = '';
  errorContainer.className = 'error';
}
