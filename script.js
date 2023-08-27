let runningTotal = 0;
let display = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = display;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            display = '0';
            runningTotal = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(display));
            previousOperator = null;
            display = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (display.length === 1) {
                display = '0';
            } else {
                display = display.substring(0, display.length - 1);
            }
            break;
        case '+':
        case '−':
        case 'x':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(display === '0'){
        return;
    }

    const intDisplay = parseInt(display);

    if(runningTotal === 0){
        runningTotal = intDisplay;
    }else{
        flushOperation(intDisplay);
    }

    previousOperator = symbol;
    display = '0';
}

function flushOperation(intDisplay){
    if(previousOperator === '+'){
        runningTotal += intDisplay;
    }else if(previousOperator === '−'){
        runningTotal -= intDisplay;
    }else if(runningTotal === '×'){
        runningTotal *= intDisplay;
    }else if(previousOperator === '÷'){
        runningTotal /= intDisplay;
    }
}

function handleNumber(numberString){
    if(display === '0'){
        display = numberString;
    }else{
        display+= numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();