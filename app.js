(function() {
    const expenses = [];
    const incomes = [];

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
                    clearIncomes();
                    display(incomeOrExpense);
                    console.log('It is Baby Income ', incomes);
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
                    console.log('It is Baby Expense ', expenses);
                }
                break;

            default:
                break;    


        }
    }



    function display(incomeOrExpenses) {
        switch (incomeOrExpenses) {
            case 'income':
                incomes.forEach((eachIncome, index) => {
                    const incomesDiv = document.querySelector('.incomes');

                    const incomeInformation = document.createElement('div');
                    const incomeInfo = document.createElement('span');
                    const value = document.createElement('span');
                    const removeBtn = document.createElement('span');
                
                    incomeInformation.classList.add('income-information');
                    incomeInfo.classList.add('income-info')
                    value.classList.add('value');
                    removeBtn.classList.add('fa-solid', 'fa-trash', 'remove-income-btn');

                    removeBtn.dataset.id = index;

                    incomeInfo.innerText = eachIncome.getIncomeSource();
                    value.innerText = `$${eachIncome.getIncomeValue()}`;

                    incomesDiv.append(incomeInformation);
                    incomeInformation.append(incomeInfo);
                    incomeInformation.append(value);
                    incomeInformation.append(removeBtn);
                });
                break;
        }
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




    function start() {
        addIncomes();
        addExpenses();
    }

    start();

})();