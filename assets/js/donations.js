 document.querySelectorAll('.donate-type-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.donate-type-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    document.querySelectorAll('.donate-amount-option').forEach(amount => {
      amount.addEventListener('click', () => {
        document.querySelectorAll('.donate-amount-option').forEach(a => a.classList.remove('active'));
        amount.classList.add('active');
      });
    });
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("other-amount-btn");
  const inputDiv = document.getElementById("other-amount-input");

  btn.addEventListener("click", function (e) {
    inputDiv.classList.remove("d-none");
    e.stopPropagation(); 
  });


  inputDiv.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    inputDiv.classList.add("d-none");
  });
});
      const donateTypeCards = document.querySelectorAll('.donate-type-card1');
      const donateAmountOptions = document.querySelectorAll('.donate-amount-option');
      const continueBtn = document.getElementById('continueDonation');
      const otherBtn = document.getElementById('other-amount-btn');
      const otherInputDiv = document.getElementById('other-amount-input');
      const otherInput = otherInputDiv.querySelector('input');

      let selectedType = null;
      let selectedAmount = null;

      donateTypeCards.forEach(card => {
        card.addEventListener('click', () => {
          donateTypeCards.forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          selectedType = card.querySelector('p').innerText;
          checkSelection();
        });
      });

      donateAmountOptions.forEach(option => {
        option.addEventListener('click', () => {
          donateAmountOptions.forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');
          if(option === otherBtn) {
            otherInputDiv.style.display = 'block';
            selectedAmount = otherInput.value || null;
          } else {
            otherInputDiv.style.display = 'none';
            selectedAmount = option.innerText;
          }
          checkSelection();
        });
      });

      otherInput.addEventListener('input', () => {
        selectedAmount = otherInput.value || null;
        checkSelection();
      });

      otherBtn.addEventListener('click', () => {
        otherInputDiv.classList.toggle('d-none');
        otherInput.focus();
      });

      function checkSelection() {
        if(selectedType && selectedAmount && selectedAmount !== '') {
          continueBtn.classList.remove('disabled-link');
          continueBtn.href = 'complete-donation.html';
        } else {
          continueBtn.classList.add('disabled-link');
          continueBtn.href = '#';
        }
      }
function checkSelection() {
  if(selectedType && selectedAmount && selectedAmount !== '') {
    localStorage.setItem('donationType', selectedType);
    localStorage.setItem('donationAmount', selectedAmount);

    continueBtn.classList.remove('disabled-link');
    continueBtn.href = 'complete-donation.html';
  } else {
    continueBtn.classList.add('disabled-link');
    continueBtn.href = '#';
  }
}
donateTypeCards.forEach(card => {
  card.addEventListener('click', () => {
    donateTypeCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedType = card.querySelector('p').innerText;

    localStorage.setItem('donationType', selectedType);

    checkSelection();
  });
});

donateAmountOptions.forEach(option => {
  option.addEventListener('click', () => {
    donateAmountOptions.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    if(option === otherBtn) {
      otherInputDiv.style.display = 'block';
      selectedAmount = otherInput.value || null;
    } else {
      otherInputDiv.style.display = 'none';
      selectedAmount = option.innerText;
    }

    localStorage.setItem('donationAmount', selectedAmount);

    checkSelection();
  });
});

otherInput.addEventListener('input', () => {
  selectedAmount = otherInput.value || null;
  localStorage.setItem('donationAmount', selectedAmount);
  checkSelection();
});

document.addEventListener("DOMContentLoaded", function () {
  const continueBtn = document.getElementById("continueDonation");
  const otherAmountInput = document.querySelector("#other-amount-input input");
  const amountOptions = document.querySelectorAll(
    ".donate-amount-option:not(#other-amount-btn)"
  );
  const overlay = document.getElementById("overlayPopup");
  const popup = document.getElementById("popupMessage");
  const closePopup = document.getElementById("closePopup");

  function showPopup() {
    overlay.style.display = "block";
    popup.style.display = "block";
  }

  function hidePopup() {
    overlay.style.display = "none";
    popup.style.display = "none";
  }

  closePopup.addEventListener("click", hidePopup);
  overlay.addEventListener("click", hidePopup);

  continueBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let selected = false;

    amountOptions.forEach((option) => {
      if (option.classList.contains("active")) selected = true;
    });

    if (otherAmountInput.value && otherAmountInput.value.trim() !== "")
      selected = true;

    if (!selected) {
      showPopup();
    } else {
      console.log("Proceed to next step");
    }
  });

  amountOptions.forEach((option) => {
    option.addEventListener("click", function () {
      amountOptions.forEach((o) => o.classList.remove("active"));
      otherAmountInput.value = "";
      this.classList.add("active");
    });
  });

  document
    .getElementById("other-amount-btn")
    .addEventListener("click", function () {
      amountOptions.forEach((o) => o.classList.remove("active"));
    });
});
continueBtn.addEventListener("click", function (e) {
  e.preventDefault(); 

  if (selectedType && selectedAmount && selectedAmount !== "") {
    window.location.href = "complete-donation.html";
  } else {
    document.getElementById("overlayPopup").style.display = "block";
    document.getElementById("popupMessage").style.display = "block";
  }
});
