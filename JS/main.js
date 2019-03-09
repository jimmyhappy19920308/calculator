const numbers = document.querySelectorAll('.number'); // 選取數字按鈕元素群組
const decimal = document.querySelector('.decimal'); // 選取小數點按鈕元素
const operators = document.querySelectorAll('.operator'); // 選取運算子按鈕元素群組
const expression = document.querySelector('.expression'); // 選取表達式顯示區塊元素
const result = document.querySelector('.result'); // 選取計算結果顯示區塊元素
let tempNumber = '0'; // 儲存暫存數字的變數, 預設為 0
let repeatClickOperator = false; // 判斷是否重複點擊運算子的變數, 預設為 false
let expressions = []; // 儲存表達式陣列的變數, 預設為空陣列
let hadDecimal = false;

let originExpression = '';

/**
 * @function
 * @param {string} num - 計算結果(有誤差的浮點數)
 * @param {number} [precision=12] - 浮點數精度
 * @returns 計算結果(如果是浮點數則回傳正確精度的浮點數)
 */
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision)); // toPrecision 方法可在超出指定位數時將其轉換為指數計數法
}

/**
 * @function
 * @param {object} e - 數字或小數點按鈕的點擊事件
 * @description 每次點擊的數字或小數點時, 將每次點擊的數字或小數點進行組字串的動作, 暫存到 tempNumber 變數,
 * 修正數字開頭為 '0' 或 '.' 的情況, 最後將暫存的數字顯示到計算結果元素中
 */
function inputValue(e) {
  const value = e.target.innerHTML; // 將點擊的數字(注意型別是字串)或小數點指派給 value 變數

  repeatClickOperator = false; // 將重複點擊運算子的變數設為 false ,以便在點擊運算子時能順利執行

  if (value === '.' && hadDecimal === true) { // 如果點擊的按鈕為小數點以及 有小數點的狀態為 true, 則中斷程式碼
    return;
  }

  tempNumber += value; // 將點擊的數字或小數點, 組字串給暫存數字的變數

  /*
    解決數字開頭為 '0' 或 '.' 的問題, 並將暫存的數字顯示在計算結果區塊元素中
  */
  if (tempNumber === '0') {
    result.innerHTML = '0';
  } else if (tempNumber[0] === '0' && tempNumber[1] !== '.' && tempNumber.length >= 1) {
    [tempNumber] = [tempNumber[1]];
    result.innerHTML = tempNumber;
  } else {
    result.innerHTML = tempNumber;
  }

  if (value === '.') { // 如果點擊的按鈕的值為小數點, 則將有小數點的狀態改為 true , 以防止重複點擊
    hadDecimal = true;
  }
}

/**
 * @function
 * @param {string} fullExpression - 預計算的表達式
 * @description 將表達式傳入 eval 方法進行計算, 並將計算結果傳入 strip 方法進行浮點數精度修正,
 * 將正確的計算結果賦值給計算結果區塊元素, 以便在計算結果區塊元素中呈現
 */
function compute(fullExpression) {
  const computedResult = eval(fullExpression);
  result.innerHTML = strip(computedResult);
}

function toCurrency(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * @function
 * @param {object} e - 運算子按鈕元素的點擊事件
 * @description 點擊算術運算子時將暫存的數字與現在點擊的算術運算子更新到表達式,
 * 如果點擊的是等號運算子,則對表達式進行計算
 */
function inputOperator(e) {
  let operator = e.target.innerHTML;

  /* 將運算子符號轉成能夠計算的運算子 */
  if (operator === '÷') {
    operator = '/';
  } else if (operator === '×') {
    operator = '*';
  }

  hadDecimal = false; // 將暫存數字有小數點的狀態改為 false , 讓剛按完運算子後可以按小數點

  /*
    如果重複點擊運算子的變數等於 false , 點擊等號運算子時, 對表達式進行計算
    如果重複點擊運算子的變數等於 false , 點擊算術運算子時, 將暫存的數字與現在點擊的運算子加到表達式中
  */
  if (repeatClickOperator === false) {
    if (operator === '=') {
      expressions.push(tempNumber);

      for (let i = 0; i < expressions.length; i++) {
        let newNumberOrOperator = ''; // 用來存放加上千分位後的數字, 預設為空字串
        originExpression += expressions[i]; // 將表達式中的成員(未加上千分位的數字或運算子)組字串儲存到變數中
        newNumberOrOperator = toCurrency(expressions[i]); // 將數字加上千分位
        expression.innerHTML += ` ${newNumberOrOperator} `; // 將加上千分位後的數字或算術運算子組字串顯示到表達式區塊元素中
      }

      compute(originExpression);
    } else {
      expressions.push(tempNumber);
      expressions.push(operator);

      for (let i = 0; i < expressions.length; i++) {
        let newNumberOrOperator = ''; // 用來存放加上千分位後的數字, 預設為空字串
        originExpression += expressions[i]; // 將表達式中的成員(未加上千分位的數字或運算子)組字串儲存到變數中
        newNumberOrOperator = toCurrency(expressions[i]); // 將數字加上千分位
        expression.innerHTML += ` ${newNumberOrOperator} `; // 將加上千分位後的數字或算術運算子組字串顯示到表達式區塊元素中
      }
    }
  }

  tempNumber = '0'; // 將暫存數字歸 0
  expressions = []; // 清空表達式

  repeatClickOperator = true; // 將重複點擊運算子的變數賦值為 true , 防止重複點擊運算子
}

/* 對每個數字按鈕元素監聽點擊事件 */
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputValue, false);
}

/* 對小數點按鈕元素監聽點擊事件 */
decimal.addEventListener('click', inputValue, false);

/* 對每個運算子按鈕元素監聽點擊事件 */
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', inputOperator, false);
}
