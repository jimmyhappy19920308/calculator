const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('.decimal');
const result = document.querySelector('.result');
let tempNumber = '0';

for(let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputValue, false);
}

decimal.addEventListener('click', inputValue, false);

function inputValue(e) {
  tempNumber += e.target.innerHTML;
  result.innerHTML = tempNumber.slice(1);
}