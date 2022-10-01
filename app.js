(function() {
    const expenses = [];
    const incomes = [];
    let totalExpenses = 0;
    let totalIncomes = 0;

    function Income(source, value) {
        
        const getIncomeSource = () => source;
        const getIncomeValue = () => value;

        return {
            getIncomeSource,
            getIncomeValue    
        }
    }

    function Expense(source, value) {
        const getExpenseSource = () => source;
        const getExpenseValue = () => value;

        return {
            getExpenseSource,
            getExpenseValue
        }
    }



    function checkFieldsEmpty(incomeOrExpense) {
        const source = document.querySelector(`#${incomeOrExpense}-source`);
        const value = document.querySelector(`#${incomeOrExpense}-value`);

        if (!source.value.length || !value.value.length) { //If there's no length, it's empty
            return true;
        } else {
            return false;
        }
    }

    function addIncomesAndExpenses(incomeOrExpense) {
        switch (incomeOrExpense) {
            case 'income':
                if (checkFieldsEmpty(incomeOrExpense)) {
                    return '';
                } else { // create an object with income Informations and add them to array
                    const source = document.querySelector(`#${incomeOrExpense}-source`).value;
                    const value = document.querySelector(`#${incomeOrExpense}-value`).value;
                    const income = Income(source, value);
                    incomes.push(income);
                    totalIncomes += Number(income.getIncomeValue());
                    clearIncomes();
                    displayIncome();
                    console.log(showResult());
                }
                break;
            case 'expense':
                if (checkFieldsEmpty('expense')) {
                    return '';
                } else { // create an object with income Informations and add them to array
                    const source = document.querySelector(`#${incomeOrExpense}-source`).value;
                    const value = document.querySelector(`#${incomeOrExpense}-value`).value;
                    const expense = Expense(source, value);
                    expenses.push(expense);
                    totalExpenses += Number(expense.getExpenseValue());
                    clearExpenses();
                    displayExpense();
                    console.log(showResult())
                }
                break;

            default:
                break;    


        }
    }



    function displayIncome() {
        incomes.forEach((eachIncome, index) => {
            const incomesDiv = document.querySelector('.incomes');

            const incomeInformation = document.createElement('div');
            const incomeInfo = document.createElement('span');
            const value = document.createElement('span');
            const removeBtn = document.createElement('span');
            const removeIcon = document.createElement('i');
        
            incomeInformation.classList.add('income-information');
            incomeInfo.classList.add('income-info')
            value.classList.add('value');
            removeBtn.classList.add('remove-income-btn');
            removeIcon.classList.add('fa-solid', 'fa-trash')

            removeBtn.dataset.id = index;

            incomeInfo.innerText = eachIncome.getIncomeSource();
            value.innerText = `$${eachIncome.getIncomeValue()}`;

            incomesDiv.append(incomeInformation);
            incomeInformation.append(incomeInfo);
            incomeInformation.append(value);
            incomeInformation.append(removeBtn);
            removeBtn.append(removeIcon);
        });
        removeIncome();
    }

    function displayExpense() {
        expenses.forEach((eachExpense, index) => {
            const expensesDiv = document.querySelector('.expenses');

            const expenseInformation = document.createElement('div');
            const expenseInfo = document.createElement('span');
            const value = document.createElement('span');
            const removeBtn = document.createElement('span');
            const removeIcon = document.createElement('i');
        
            expenseInformation.classList.add('expense-information');
            expenseInfo.classList.add('expense-info')
            value.classList.add('value');
            removeBtn.classList.add('remove-expense-btn');
            removeIcon.classList.add('fa-solid', 'fa-trash');

            removeBtn.dataset.id = index;

            expenseInfo.innerText = eachExpense.getExpenseSource();
            value.innerText = `$${eachExpense.getExpenseValue()}`;

            expensesDiv.append(expenseInformation);
            expenseInformation.append(expenseInfo);
            expenseInformation.append(value);
            expenseInformation.append(removeBtn);
            removeBtn.append(removeIcon);
        });
        removeExpense();
    }

    function removeIncome() {
        const removeIncomeBtn = document.querySelectorAll('.remove-income-btn');
        removeIncomeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                incomes.splice(btn.dataset.id, 1);
                clearIncomes();
                displayIncome();
            });
        });
    }
    function removeExpense() {
        const removeExpenseBtn = document.querySelectorAll('.remove-expense-btn');
        removeExpenseBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                expenses.splice(btn.dataset.id, 1);
                clearExpenses();
                displayExpense();
            });
        });
    }


    function addIncomes() {
        const addIncomeBtn = document.querySelector('#add-income');

        addIncomeBtn.addEventListener('click', () => {
            addIncomesAndExpenses('income');

        });
    }

    function addExpenses() {
        const addExpenseBtn = document.querySelector('#add-expense');

        addExpenseBtn.addEventListener('click', function() {
            addIncomesAndExpenses('expense');
        });
    }

    function clearIncomes() {
        const incomeDiv = document.querySelectorAll('.income-information');
        if (incomeDiv) {
            incomeDiv.forEach(eachDiv => {
                eachDiv.remove();
            })
        } else {
            alert('NO DIVS');
        }
    }

    function clearExpenses() {
        const expenseDiv = document.querySelectorAll('.expense-information');
        if (expenseDiv) {
            expenseDiv.forEach(eachDiv => {
                eachDiv.remove();
            })
        } else {
            alert('NO DIVS');
        }
    }

    function clearResult() {
        const text = document.querySelector('.result p');
        if (text) text.remove();
    }

    function showResult() {
        const resultDiv = document.querySelector('.result');
        clearResult();
        if (totalExpenses === 0) {
        
            resultDiv.innerText = `You have no debt`;

        } else {
            resultDiv.innerText = `You have $${Number(totalIncomes) - Number(totalExpenses)} --- And your expenses are ${Number(totalExpenses)}`;
        }
    }


    function start() {
        addIncomes();
        addExpenses();
    }

    start();

})();