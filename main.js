let firstNumber;
let operator; 
let secondNumber;
let shouldResetDisplay = false;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const unusable = document.querySelectorAll('.unusable');

function sum (num1, num2) {
    return num1 + num2;
};

function sub (num1, num2) {
    return num1 - num2;
};

function multy(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    return num1 / num2;
};

function operate(operator, num1, num2) {
    operator.toString()
    if (operator == '+') {
        return sum(num1, num2);
    } else if (operator == '-') {
        return sub(num1, num2);
    } else if (operator == '*') {
        return multy(num1, num2);
    } else if (operator == '/') {
        return divide(num1, num2);
    } 
};

numbers.forEach(button => {
    button.addEventListener('click', function() {
        if (display.textContent === '0' || shouldResetDisplay) {
          display.textContent = button.textContent;
          shouldResetDisplay = false;
        } else {
          display.textContent += button.textContent;
        }});
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (firstNumber != null && operator != null && !shouldResetDisplay) {
            secondNumber = Number(display.textContent);
            let result = operate(operator, firstNumber, secondNumber);
            if (operator === '/' && secondNumber === 0) {
                display.style.fontSize = '30px';
                display.textContent = 'Not possible';
                firstNumber = null;
                secondNumber = null;
                operator = null;
                
                return;
            }   
            if (!Number.isInteger(result)) {
                result = Number(result.toFixed(4));
            };
            display.textContent = result;
            firstNumber = result;
        } else {
            firstNumber = Number(display.textContent);
        }
        
        if (button.textContent == 'X') {
            operator = '*';
        } else {
            operator = button.textContent;
        }

        shouldResetDisplay = true;
    })
});

equal.addEventListener('click', function () {
    secondNumber = Number(display.textContent);
    display.textContent = firstNumber
    if (firstNumber == null || operator == null || shouldResetDisplay) {
        display.textContent = 'Error'
        return;
    }
    let result = operate(operator,firstNumber,secondNumber);
    if (operator === '/' && secondNumber === 0) {
        display.style.fontSize = '30px';
        display.textContent = 'Not possible';
        firstNumber = null;
        secondNumber = null;
        operator = null;
        
        return;
    }      
    if (!Number.isInteger(result)) {
        result = Number(result.toFixed(4));
    };
    display.textContent = result;
    firstNumber = result;
})

clear.addEventListener('click', function () {
    display.style.fontSize = '70px';
    display.textContent = '0';
    firstNumber = null;
    secondNumber = null;
    operator = null;
})

