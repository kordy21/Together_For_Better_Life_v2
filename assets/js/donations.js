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
