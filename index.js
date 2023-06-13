const STATUS_IN_LIMIT = "Все хорошо";
const STATUS_OUT_OF_LIMIT = "Все плохо";
const CHANGE_LIMIT_TEXT = "Новый лимит";

const inputNode = document.getElementById("expenseInput");
const categorySelectNode = document.getElementById("categorySelect");
const addButtonNode = document.getElementById("addButton");
const clearBunntonNode = document.getElementById("clearButton");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyList = document.getElementById("historyList");
const changeLimitBtn = document.getElementById("changeLimitBtn");
const validationMessage = document.getElementById("expensesValidation-message");

const limitNode = document.getElementById("limitValue");
let limit = parseInt(limitNode.innerText);

let expenses = [];

const getTotal = () => {
  let sum = 0;
  expenses.forEach(function (expense) {
    sum += expense.amount;
  });

  return sum;
};

const renderStatus = () => {
  const total = getTotal(expenses);
  totalValueNode.innerText = total;

  if (total <= limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.className = "stats-statusText-positive";
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
    statusNode.className = "stats-statusText-negative";
  }
};

const renderHistory = () => {
  historyList.innerHTML = "";
  expenses.forEach(function (expense) {
    const historyItem = document.createElement("li");
    historyItem.className = "rub";
    historyItem.innerText = `${expense.category} - ${expense.amount}`;
    historyList.appendChild(historyItem);
  });
};

const render = () => {
  renderStatus();

  renderHistory();
};

const getExpenseFromUser = () => {
  return parseInt(inputNode.value);
};

const getSelectedCategory = () => {
  return categorySelectNode.value;
};

const clearInput = (input) => {
  input.value = "";
};

// валидация
const validation = () => {
  if (!inputNode.value) {
    validationMessage.innerText = `Введите сумму трат!`;
    validationMessage.classList.remove("expenses-validation-message-hidden");
    return;
  }

  if (categorySelectNode.value === "Категория") {
    validationMessage.innerText = `Выберете категорию!`;
    validationMessage.classList.remove("expenses-validation-message-hidden");
    return;
  }

  validationMessage.classList.add("expenses-validation-message-hidden");
};

inputNode.addEventListener("input", () => {
  validation();
});

const addButtonHandler = () => {
  // валидация
  validation();

  const currentAmount = getExpenseFromUser();
  if (!currentAmount) {
    return;
  }

  const currentCategory = getSelectedCategory();
  if (currentCategory === "Категория") {
    return;
  }

  const newExpense = { amount: currentAmount, category: currentCategory };
  expenses.push(newExpense);

  render();

  clearInput(inputNode);
};

const clearButtonHandler = () => {
  expenses = [];
  render();
};

const changeLimitHandler = () => {
  const newLimit = prompt(CHANGE_LIMIT_TEXT);
  const newLimitValue = parseInt(newLimit);

  if (!newLimitValue) {
    return;
  }

  limitNode.innerText = newLimitValue;
  limit = newLimitValue;

  render();
};

addButtonNode.addEventListener("click", addButtonHandler);
clearBunntonNode.addEventListener("click", clearButtonHandler);
changeLimitBtn.addEventListener("click", changeLimitHandler);
