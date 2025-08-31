let number = 0;
let sum = 0;
let customAmount = 0;

const addToCartBtn = document.getElementById("addToCartBtn");

function checkEnableAddToCart() {
    console.log(number, customAmount);

  // if (number > 0 || customAmount > 0) {
  //   addToCartBtn.disabled = false;
  // } else {
  //   addToCartBtn.disabled = true;
  // }
}

const popupMessage = document.getElementById("popupMessage");

addToCartBtn.addEventListener("click", function (e) {
  console.log(number, customAmount);

  if (number === 0 && customAmount === 0) {
    e.preventDefault();

    // عرض البوب
    popupMessage.style.display = "block";

    // اخفاء البوب بعد ثانيتين
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
const popup = document.getElementById("popupMessage");
const overlay = document.getElementById("overlayPopup");
const closeBtn = document.getElementById("closePopup");

function showPopup() {
  overlay.style.display = "block";
  popup.style.display = "block";
}

function hidePopup() {
  overlay.style.display = "none";
  popup.style.display = "none";
}

closeBtn.addEventListener("click", hidePopup);
overlay.addEventListener("click", hidePopup);





function increment() {
  number++;
  document.getElementById("counter").textContent = number;
  sum = 600 * number + customAmount;
  showSum();
  checkEnableAddToCart();
}

function decrement() {
  if (number > 0) {
    number--;
    document.getElementById("counter").textContent = number;
    sum = 600 * number + customAmount;
    showSum();
  }
  checkEnableAddToCart();
}

function showSum() {
  document.getElementById("sum").textContent = sum;
}

window.onload = function () {
  showSum();
  checkEnableAddToCart();
};

function showShares() {
  const sharesDiv = document.getElementById("sharesDiv");
  sharesDiv.style.display =
    sharesDiv.style.display === "block" ? "none" : "block";
}

const anotherMoneyBtn = document.getElementById("AnotherMoney");
const customAmountDiv = document.getElementById("customAmountDiv");
const saveCustomAmountBtn = document.getElementById("saveCustomAmount");
const customAmountInput = document.getElementById("customAmountInput");

anotherMoneyBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  customAmountDiv.style.display =
    customAmountDiv.style.display === "block" ? "none" : "block";
});

// لما يكتب أي مبلغ في الانبت يتفعل الزر
customAmountInput.addEventListener("input", (e) => {
  const amount = parseInt(e.target.value);
  if (amount && amount > 0) {
    customAmount = amount;
    sum = customAmount + number * 600;
    showSum();
    checkEnableAddToCart();
  } else {
    customAmount = 0;
    sum = number * 600;
    showSum();
    checkEnableAddToCart();
  }
});

saveCustomAmountBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const amount = parseInt(customAmountInput.value);
  if (amount && amount > 0) {
    customAmount = amount;
    document.getElementById("displayCustomAmount")?.remove();

    const span = document.createElement("span");
    span.id = "displayCustomAmount";
    span.textContent = customAmount;
    customAmountDiv.appendChild(span);

    sum = customAmount + number * 600;
    showSum();
    checkEnableAddToCart();
  }
});

document.addEventListener("click", (e) => {
  if (!customAmountDiv.contains(e.target) && e.target !== anotherMoneyBtn) {
    customAmountDiv.style.display = "none";
  }
});

customAmountDiv.addEventListener("click", (e) => {
  e.stopPropagation();
});
