# 新手 JS 地下城 3F-Calculator

### BOSS 弱點

1. 【特定技術】數字位數過多時，不能因此而破版，計算機功能皆須齊全
2. 【自我學習】請在此關卡中「自學一個你原本不太會的技巧」，投稿時分享你透過哪些資源學習，並寫範例程式碼講解該技巧，以及你如何應用在此關卡上。

---

### 任務流程、步驟規劃
1. 點擊數字按鈕時會將按鈕的值顯示在計算結果中
2. 點擊數字按鈕 0 再接著按其他數字按鈕會把 0 去掉
3. 點擊小數點時如果目前有待運算的數字會添加到目前的數字上
4. 點擊小數點時如果目前沒有待運算的數字,則在小數點前補 0
5. 點擊運算子時會將目前的數字與點擊的運算子顯示再計算結果上方（確認是否重複點擊運算子,限制不能重複點擊
6. 點擊小數點以外的運算子時如果還沒有按其他數字接著點擊數字按鈕，會清除運算子顯示點擊的數字按鈕到計算結果中
7. 數字不能除以 0
8. 數字會要有千分位
9. 數字位數太多不能破版
10. 點擊等號運算子時會更新顯示的表達式(將新按的數字更新到運算式)並將運算式計算後回傳結果到計算結果中,
11. 點擊等號運算子時如果只有一個數字則回傳目前的數字,
12. 點擊等號運算子時如果只有一個數字與一個運算子,則刪除運算子回傳數字
13. 點擊等號運算子後如果接著點擊新的數字按鈕則清除之前的運算,重新計算
14. 點擊等號運算子時如果是小數計算要能回傳正確計算結果
15. 點擊清除時會刪除運算式中的最後1位數字或運算子
16. 點擊全部清除時會將運算式歸 0

---

### 遇到的問題
1. Q1:

### 參考來源

[How to build an HTML calculator app from scratch using JavaScript](https://medium.freecodecamp.org/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98)

[重新認識 JavaScript: Day 06 運算式與運算子](https://ithelp.ithome.com.tw/articles/10191180)

[CodePen 1](https://codepen.io/wilightmoment/pen/rPqwYb?editors=0010)

[CodePen 2](https://codepen.io/anon/pen/JxOLLg)

[[JavaScript 地下城] LV 3— 計算機](https://medium.com/pvt5r486/javascript-%E5%9C%B0%E4%B8%8B%E5%9F%8E-lv-3-%E8%A8%88%E7%AE%97%E6%A9%9F-faa3d7f731e5)

[簡易計算機實作 (javascript)](http://frontend-murmur.logdown.com/posts/291293-simple-calculator-implemented-javascript)

[怎样给数字添加千分符的](https://juejin.im/post/5b026bbb5188256720345bb4)

