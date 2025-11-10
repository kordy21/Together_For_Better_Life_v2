let number = 0;
let sum = 0;
let customAmount = 0;
let shareAmount = 0; 

let currentLang = document.documentElement.lang || "ar";

const addToCartBtn = document.getElementById("addToCartBtn");
const popupMessage = document.getElementById("popupMessage");
const overlay = document.getElementById("overlayPopup");
const closeBtn = document.getElementById("closePopup");

const anotherMoneyBtn = document.getElementById("AnotherMoney");
const customAmountDiv = document.getElementById("customAmountDiv");
const saveCustomAmountBtn = document.getElementById("saveCustomAmount");
const customAmountInput = document.getElementById("customAmountInput");

const agmalyBtn = document.getElementById("AGMALY");

function showShares(event) {
  const sharesDiv = document.getElementById("sharesDiv");
  if (event && event.target && event.target.dataset.amount) {
    shareAmount = parseInt(event.target.dataset.amount) || 0;
  }
  sharesDiv.style.display =
    sharesDiv.style.display === "block" ? "none" : "block";

  sum = number * shareAmount + customAmount;
  showSum();
  checkEnableAddToCart();
}

// زيادة
function increment() {
  number++;
  document.getElementById("counter").textContent = number;
  sum = shareAmount * number + customAmount;
  showSum();
  checkEnableAddToCart();
}

function decrement() {
  if (number > 0) {
    number--;
    document.getElementById("counter").textContent = number;
    sum = shareAmount * number + customAmount;
    showSum();
  }
  checkEnableAddToCart();
}

function checkEnableAddToCart() {
  if (addToCartBtn)
    addToCartBtn.disabled = !(number > 0 || customAmount > 0 || sum > 0);
}

addToCartBtn?.addEventListener("click", function (e) {
  if (sum === 0) {
    e.preventDefault();
    popupMessage.style.display = "block";
    setTimeout(() => {
      popupMessage.style.display = "none";
    }, 2000);
  } else {
    console.log("تمت الإضافة للسلة:", sum);
    new bootstrap.Offcanvas(
      document.getElementById("offcanvasDonationCart")
    ).show();
  }
});

function showSum() {
  document.getElementById("sum").textContent = sum;
}

anotherMoneyBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const amount = parseInt(anotherMoneyBtn.dataset.amount) || 0;
  customAmount = amount;
  sum = customAmount + number * shareAmount;
  showSum();
  checkEnableAddToCart();

  customAmountDiv.style.display =
    customAmountDiv.style.display === "block" ? "none" : "block";
});

agmalyBtn?.addEventListener("click", () => {
  number = 0;
  shareAmount = 0;
  customAmount = 0;

  document.getElementById("counter").textContent = number;

  sum = parseInt(agmalyBtn.dataset.amount) || 0;

  showSum();
  checkEnableAddToCart();

  customAmountDiv.style.display = "none";
});

customAmountInput?.addEventListener("input", (e) => {
  const amount = parseInt(e.target.value);
  customAmount = amount && amount > 0 ? amount : 0;
  sum = customAmount + number * shareAmount;
  showSum();
  checkEnableAddToCart();
});

saveCustomAmountBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  const amount = parseInt(customAmountInput.value);
  if (amount && amount > 0) {
    customAmount = amount;
    document.getElementById("displayCustomAmount")?.remove();

    const span = document.createElement("span");
    span.id = "displayCustomAmount";
    span.textContent = customAmount;
    customAmountDiv.appendChild(span);

    sum = customAmount + number * shareAmount;
    showSum();
    checkEnableAddToCart();
  }
});

document.addEventListener("click", (e) => {
  if (
    customAmountDiv &&
    !customAmountDiv.contains(e.target) &&
    e.target !== anotherMoneyBtn
  ) {
    customAmountDiv.style.display = "none";
  }
});

customAmountDiv?.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.onload = function () {
  showSum();
  checkEnableAddToCart();
};
