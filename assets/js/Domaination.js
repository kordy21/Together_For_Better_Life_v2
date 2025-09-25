document.addEventListener("DOMContentLoaded", function () {
  const openPopupBtn = document.getElementById("openPopupBtn");
  const formContainer = document.getElementById("formContainer");
  const overlay = document.getElementById("overlay");
  const form = document.getElementById("donationForm");
  const submitBtn = document.getElementById("submitBtn");

  const requiredFields = [
    document.getElementById("firstName"),
    document.getElementById("lastName"),
    document.getElementById("country"),
    document.getElementById("phoneNumberInput"),
    document.getElementById("email"),
  ];

  const paymentRadios = document.querySelectorAll("input[name='payment']");

  const counter = document.getElementById('counter');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');
  const valueSpan = document.querySelector('#counter + span');

  incrementBtn.classList.remove('hidden');
  decrementBtn.classList.remove('hidden');

  const lang = localStorage.getItem('lang') || 'ar';

  let donationAmount = parseInt(localStorage.getItem('donationAmount') || '50');
  // const donationType = localStorage.getItem('donationType') || (lang === 'ar' ? 'تبرع صدقة' : 'Sadaqah Donation');
  const donationType = lang === "ar" ? "تبرع الآن" : "Donate Now";


  if(lang === 'ar') {
    document.querySelector('.fs-3').innerText = donationType;
    counter.textContent = donationAmount;
    if(valueSpan) valueSpan.textContent = `القيمة ${donationAmount} جنيه`;
  } else {
    document.querySelector('.fs-3').innerText = donationType;
    counter.textContent = donationAmount;
    if(valueSpan) valueSpan.textContent = `Value ${donationAmount} EGP`;
  }

  const formTitle = document.querySelector('#form-container h1'); 
  if(formTitle) {
    if(lang === 'ar') {
      // formTitle.innerText = `التبرع من خلال الدفع الالكتروني (${donationType})`;
      formTitle.innerText = `التبرع من خلال الدفع الالكتروني `;
    } else {
      // formTitle.innerText = `Donation via Online Payment (${donationType})`;
      formTitle.innerText = `Donation via Online Payment `;
    }
  }

  incrementBtn.addEventListener('click', () => {
    donationAmount += 50;
    counter.textContent = donationAmount;
    if(valueSpan) valueSpan.textContent = lang === 'ar' ? `القيمة ${donationAmount} جنيه` : `Value ${donationAmount} EGP`;
    localStorage.setItem('donationAmount', donationAmount + ' جنيه');
  });

  decrementBtn.addEventListener('click', () => {
    if(donationAmount > 50){
      donationAmount -= 50;
      counter.textContent = donationAmount;
      if(valueSpan) valueSpan.textContent = lang === 'ar' ? `القيمة ${donationAmount} جنيه` : `Value ${donationAmount} EGP`;
      localStorage.setItem('donationAmount', donationAmount + ' جنيه');
    }
  });

  openPopupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.classList.remove("d-none");
    overlay.classList.remove("d-none");
  });

  overlay.addEventListener("click", function () {
    formContainer.classList.add("d-none");
    overlay.classList.add("d-none");
  });

  function validateForm() {
    const allFilled = requiredFields.every(
      (field) => field.value.trim() !== ""
    );
    const paymentSelected = [...paymentRadios].some((r) => r.checked);

    submitBtn.disabled = !(allFilled && paymentSelected);
    submitBtn.style.opacity = (allFilled && paymentSelected) ? "1" : "0.5";
  }

  requiredFields.forEach((field) =>
    field.addEventListener("input", validateForm)
  );
  paymentRadios.forEach((radio) =>
    radio.addEventListener("change", validateForm)
  );

  submitBtn.addEventListener("click", function (e) {
    const allFilled = requiredFields.every((f) => f.value.trim() !== "");
    const paymentSelected = [...paymentRadios].some((r) => r.checked);

    if (!allFilled || !paymentSelected) {
      e.preventDefault();
      alert(lang === 'ar' ? "برجاء املا جميع الحقول واختيار طريقة الدفع" : "Please fill all fields and select a payment method");
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const allFilled = requiredFields.every((f) => f.value.trim() !== "");
    const paymentSelected = [...paymentRadios].some((r) => r.checked);

    if (allFilled && paymentSelected) {
      alert(lang === 'ar' ? 
        `الفورم تمام ✅ القيمة: ${donationAmount} جنيه (${donationType})` :
        `Form is correct ✅ Value: ${donationAmount} EGP (${donationType})`
      );
    }
  });

  validateForm();
});
