"use strict";

import { ApiWrapper } from "./wrapper.js";
import { operationsHistory } from "./operationHistory.js";

const api = new ApiWrapper();
const user = await api.getUserMe();

// Manipulação da Calculadora
const display = document.getElementById("display");
let inputList = [];

function formatExpression(list) {
  const expression = list.map((item) => {
    if (item === "*") return "×";
    if (item === "/") return "÷";
    return item;
  }).join("");
  return expression;
}

function updateDisplay() {
  const expression = formatExpression(inputList)
  display.textContent = expression || "0";
}

function addToInput(value) {
  const operators = ["+", "-", "*", "/"];

  if (operators.includes(value)) {
    if (inputList.length === 0) return;

    const last = inputList[inputList.length - 1];
    if (operators.includes(last)) {
      inputList[inputList.length - 1] = value;
    } else {
      inputList.push(value);
    }
  } else {
    const last = inputList[inputList.length - 1];
    if (!isNaN(last)) {
      inputList[inputList.length - 1] += value;
    } else {
      inputList.push(value);
    }
  }

  updateDisplay();
}

function clearInput() {
  inputList = [];
  updateDisplay();
}

async function calculate() {
  const expression = inputList.join("");
  const parameters = formatExpression(inputList)
  try {

    let result = eval(expression);
    result = parseFloat(result.toFixed(10));
    inputList = [result.toString()];
    updateDisplay();

    const data = {
      id_user: user.id,
      parameters: parameters,
      result: result,
    };
    await api.createOperation(user.id, data)

    const operations = await api.getUserOperations(user.id)
    operationsHistory(operations);


  } catch (e) {
    display.textContent = "Erro mds q tristeza";
  }
}

function backspace() {
  const last = inputList[inputList.length - 1];
  if (!last) return;

  if (last.length > 1) {
    inputList[inputList.length - 1] = last.slice(0, -1);
  } else {
    inputList.pop();
  }

  updateDisplay();
}

document.querySelectorAll("button").forEach((btn) => {
  const value = btn.dataset.value;
  const action = btn.dataset.action;

  if (value) {
    btn.addEventListener("click", () => addToInput(value));
  }

  if (action === "clear") {
    btn.addEventListener("click", clearInput);
  }

  if (action === "equal") {
    btn.addEventListener("click", calculate);
  }

  if (action === "backspace") {
    btn.addEventListener("click", backspace);
  }
});

