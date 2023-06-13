const STATUS_IN_LIMIT = "Все хорошо";
const STATUS_OUT_OF_LIMIT = "Все плохо";
const STATUS_IN_LIMIT_TEXT = "stats-status-text-positive";
const STATUS_OUT_OF_LIMIT_TEXT = "stats-status-text-negative";
const AMOUNT_OF_EXPENSES_TEXT = "Введите сумму трат!";
const CATEGORY = "Категория";
const SELECT_CATEGORY_TEXT = "Выберете категорию!";
const ENTER_THE_LIMIT_TEXT = "Введите лимит!";
const CLICK_SEND_TEXT = "Нажмите отправить!";
const CHANGE_LIMIT_TEXT = "Новый лимит";
const CURRENCY = "руб.";
const POPUP_OPENED_CLASSNAME = "expenses-popup-open";
const BODY_FIXED_CLASSNAME = "expenses-body-fixed";

const inputNode = document.getElementById("expense-input");
const categorySelectNode = document.getElementById("category-select");
const addButtonNode = document.getElementById("add-button");
const clearBunntonNode = document.getElementById("clear-button");
const totalValueNode = document.getElementById("total-value");
const statusNode = document.getElementById("status-text");
const historyList = document.getElementById("history-list");
const changeLimitBtn = document.getElementById("popup-inner-btn");
const validationMessage = document.getElementById("expensesValidation-message");
const popupInputNode = document.getElementById("expenses-popup-input");
const popupValidationMessage = document.getElementById("popup-expensesValidation-message");

const bodyNode = document.getElementById("body");
const popupNode = document.getElementById("expenses-popup");
const btnOpenNode = document.getElementById("popup-changeLimitBtn");
const popupContentNode = document.getElementById("expenses-popup");
const btnCloseNode = document.getElementById("popup-close-btn");

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
  totalValueNode.innerText = `${total} ${CURRENCY}`;

  if (total <= limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.className = STATUS_IN_LIMIT_TEXT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      limit - total
    } ${CURRENCY})`;
    statusNode.className = STATUS_OUT_OF_LIMIT_TEXT;
  }
};

const renderHistory = () => {
  historyList.innerHTML = "";
  expenses.forEach(function (expense) {
    const historyItem = document.createElement("li");
    historyItem.className = "rub";
    historyItem.innerText = `${expense.category} - ${expense.amount} ${CURRENCY}`;
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

const validation = () => {
  if (!inputNode.value) {
    validationMessage.innerText = AMOUNT_OF_EXPENSES_TEXT;
    validationMessage.classList.remove("expenses-validation-message-hidden");
    return;
  }

  if (categorySelectNode.value === CATEGORY) {
    validationMessage.innerText = SELECT_CATEGORY_TEXT;
    validationMessage.classList.remove("expenses-validation-message-hidden");
    return;
  }

  validationMessage.classList.add("expenses-validation-message-hidden");
};

const popupValidation = () => {
  if (!popupInputNode.value) {
    popupValidationMessage.innerText = ENTER_THE_LIMIT_TEXT;
    popupValidationMessage.classList.remove(
      "popup-expensesValidation-message-hidden"
    );
    return;
  }

  if (popupInputNode.value) {
    popupValidationMessage.innerText = CLICK_SEND_TEXT;
    popupValidationMessage.classList.remove(
      "popup-expensesValidation-message-hidden"
    );
  }

  popupValidationMessage.add("popup-expensesValidation-message-hidden");
};

inputNode.addEventListener("input", () => {
  validation();
});

popupInputNode.addEventListener("input", () => {
  popupValidation();
});

const addButtonHandler = () => {
  validation();

  const currentAmount = getExpenseFromUser();
  if (!currentAmount) {
    return;
  }

  const currentCategory = getSelectedCategory();
  if (currentCategory === CATEGORY) {
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
  const newLimit = popupInputNode.value;
  const newLimitValue = parseInt(newLimit);

  if (!newLimitValue) {
    return;
  }

  limitNode.innerText = `${newLimitValue} ${CURRENCY}`;
  limit = newLimitValue;

  expensesTogglePopupHandler();
  render();
};

popupNode.addEventListener("click", (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(popupContentNode);

  if (isClickOutsideContent) {
    expensesTogglePopupHandler();
  }

  clearInput(popupInputNode);
  popupValidation();
});

const expensesTogglePopupHandler = () => {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
};

btnOpenNode.addEventListener("click", expensesTogglePopupHandler);
btnCloseNode.addEventListener("click", expensesTogglePopupHandler);
addButtonNode.addEventListener("click", addButtonHandler);
clearBunntonNode.addEventListener("click", clearButtonHandler);
changeLimitBtn.addEventListener("click", changeLimitHandler);
