function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;}


let num1, num2, operator;
let shouldReset = false;

function operate(a, b, op) {
    switch (op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Error: Invalid operator';
    }
}

const text = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            text.textContent = '0';
            num1 = null;
            num2 = null;
            operator = null;
            shouldReset = false;
        } else if (button.classList.contains('number')) {
            if (text.textContent === '0' || shouldReset) {
                text.textContent = value;
                shouldReset = false;
            } else {
                text.textContent += value;
            }
        } else if (button.classList.contains('operator')) {
            num1 = text.textContent;
            operator = value;
            text.textContent = '0';
            shouldReset = false;
        } else if (button.classList.contains('btnequal')) {
            if (num1 === null || operator === null) return;
            num2 = text.textContent;
            text.textContent = operate(parseFloat(num1), parseFloat(num2), operator);
            shouldReset = true;
        }
    });
});


document.addEventListener('keydown',(e)=>{
    let key = e.key;
    if(key <='9' && key >='0'){
        if(text.textContent === '0' || shouldReset){
            text.textContent = key;
            shouldReset = false;
        }
        else{
            text.textContent +=key;
        }
    }
    else if(key === '+' || key === '-' || key === '/' || key === '*'){
        num1 = text.textContent;
        operator = key;
        text.textContent = '0';
        shouldReset = false;
    }
    else if(key === 'Enter'){
        num2 = text.textContent;
        text.textContent = operate(parseFloat(num1), parseFloat(num2), operator);
        shouldReset = true;
    }
    else if(key === 'Escape'){
        text.textContent = '0';
        num1 = null;
        num2 = null;
        operator = null;
        shouldReset = false;
    }
    else if(key === 'Backspace'){
        if(text.textContent.length > 1){
            text.textContent = text.textContent.slice(0,-1);
        }
        else {
            text.textContent = '0';
        }
    }
});








