## Introduction
The Luhn Algorithm is a checkdigit forumla that is used to verify the accuracy of a identification numbers. The Luhn Algorithm is widely used to verify social security numbers, credit cards, patents and more. However, the Luhn algorithm is only used to verify accuracy. It offers no extra security beyond ensuring that the inputed digits are valid. 

### The formula
The digits are all the algorithm needs to fulfil its purpose. It uses a simple 5 step formula:

1. Starting from the rightmost digit, every second digit is multiplied by two. 
2. If the result of multiplication is greater than nine, sum up both digits to form one. 
3. It then sums up all the digits
4. The sum is divided by ten. 
5. If the division is equals zero, then the card number is correct. Otherwise, it is wrong. 


### The code
In JavaScript, here's one way to write the algorithm:
 
```js
//Create a function whose parameter is an array
function validateCred(cardNum) {
    //Initialize sum and give it a value of 0
    let sum = 0;

    //Create a loop that starts from the last index in the array to the first. 
    for (let i = cardNum.length - 1; i >= 0; i--) {

        //Initialize digit, and set it equal to the value of the current index within the array
        let digit = cardNum[i];

        //Create a condition that checkes if digit that multiplies every second digit by 2
        if ((cardNum.length - i) % 2 === 0) {
            digit *= 2;
            //if digit is greater than 9, deduct 9 from digit. This is an easier way to do step 2 in the formula
            if (digit > 9) {

                digit -= 9;
            }
        }
        //Outside the conditional, add digit to sum 
        sum += digit;
    }
    return sum % 10 === 0;
}
```

### Conclusion

