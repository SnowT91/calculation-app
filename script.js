const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function appendValue(value) {
    if (currentInput === 'Error') {
        currentInput = '';
    }

    const lastChar = currentInput.slice(-1);

    // Prevent multiple operators in a row
    if (isOperator(value) && isOperator(lastChar)) {
        currentInput = currentInput.slice(0, -1) + value;
        return;
    }

    // Prevent multiple dots in the same number seagment
    if (value === '.') {
        const parts = currentInput.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];

        if (lastPart.includes('.')) {
            return;
        }
    }

    currentInput += value;
}

function clearInput() {
    currentInput = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
}

function calculateResult() {
    if (currentInput) return;

    const lastChar = currentInput.slice(-1);

    if (isOperator(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }

    try {
        const result = eval(currentInput);

        if (!isFinite(result)) {
            currentInput = 'Error';
        } else {
            currentInput = result.toString();
        }
    }   catch {
        currentInput = 'Error';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === 'C') {
            clearInput();
        } else if (value === 'DEL') {
            deleteLast();
        } else if (value === '=') {
            calculateResult();
        } else {
            appendValue(value);
        }

        updateDisplay();
    });
});

updateDisplay();
