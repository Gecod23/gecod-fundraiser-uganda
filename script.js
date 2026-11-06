document.addEventListener('DOMContentLoaded', () => {
  const currencyButtons = document.querySelectorAll('.currency');
  const amountButtons = document.querySelectorAll('.amount');
  const customAmountInput = document.getElementById('custom-amount');

  currencyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currencyButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const currentCurrency = button.dataset.currency;
      amountButtons.forEach((amountBtn) => {
        const raw = Number(amountBtn.dataset.amount);
        const value = currentCurrency === 'UGX' ? raw * 3600 : raw;
        amountBtn.textContent = currentCurrency === 'UGX' ? `${new Intl.NumberFormat('en-US').format(value)} UGX` : `$${raw}`;
      });
    });
  });

  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      amountButtons.forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
      customAmountInput.value = '';
    });
  });

  customAmountInput.addEventListener('input', () => {
    amountButtons.forEach((btn) => btn.classList.remove('selected'));
  });
});
