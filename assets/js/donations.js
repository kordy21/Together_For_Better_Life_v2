 document.querySelectorAll('.donate-type-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.donate-type-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    // تفعيل اختيار مبلغ التبرع
    document.querySelectorAll('.donate-amount-option').forEach(amount => {
      amount.addEventListener('click', () => {
        document.querySelectorAll('.donate-amount-option').forEach(a => a.classList.remove('active'));
        amount.classList.add('active');
      });
    });