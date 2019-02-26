const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
let tempNumber = '0';

for(let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputNumber, false);
}

function inputNumber(e) {
  tempNumber += e.target.innerHTML;
  result.innerHTML = parseInt(tempNumber, 10);
}


