import { inputChangedHandler, formSubmitHandler } from './functions';

let input = document.getElementById('input-text');
input.addEventListener('keyup', inputChangedHandler);

const inputForm = document.getElementById('input-form');
inputForm.addEventListener('submit', formSubmitHandler);
