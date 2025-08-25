const overlay = document.getElementById("overlay");
overlay.addEventListener("click", function () {
  formContainer.classList.add("d-none");
  overlay.classList.add("d-none");
});
document.addEventListener("DOMContentLoaded", function () {
  const openPopupBtn = document.getElementById("openPopupBtn");
  const formContainer = document.getElementById("formContainer");
  const formContainerr = document.getElementById("form-container");
  const overlay = document.getElementById("overlay");

  openPopupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.classList.remove("d-none");
    formContainer.style.display = "block";
    overlay.classList.remove("d-none");
  });

  overlay.addEventListener("click", function () {
    formContainer.classList.add("d-none");
    overlay.classList.add("d-none");
  });
});
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donationForm");
    const submitBtn = document.getElementById("submitBtn");

    // الحقول المطلوبة
    const requiredFields = [
      document.getElementById("firstName"),
      document.getElementById("lastName"),
      document.getElementById("country"),
      document.getElementById("phoneNumberInput"),
      document.getElementById("email"),
    ];

    const paymentRadios = document.querySelectorAll("input[name='payment']");

    function validateForm() {
      let allFilled = true;

      // شيك على الحقول
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          allFilled = false;
        }
      });

      // شيك على اختيار الدفع
      let paymentSelected = false;
      paymentRadios.forEach((radio) => {
        if (radio.checked) paymentSelected = true;
      });

      // لو كله تمام فعل الزرار
      if (allFilled && paymentSelected) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    }

    // اربط الأحداث
    requiredFields.forEach((field) => {
      field.addEventListener("input", validateForm);
    });

    paymentRadios.forEach((radio) => {
      radio.addEventListener("change", validateForm);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!submitBtn.disabled) {
        alert("الفورم تمام ✅ هيبدأ عملية الدفع");
      }
    });
  });