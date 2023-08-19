"use strict";
const numberBtns = document.getElementsByClassName("numbtn");
const operationBtns = document.getElementsByClassName("opbtn");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("eq");
const displayText = document.getElementById("displayText");
const breadcrumbText = document.getElementById("breadcrumb");
// vars to hold active values
let firstNumber = 0;
let backupNumber = 0;
let operator = "";
let shortOperator = "";
let holdingValue = "0";
function updateDisplay() {
    if (displayText) {
        displayText.innerText = holdingValue;
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
    calculate(firstNumber, Number(holdingValue), operator);
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
    if (operator !== '')
        calculate(firstNumber, Number(holdingValue), operator);
    firstNumber = Number(holdingValue);
    holdingValue = "0";
    operator = newOperator;
    shortOperator = newShortOperator;
    if (operator === '' && displayText) {
        displayText.innerText = shortOperator;
    }
    ;
    if (breadcrumbText)
        breadcrumbText.innerText = `${firstNumber} ${shortOperator}`;
}
function calculate(num1, num2, operator) {
    if (operator === '') {
        return;
    }
    let inputNumber = Number(holdingValue);
    if (holdingValue == "") {
        inputNumber = backupNumber;
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
        breadcrumbText.innerText = `${firstNumber} ${shortOperator} ${inputNumber}`;
    }
    backupNumber = inputNumber;
    firstNumber = result;
    if (displayText)
        displayText.innerText = String(result);
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
        alert("NO!!!!");
        return (0);
    }
    else {
        let result = num1 / num2;
        return (result);
    }
}
