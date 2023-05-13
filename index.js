const LIMIT = 10000;
const CURRENSY = 'руб.';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OUT_OF_LIMIT = 'Все плохо';
const STATUS_OUT_OF_LIMIT_CLASS_NAME = 'status-red';

const inputNode = document.querySelector('.js-expense-input');
const buttonNode = document.querySelector('.js-expense-button');
const historyNode = document.querySelector('.js-history');
const sumNode = document.querySelector('.js-sum');
const limitNode = document.querySelector('.js-limit');
const statusNode = document.querySelector('.js-status');

const expenses = [];

initApp(expenses);


buttonNode.addEventListener('click', function() {
    const expense = getExpensFromUser();

    if (!expense) {
        return;
    }

    trackExpens(expense);

    render(expenses);
});

function initApp(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses(expenses);
}

function trackExpens(expense) {
    expenses.push(expense);
}

function getExpensFromUser() {
    if (!inputNode.value) { 
        return null; 
    }

    const expense = parseInt (inputNode.value);

    clearInput();  

    return expense;
}

function clearInput () {
    inputNode.value = '';
}

function calculateExpanses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpanses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory(expenses) {
    let expensesListHTML = '';

    expenses.forEach(element => { 
        expensesListHTML +=`<li>${element} ${CURRENSY}</li>`;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
    sumNode.innerText = sum;
}

function renderStatus (sum) {
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASS_NAME);
    }
}