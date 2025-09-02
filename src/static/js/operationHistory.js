"use stritct";

import { ApiWrapper } from "./wrapper.js";

const api = new ApiWrapper();

export function operationsHistory(operations) {
  const history = document.getElementById("history");
  history.innerHTML = ""

  operations.forEach((operation) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.id = operation.id;
    item.innerHTML = `
      <span class="parameters">${operation.parameters}</span>
      <span class="result">${operation.result}</span>
      <span class="inclusion-date">${new Date(operation.inclusion_date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
    `;
    history.appendChild(item);
  });
}

const user = await api.getUserMe();
const operations = await api.getUserOperations(user.id);
operationsHistory(operations);
