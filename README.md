# JS 地下城 3F-Calculator

[demo](https://yingming25.github.io/calculator/)

### BOSS 弱點

1. 【特定技術】數字位數過多時，不能因此而破版，計算機功能皆須齊全
2. 【自我學習】請在此關卡中「自學一個你原本不太會的技巧」，投稿時分享你透過哪些資源學習，並寫範例程式碼講解該技巧，以及你如何應用在此關卡上。

---

### 任務流程、步驟規劃
1. 點擊數字按鈕時會將按鈕的值顯示在計算結果中
2. 點擊數字按鈕 0 再接著按其他數字按鈕會把 0 去掉
3. 點擊小數點時如果目前有待運算的數字會添加到目前的數字上
4. 點擊小數點時如果目前沒有待運算的數字,則在小數點前補 0
5. 點擊運算子時會將目前的數字與點擊的運算子顯示在計算結果上方（確認是否重複點擊運算子,限制不能重複點擊
6. 點擊小數點以外的運算子時,如果還沒有按其他數字接著點擊數字按鈕,則清除運算子,顯示點擊的數字按鈕到計算結果中
7. 數字要有千分位
8. 數字位數太多不能破版
9. 點擊等號運算子時會更新顯示的表達式(將新按的數字更新到運算式)並將運算式計算後回傳結果到計算結果中,
10. 如果點擊等號運算子時如果只有一個數字,則回傳目前的數字,
11. 如果點擊等號運算子時如果只有一個數字與一個運算子,則刪除運算子回傳數字
12. 點擊等號運算子後如果接著點擊新的數字按鈕則清除之前的運算,回傳重新計算後的結果
13. 點擊等號運算子時如果是小數計算,要能回傳正確計算後的結果
14. 點擊清除時會刪除暫存數字的最後1位數字, 並將刪除後的結果顯示在畫面中
15. 點擊全部清除時會清除運算式並將計算結果歸 0

---

### 遇到的問題
1. Q1: 遇到數字與運算子在加進表達式時無法取得數字

    A1: 重新思考儲存數字的方式，從原本把數字加進陣列改成用變數暫存

2. Q2: 遇到要對表達式進行四則運算時發生 "-" 運算子無法正確運算的問題

    A2: 在 html 的減號運算子(從設計稿直接複製過來的)不是正確的 "-" 運算子

3. Q3: 計算小數點產生精度問題 (0.1 + 0.2 = 0.30000000000000004)

    A3: 先將計算結果用 toPrecision 湊整數,再用 parseFloat 轉成小數

### 參考來源


[重新認識 JavaScript: Day 06 運算式與運算子](https://ithelp.ithome.com.tw/articles/10191180)

[CodePen 1](https://codepen.io/wilightmoment/pen/rPqwYb?editors=0010)

[CodePen 2](https://codepen.io/ren096358/pen/bzjdYo)

[CodePen 3](https://codepen.io/anon/pen/JxOLLg)

[CodePen 4](https://codepen.io/anon/pen/xBGOLy)

[JS 地下城：3F - 計算機](https://mtwmt.github.io/blog/JSBOSS/3f/)

[[JavaScript 地下城] LV 3— 計算機](https://medium.com/pvt5r486/javascript-%E5%9C%B0%E4%B8%8B%E5%9F%8E-lv-3-%E8%A8%88%E7%AE%97%E6%A9%9F-faa3d7f731e5)

[[六角學院] 新手 JS 地下城 — 3F 計算機](https://medium.com/@songrob/%E5%85%AD%E8%A7%92%E5%AD%B8%E9%99%A2-%E6%96%B0%E6%89%8Bjs%E5%9C%B0%E4%B8%8B%E5%9F%8E-3f-%E8%A8%88%E7%AE%97%E6%A9%9F-f851862389a8)

[JavaScript 浮點數陷阱及解法](https://github.com/camsong/blog/issues/9)

[轉換數字成含千分位的文字](https://dotblogs.com.tw/alenwu_coding_blog/2017/08/11/js_number_to_currency_comma)

[Javascript 文檔註解規則使用方式 @use JSDoc](http://www.ucamc.com/e-learning/javascript/250-javascript-use-jsdoc.html)

