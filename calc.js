const numBtns = document.getElementsByClassName("numbtn");
const opBtns = document.getElementsByClassName("opbtn");
const displayText = document.getElementById("displayText");
let breadcrumb = document.getElementById("breadcrumb")

let num1 = 0;
let num2 = 0;
let operator = null;
let shortOperator = "";
let displayContent = 0
let result = 0;
let breadcrumbText = "..."

function updateDisplay() {
    displayText.innerText = displayContent;
    breadcrumb.innerText = breadcrumbText;
}

updateDisplay();

for (let i = 0; i < numBtns.length; i++) {
    let currentBtn = numBtns[i];
    currentBtn.addEventListener("click", function () {
        if (displayContent <= 0) {
            displayContent = currentBtn.id
        }
        else {displayContent += currentBtn.id}
        displayText.innerText = displayContent;
    })
}

for (let i = 0; i < opBtns.length; i++) {
    let currentBtn = opBtns[i];
    currentBtn.addEventListener("click", function () {
        logNum(displayContent);
        operator = currentBtn.id;
        switch (operator) {
            case add:
                shortOperator = "&#43";
                break;
            case multiply:
                shortOperator = "x";
                break;
            case subtract:
                shortOperator = "-";
                break;
            case divide:
                shortOperator = "/";
                break;
            default:
                break;
        }
        displayText.innerText = shortOperator;
    })
}

document.getElementById("clear").addEventListener("click", function (){
    displayContent = 0;
    operator = null;
    displayText.innerText = displayContent;
})

function logNum(input) {
    if (operator === null && displayContent != null) {
        num1 = input;
        displayContent = 0
        breadcrumbText = num1 + " " + shortOperator;
        updateDisplay();
    }
    else if (operator != null && num1 != null) {
        num2 = input;
        displayContent = 0
        breadcrumbText = num1 + " " + shortOperator + " " + num2;
        updateDisplay();    
    }
    else {
        displayText.innerText = "What?"
    }
}

// calculation functions
function add(num1, num2) {
    let result = num1 + num2;
    return(result);
}

function multiply(num1, num2) {
    let result = num1 * num2;
    return(result);
}

function subtract(num1, num2) {
    let result = num1 - num2;
    return(result);
}

function divide(num1, num2) {
    if (num1 == 0) {
        displayText.innerText = "nope!"
    }
    else if (num2 == 0) {
        displayText.innerText = "OH no! NAN!!!!!!"
    }
    else {
    let result = num1 / num2;
    return(result); }
}