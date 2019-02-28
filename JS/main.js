const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('.decimal');
const result = document.querySelector('.result');
let tempNumber = '0';

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputValue, false);
}

decimal.addEventListener('click', inputValue, false);

function inputValue(e) {
  const value = e.target.innerHTML;

  tempNumber += value;

  if (tempNumber === '0') {
    result.innerHTML = '0';
  } else if (tempNumber[0] === '0' && tempNumber[1] !== '.' && tempNumber.length >= 1) {
    tempNumber = tempNumber[1];
    result.innerHTML = tempNumber;
  } else {
    result.innerHTML = tempNumber;
  }


}