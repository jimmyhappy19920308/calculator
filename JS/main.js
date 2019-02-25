const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
let data = [];
let str = ``;
let expression = [];

for(let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputNumber, false);
}

function inputNumber(e) {
  const newNumber = e.target.innerHTML;

  str += `${newNumber}`;
  data.push(Number(str));
  result.innerHTML = data.pop();
}








