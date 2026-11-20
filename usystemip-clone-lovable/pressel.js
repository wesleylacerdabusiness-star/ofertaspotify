'use strict';

const verify = document.getElementById('verify');
const icon = document.getElementById('check-icon');
const status = document.getElementById('verify-status');
const challenge = document.getElementById('challenge');
const form = document.getElementById('challenge-form');
const answer = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const confirm = form.querySelector('button');
let firstStepComplete = false;

verify.addEventListener('click', () => {
  if (firstStepComplete) {
    challenge.showModal();
    answer.focus();
    return;
  }
  verify.disabled = true;
  icon.className = 'spinner';
  status.hidden = false;
  status.textContent = 'Checking…';
  setTimeout(() => {
    firstStepComplete = true;
    icon.className = 'tick';
    icon.textContent = '✓';
    status.textContent = '✓ First verification completed';
    verify.disabled = false;
    verify.setAttribute('aria-label', 'Open final verification');
    setTimeout(() => {
      challenge.showModal();
      answer.focus();
    }, 600);
  }, 2000);
});

answer.addEventListener('input', () => {
  answer.removeAttribute('aria-invalid');
  feedback.hidden = true;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (confirm.disabled) return;
  feedback.hidden = false;
  if (answer.value.trim() !== '2') {
    answer.setAttribute('aria-invalid', 'true');
    feedback.className = 'error';
    feedback.textContent = 'Incorrect answer. Please try again.';
    answer.value = '';
    answer.focus();
    return;
  }
  feedback.className = 'success';
  feedback.textContent = 'Correct! Redirecting…';
  confirm.textContent = 'Verified ✓';
  confirm.disabled = true;
  answer.readOnly = true;
  setTimeout(() => {
    window.location.assign('/inicio/' + window.location.search);
  }, 800);
});
