const bill = document.querySelector("#bill");
const people = document.querySelector("#people");
const tipPercent = document.querySelectorAll(".grid-item");
const billInputForm = document.querySelector(".billInputForm");
const peopleInputForm = document.querySelector(".peopleInputForm");
const outputSum = document.querySelectorAll(".outputSum");
const outputBill = document.querySelector(".outputBill");
const outputPercent = document.querySelector(".outputPercent");
const resetButton = document.querySelector(".resetButton");
const customTip = document.querySelector(".custom-tip");

tipPercent.forEach((e, i, arr) =>
  e.addEventListener("click", () => {
    arr.forEach((target) => target.classList.remove("selected-tip"));
    if (e.classList.contains("custom-tip")) return;
    e.classList.add("selected-tip");
  })
);

let billValue;
let peopleValue;
let percent;
let tipPerPerson;
let totalSumPerPerson;

document.addEventListener("DOMContentLoaded", reset);
billInputForm.addEventListener("input", getValue);
peopleInputForm.addEventListener("input", getValue);
customTip.addEventListener("input", getValuePercent);
tipPercent.forEach((e) => e.addEventListener("click", getValuePercent));
resetButton.addEventListener("click", reset);

function getValue() {
  billValue = Number(bill.value);
  peopleValue = Number(people.value);
  calculate();
}
function getValuePercent() {
  percent = parseFloat(this.innerText) / 100 || parseFloat(this.value) / 100;
  calculate();
}
function calculate() {
  tipPerPerson = (billValue * percent) / peopleValue;
  totalSumPerPerson = (billValue * percent + billValue) / peopleValue;
  validation();
}
function validation() {
  if (isNaN(tipPerPerson) && isNaN(totalSumPerPerson)) return;
  if (peopleValue == 0) return;
  insertValue();
}
function insertValue() {
  outputPercent.innerText = tipPerPerson.toFixed(2);
  outputBill.innerText = totalSumPerPerson.toFixed(2);
}

function reset() {
  outputPercent.innerText = "0.00";
  outputBill.innerText = "0.00";
  bill.closest("form").reset();
  people.closest("form").reset();
  tipPercent.forEach((e) => {
    e.classList.remove("selected-tip");
    e.value = "";
  });
}
