
const moneyInput = document.getElementById("moneyInput");
const realEstateInput = document.getElementById("realEstateInput");
const bondsInput = document.getElementById("bondsInput");
const profitsInput = document.getElementById("profitsInput");
const buildingsInput = document.getElementById("buildingsInput");


const moneyZakat = document.getElementById("moneyZakat");
const realEstateZakat = document.getElementById("realEstateZakat");
const buildingsZakat = document.getElementById("buildingsZakat");
const totalZakat = document.getElementById("totalZakat");


const counterEl = document.getElementById("counter");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");

let counter = 0;
const donationValue = 50;

function calculateZakat(value) {
  return value;
}

function updateZakat() {
  let money = parseFloat(moneyInput.value) || 0;
  let realEstate = parseFloat(realEstateInput.value) || 0;
  let bonds = parseFloat(bondsInput.value) || 0;
  let profits = parseFloat(profitsInput.value) || 0;
  let buildings = parseFloat(buildingsInput.value) || 0;

  let moneyVal = calculateZakat(money);
  let realEstateVal = calculateZakat(realEstate + bonds + profits);
  let buildingsVal = calculateZakat(buildings);

  moneyZakat.textContent = moneyVal.toFixed(2);
  realEstateZakat.textContent = realEstateVal.toFixed(2);
  buildingsZakat.textContent = buildingsVal.toFixed(2);

  let donationTotal = counter * donationValue;
  let total = moneyVal + realEstateVal + buildingsVal + donationTotal;
  totalZakat.textContent = total.toFixed(2);

  counterEl.textContent = donationTotal;
}


[moneyInput, realEstateInput, bondsInput, profitsInput, buildingsInput].forEach(
  (input) => {
    input.addEventListener("input", updateZakat);
  }
);


incrementBtn.addEventListener("click", () => {
  counter++;
  updateZakat();
});

decrementBtn.addEventListener("click", () => {
  if (counter > 0) {
    counter--;
    updateZakat();
  }
});
