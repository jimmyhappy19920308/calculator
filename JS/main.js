const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('.decimal');
const result = document.querySelector('.result');

let data = [];
let str = ``;
let expression = [];

for(let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputNumber, false);
}

decimal.addEventListener('click', inputNumber, false);

function inputNumber(e) {
  const newNumber = e.target.innerHTML;

  if(str.length === 0) {
    str += "0";
  }

  str += `${newNumber}`;
  data.push(Number(str));
  result.innerHTML = data.pop();
}








