const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

function updateDisplay() {
    display.textContent = currentInput || '0';
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === 'C') {
            currentInput = '';
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
        } else if (value === '=') {
            try {
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = 'Error';
            }
        } else {
            if (currentInput === 'Error') {
                currentInput = '';
            }
            currentInput += value;
        }

        updateDisplay();
    });
});

updateDisplay();
