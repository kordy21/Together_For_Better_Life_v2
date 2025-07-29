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
