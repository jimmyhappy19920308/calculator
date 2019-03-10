const numbers = document.querySelectorAll('.number'); // 選取數字按鈕元素群組
const decimal = document.querySelector('.decimal'); // 選取小數點按鈕元素
const operators = document.querySelectorAll('.operator'); // 選取運算子按鈕元素群組
const expression = document.querySelector('.expression'); // 選取表達式顯示區塊元素
const result = document.querySelector('.result'); // 選取計算結果顯示區塊元素
const backspace = document.querySelector('.backspace'); // 選取退位按鈕元素
const allClear = document.querySelector('.all-clear'); // 選取全部清除按鈕元素
let tempNumber = '0'; // 儲存暫存數字的變數, 預設為 0
let repeatClickOperator = false; // 判斷是否重複點擊運算子的變數, 預設為 false
let expressions = []; // 儲存表達式陣列的變數, 預設為空陣列
let hadDecimal = false; // 判斷暫存數字是否已經有小數點, 預設為 false
let originExpression = ''; // 用來存放沒有加上千分位的表達式, 預設為空字串

/**
 * @function
 * @param {string} num - 計算結果(有誤差的浮點數)
 * @param {number} [precision=12] - 浮點數精度
 * @description 如果是浮點數會將精度修正
 * @returns 正確精度的計算結果
 */
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision)); // toPrecision 方法可在超出指定位數時將其轉換為指數計數法
}

/**
 * @function
 * @param {string} fullExpression - 預計算的表達式
 * @description 將表達式傳入 eval 方法進行計算,
 * @returns 計算結果
 */
function compute(fullExpression) {
  const computedResult = eval(fullExpression);
  return computedResult;
}

/**
 * @function
 * @param {string} num - 暫存的數字或運算子
 * @description 將數字加上千份位
 * @returns 加上千分位的數字
 */
function toCurrency(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
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

  /* 如點表達式的值等於 '', 則將畫面上的表達式清空, 以便按完等號後重新開始新的計算  */
  if (originExpression === '') {
    expression.innerHTML = '';
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
        originExpression += expressions[i]; // 將表達式中的成員(未加上千分位的數字或運算子)組給變數, 以便計算
        newNumberOrOperator = toCurrency(expressions[i]); // 將數字加上千分位
        expression.innerHTML += ` ${newNumberOrOperator} `; // 將加上千分位後的數字或算術運算子組字串顯示到表達式區塊元素中
      }

      const computedResult = compute(originExpression);

      const correctPrecisionResult = strip(computedResult);

      result.innerHTML = toCurrency(correctPrecisionResult);

      originExpression = ''; // 按完等號計算完表達式後將表達式清空
    } else {
      expressions.push(tempNumber);
      expressions.push(operator);

      for (let i = 0; i < expressions.length; i++) {
        let newNumberOrOperator = ''; // 用來存放加上千分位後的數字, 預設為空字串
        originExpression += expressions[i]; // 將表達式中的成員(未加上千分位的數字或運算子)組給變數, 以便計算
        newNumberOrOperator = toCurrency(expressions[i]); // 將數字加上千分位
        expression.innerHTML += ` ${newNumberOrOperator} `; // 將加上千分位後的數字或算術運算子組字串顯示到表達式區塊元素中
      }
    }
  }

  tempNumber = '0'; // 將暫存數字歸 0
  expressions = []; // 清空表達式

  repeatClickOperator = true; // 將重複點擊運算子的變數賦值為 true , 防止重複點擊運算子
}

function removeLastValue() {
  const lastValue = tempNumber.slice(-1); // 取得暫存數字的最後一個字元

  /* 如果最後一個字元的值是 '.', 則將已經有小數點的變數設為 false , 以便再次新增小數點 */
  if (lastValue === '.') {
    hadDecimal = false;
  }

  /* 如果暫存數字的變數的值不為 '0', 則刪除最後1位數字後重新顯示 */
  if (tempNumber !== '0') {
    tempNumber = tempNumber.substring(0, tempNumber.length - 1); // 刪除最後1位數字
    result.innerHTML = tempNumber; // 將更新後的暫存數字顯示到計算結果區塊元素中
  }

  /* 如果暫存數字的變數的值為 '' , 則顯示 '0' */
  if (tempNumber === '') {
    tempNumber = '0';
    result.innerHTML = tempNumber;
  }
}

function reset() {
  tempNumber = '0'; // 將儲存暫存數字的變數歸 0
  repeatClickOperator = false; // 將判斷是否重複點擊運算子的變數設為 false
  expressions = []; // 將儲存表達式陣列的變數設為空陣列
  hadDecimal = false; // 將判斷暫存數字是否已經有小數點的變數設為 false
  originExpression = ''; // 將用來存放沒有加上千分位的表達式設為空字串

  expression.innerHTML = '';
  result.innerHTML = tempNumber;
}

/* 對每個數字按鈕元素監聽點擊事件,並觸發事件處理函式 */
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', inputValue, false);
}

/* 對小數點按鈕元素監聽點擊事件,並觸發事件處理函式 */
decimal.addEventListener('click', inputValue, false);

/* 對每個運算子按鈕元素監聽點擊事件,並觸發事件處理函式 */
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', inputOperator, false);
}

/* 對退位按鈕元素監聽點擊事件,並觸發事件處理函式 */
backspace.addEventListener('click', removeLastValue, false);

/* 對全部清除按鈕監聽點擊事件, 並觸發事件處理函數 */
allClear.addEventListener('click', reset, false);
