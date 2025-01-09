//common field sellection
const incomeAndExpenses = document.getElementById("incomeAndExpenses");
const income = document.getElementById("income");
const savingForm = document.getElementById("savingForm");
const save = document.getElementById("save");
const saveErr = document.getElementById("saveErr");
const balance = document.getElementById("balance");
const totalExpenses = document.getElementById("totalExpenses");

// common function for validate the input field for all form
function validate(inputId, inputValue) {
  const id = inputId;
  const value = inputValue;
  const errId = id + "Err";
  const selectErrorSpan = document.getElementById(errId);
  if (value.length == 0) {
    selectErrorSpan.innerText = toCapitalize(id) + " field is required";
  } else if (isNaN(value)) {
    selectErrorSpan.innerText = toCapitalize(id) + " field must be a number";
  } else if (parseFloat(value) < 0) {
    selectErrorSpan.innerText =
      toCapitalize(id) + " field should be a positive number";
  } else {
    selectErrorSpan.innerText = "";
    return true;
  }
}

// keyup validation for the first form
incomeAndExpenses.addEventListener("keyup", function (e) {
  try {
    validate(e.target.id, e.target.value);
  } catch {}
});

// function to convert the input field id to capitalize
function toCapitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

// first form submission
incomeAndExpenses.addEventListener("submit", function (e) {
  e.preventDefault();
  const incomeValue = income.value;
  const validIncomeField = validate("income", incomeValue);

  const food = document.getElementById("food");
  const foodValue = food.value;
  const validFoodField = validate("food", foodValue);

  const rent = document.getElementById("rent");
  const rentValue = rent.value;
  const validRentField = validate("rent", rentValue);

  const clothes = document.getElementById("clothes");
  const clothesValue = clothes.value;
  const validClothesField = validate("clothes", clothesValue);

  if (
    validIncomeField == true &&
    validFoodField == true &&
    validRentField == true &&
    validClothesField == true
  ) {
    const allExpenses =
      parseFloat(foodValue) + parseFloat(rentValue) + parseFloat(clothesValue);
    const balanceValue = parseFloat(incomeValue) - allExpenses;
    if (balanceValue < 0) {
      totalExpenses.className = "text-red-700 text-xs font-thin block";
      balance.className = "text-red-700 text-xs font-thin block";
      totalExpenses.innerText = "Total expense is bigger than the income";
      balance.innerText = "Balance should not be negative";
    } else {
      totalExpenses.className = "";
      balance.className = "";
      totalExpenses.innerText = allExpenses;
      balance.innerText = balanceValue;
      saveErr.innerText = "";
    }
  }
});

// 2nd form keyup validation
savingForm.addEventListener("keyup", function (e) {
  validate(e.target.id, e.target.value);
});

// 2nd form submit
savingForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const incomeValue = income.value;
  const balanceValue = parseFloat(balance.innerText);
  const checkIncomeValue = validate("income", incomeValue);
  if (checkIncomeValue == true && !isNaN(balanceValue)) {
    const saveValue = save.value;
    const checkSaveValue = validate("save", saveValue);
    if (checkSaveValue == true) {
      const savingAmount = document.getElementById("savingAmount");
      const remainingBalance = document.getElementById("remainingBalance");
      const balance = document.getElementById("balance").innerText;
      const totalSaving =
        (parseFloat(saveValue) * parseFloat(incomeValue)) / 100;
      if (!isNaN(balance)) {
        const totalRemaining = parseFloat(balance) - totalSaving;
        if (totalRemaining < 0) {
          savingAmount.className = "text-red-700 text-xs font-thin block";
          remainingBalance.className = "text-red-700 text-xs font-thin block";
          savingAmount.innerText = "Total savings is bigger than the balance";
          remainingBalance.innerText = "Balance should not be negative";
        } else {
          savingAmount.className = "";
          remainingBalance.className = "";
          savingAmount.innerText = totalSaving;
          remainingBalance.innerText = totalRemaining;
        }
      } else {
        savingAmount.className = "text-red-700 text-xs font-thin block";
        remainingBalance.className = "text-red-700 text-xs font-thin block";
        savingAmount.innerText = "Total Balane Problem";
        remainingBalance.innerText = "Total Balane Problem";
      }
    }
  } else {
    saveErr.innerText = "Please compare the total income and expences first";
  }
});
