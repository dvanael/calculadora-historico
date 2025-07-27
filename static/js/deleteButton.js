"use stritct";

import { ApiWrapper } from "./wrapper.js";
import { operationsHistory } from "./operationHistory.js";
const api = new ApiWrapper();

export async function deleteLastOperation() {
  const firstItem = document.querySelector("#history .item:first-child");
  const op_id = firstItem.id;
  await api.deleteOperation(op_id);
}

const button = document.getElementById("delete-button");
button.addEventListener("click", async () => {
  deleteLastOperation();
  const user = await api.getUserMe();
  const operations = await api.getUserOperations(user.id);
  operationsHistory(operations);
});

