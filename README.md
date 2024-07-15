# don.js

```javascript
const { BigNumber, CurrencyInfo, Money } = require('don.js');

// Create a currency info object for USD in English (United States)
const currencyInfo = new CurrencyInfo('USD', 'en-US');

// Create a Money object with an initial amount and currency info
const money = new Money('100.50', currencyInfo);

// Get the formatted amount
const formattedAmount = money.toFormat();
console.log(formattedAmount); // Output: $100.50

// Perform operations with another Money object
const otherMoney = new Money('50.25', currencyInfo);

// Add two Money objects
const sum = money.add(otherMoney);
console.log(sum.toFormat()); // Output: $150.75

// Multiply Money object by a factor
const multiplied = money.multiply(2);
console.log(multiplied.toFormat()); // Output: $201.00
```
