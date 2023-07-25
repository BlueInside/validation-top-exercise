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
});

submitFormBtn.addEventListener('click', () => {
  if (form.checkValidity()) {
    // DO SOMETHING
  } else if (!form.checkValidity()) {
    // DO SOMETHING
  }
});

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
