"use strict";
const numberBtns = document.getElementsByClassName("numbtn");
const operationBtns = document.getElementsByClassName("opbtn");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("eq");
const displayText = document.getElementById("displayText");
const breadcrumbText = document.getElementById("breadcrumb");
const decimalButton = document.getElementById("decimal");
// vars to hold active values
let firstNumber = 0;
let backupNumber = 0;
let operator = "";
let shortOperator = "";
let holdingValue = "0";
let lastOperator = "";
function updateDisplay() {
    if (displayText) {
        if (holdingValue.length > 13) {
            let notationalValue = Number(holdingValue).toExponential(5);
            displayText.innerText = notationalValue;
        }
        else {
            displayText.innerText = holdingValue;
        }
    }
}
// add event listeners to each button
for (let i = 0; i < numberBtns.length; i++) {
    let currentBtn = numberBtns[i];
    currentBtn.addEventListener("click", () => {
        inputNumber(currentBtn.id);
    });
}
for (let i = 0; i < operationBtns.length; i++) {
    let currentBtn = operationBtns[i];
    currentBtn.addEventListener("click", () => {
        setOperator(currentBtn.id, String(currentBtn.textContent));
    });
}
clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener("click", () => {
    clear();
});
equalButton === null || equalButton === void 0 ? void 0 : equalButton.addEventListener("click", () => {
    calculate();
});
decimalButton === null || decimalButton === void 0 ? void 0 : decimalButton.addEventListener("click", () => {
    addDecimal();
});
// button functions
function clear() {
    firstNumber = 0;
    backupNumber = 0;
    operator = '';
    holdingValue = "0";
    if (breadcrumbText) {
        breadcrumbText.innerText = "...";
    }
    updateDisplay();
}
function inputNumber(input) {
    if (holdingValue === "0" || "") {
        holdingValue = input;
    }
    else {
        holdingValue += input;
    }
    updateDisplay();
}
function setOperator(newOperator, newShortOperator) {
    lastOperator = "";
    if (operator !== "") {
        calculate();
    }
    if (holdingValue) {
        firstNumber = Number(holdingValue);
        holdingValue = "0";
    }
    if (operator === '' && displayText) {
        displayText.innerText = shortOperator;
    }
    ;
    operator = newOperator;
    shortOperator = newShortOperator;
    if (breadcrumbText)
        breadcrumbText.innerText = `${Math.round((firstNumber + Number.EPSILON) * 100) / 100} ${shortOperator}`;
}
function addDecimal() {
    if (holdingValue.includes("."))
        return;
    else {
        holdingValue += ".";
        updateDisplay();
    }
}
function calculate() {
    if (operator === '') {
        return;
    }
    let inputNumber = Number(holdingValue);
    if (holdingValue == "") {
        inputNumber = backupNumber;
    }
    ;
    if (operator == "" && lastOperator != "") {
        operator = lastOperator;
    }
    let result = 0;
    switch (operator) {
        case "add":
            result = add(firstNumber, inputNumber);
            holdingValue = "";
            console.log(firstNumber, shortOperator, inputNumber, "=", result);
            break;
        case "multiply":
            result = multiply(firstNumber, inputNumber);
            holdingValue = "";
            console.log(firstNumber, " ", shortOperator, " ", inputNumber, "=", result);
            break;
        case "subtract":
            result = subtract(firstNumber, inputNumber);
            holdingValue = "";
            console.log(firstNumber, " ", shortOperator, " ", inputNumber, "=", result);
            break;
        case "divide":
            result = divide(firstNumber, inputNumber);
            holdingValue = "";
            console.log(firstNumber, " ", shortOperator, " ", inputNumber, "=", result);
            break;
        default:
            console.log("invalid operator?");
            break;
    }
    if (breadcrumbText) {
        breadcrumbText.innerText = `${Math.round((firstNumber + Number.EPSILON) * 100) / 100} ${shortOperator} ${Math.round((inputNumber + Number.EPSILON) * 100) / 100}`;
    }
    backupNumber = inputNumber;
    firstNumber = result;
    lastOperator = operator;
    operator = "";
    if (displayText)
        if (String(result).length > 10) {
            let notationalResult = result.toExponential(5);
        }
        else {
            displayText.innerText = String(result.toFixed(6));
        }
    return (result);
}
// calculation functions
function add(num1, num2) {
    let result = num1 + num2;
    return (result);
}
function multiply(num1, num2) {
    let result = num1 * num2;
    return (result);
}
function subtract(num1, num2) {
    let result = num1 - num2;
    return (result);
}
function divide(num1, num2) {
    if (num1 === 0 || num2 === 0) {
        alert("Please do not divide by 0");
        return (0);
    }
    else {
        let result = num1 / num2;
        return (result);
    }
}
