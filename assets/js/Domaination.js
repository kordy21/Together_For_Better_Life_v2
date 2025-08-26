document.addEventListener("DOMContentLoaded", function () {
  const openPopupBtn = document.getElementById("openPopupBtn");
  const formContainer = document.getElementById("formContainer");
  const overlay = document.getElementById("overlay");
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

  // فتح البوب اب
  openPopupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    formContainer.classList.remove("d-none");
    overlay.classList.remove("d-none");
  });

  // إغلاق البوب اب عند الضغط على الـ overlay
  overlay.addEventListener("click", function () {
    formContainer.classList.add("d-none");
    overlay.classList.add("d-none");
  });

  // دالة التحقق من اكتمال الفورم
  function validateForm() {
    const allFilled = requiredFields.every(
      (field) => field.value.trim() !== ""
    );
    const paymentSelected = [...paymentRadios].some((r) => r.checked);

    if (allFilled && paymentSelected) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    } else {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.5";
    }
  }

  // ربط أحداث الإدخال مع التحقق
  requiredFields.forEach((field) =>
    field.addEventListener("input", validateForm)
  );
  paymentRadios.forEach((radio) =>
    radio.addEventListener("change", validateForm)
  );

  // الضغط على الزر
  submitBtn.addEventListener("click", function (e) {
    const allFilled = requiredFields.every((f) => f.value.trim() !== "");
    const paymentSelected = [...paymentRadios].some((r) => r.checked);

    if (!allFilled || !paymentSelected) {
      e.preventDefault();
      alert("برجاء املا جميع الحقول واختيار طريقة الدفع");
    }
  });

  // عند إرسال الفورم
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const allFilled = requiredFields.every((f) => f.value.trim() !== "");
    const paymentSelected = [...paymentRadios].some((r) => r.checked);

    if (allFilled && paymentSelected) {
      alert("الفورم تمام ✅ هيبدأ عملية الدفع");
      // هنا يمكنك إضافة كود الدفع الفعلي
    }
  });

  validateForm(); // تحقق أولي عند التحميل
});
