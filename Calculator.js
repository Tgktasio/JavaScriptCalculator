const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');

const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');

const sqrtButton = document.getElementById('sqrt');
const powerButton = document.getElementById('power');
const sinButton = document.getElementById('sin');
const cosButton = document.getElementById('cos');
const tanButton = document.getElementById('tan');

const factorialButton = document.getElementById('factorial');
const logButton = document.getElementById('log');
const memoryPlusButton = document.getElementById('memory-plus');
const memoryMinusButton = document.getElementById('memory-minus');
const memoryRecallButton = document.getElementById('memory-recall');
const memoryClearButton = document.getElementById('memory-clear');

let currentOperand = '';
let previousOperand = '';
let operation = null;
let memoryValue = 0;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.textContent);
        updateDisplay();
    });
});

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalButton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);

sqrtButton.addEventListener('click', () => {
    calculateSquareRoot();
    updateDisplay();
});

powerButton.addEventListener('click', () => {
    chooseOperation('^');
    updateDisplay();
});

sinButton.addEventListener('click', () => {
    calculateTrigonometric('sin');
    updateDisplay();
});

cosButton.addEventListener('click', () => {
    calculateTrigonometric('cos');
    updateDisplay();
});

tanButton.addEventListener('click', () => {
    calculateTrigonometric('tan');
    updateDisplay();
});

factorialButton.addEventListener('click', () => {
    calculateFactorial();
    updateDisplay();
});

logButton.addEventListener('click', () => {
    calculateLogarithm();
    updateDisplay();
});

memoryPlusButton.addEventListener('click', () => {
    addToMemory();
    updateDisplay();
});

memoryMinusButton.addEventListener('click', () => {
    subtractFromMemory();
    updateDisplay();
});

memoryRecallButton.addEventListener('click', () => {
    recallMemory();
    updateDisplay();
});

memoryClearButton.addEventListener('click', () => {
    clearMemory();
    updateDisplay();
});

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(operator) {
    if (currentOperand === '') return;

    if (previousOperand !== '') {
        compute();
    }

    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '^':
            computation = Math.pow(prev, current);
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

function updateDisplay() {
    displayCurrent.textContent = currentOperand;
    displayPrevious.textContent = previousOperand + ' ' + (operation || '');
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendDot() {
    if (currentOperand.includes('.')) return;
    if (currentOperand === '') {
        currentOperand = '0';
    }
    currentOperand += '.';
    updateDisplay();
}

function calculateSquareRoot() {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;
    currentOperand = Math.sqrt(current);
}

function calculateTrigonometric(func) {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;

    switch (func) {
        case 'sin':
            currentOperand = Math.sin(current * (Math.PI / 180));
            break;
        case 'cos':
            currentOperand = Math.cos(current * (Math.PI / 180));
            break;
        case 'tan':
            currentOperand = Math.tan(current * (Math.PI / 180));
            break;
        default:
            return;
    }
}

function calculateFactorial() {
    const num = parseInt(currentOperand);
    if (isNaN(num) || num < 0) return;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    currentOperand = result;
}

function calculateLogarithm() {
    const current = parseFloat(currentOperand);
    if (isNaN(current) || current <= 0) return;
    currentOperand = Math.log10(current);
}

function addToMemory() {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;
    memoryValue += current;
}

function subtractFromMemory() {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;
    memoryValue -= current;
}

function recallMemory() {
    currentOperand = memoryValue.toString();
}

function clearMemory() {
    memoryValue = 0;
}

