document.addEventListener('DOMContentLoaded', () => {
  const currencyButtons = document.querySelectorAll('.currency');
  const amountButtons = document.querySelectorAll('.amount');
  const customAmountInput = document.getElementById('custom-amount');
  const donorNameInput = document.getElementById('donor-name');
  const pledgeLink = document.querySelector('.cta-block a');
  const paymentInputs = document.querySelectorAll('input[name="payment"]');

  // Approximate display conversion only; donors should send the amount shown by their provider.
  const ugxPerUsd = 3600;
  let currentCurrency = 'USD';

  function updatePledgeLink() {
    if (!pledgeLink) return;

    const chosenButton = document.querySelector('.amount.selected');
    const enteredAmount = Number(customAmountInput?.value);
    const amount = enteredAmount > 0
      ? `${new Intl.NumberFormat('en-US').format(enteredAmount)} ${currentCurrency}`
      : chosenButton
        ? chosenButton.textContent.trim()
        : 'an amount of my choice';
    const donorName = donorNameInput?.value.trim() || 'Anonymous';
    const paymentMethod = document.querySelector('input[name="payment"]:checked')
      ?.nextElementSibling?.textContent.trim() || 'Airtel Money';
    const message = `Hello GECOD, I would like to pledge ${amount} for the Ayivu girls’ toilet project. Name: ${donorName}. Payment method: ${paymentMethod}. Please confirm how I can complete my gift and receive a receipt.`;
    pledgeLink.href = `https://wa.me/256787967919?text=${encodeURIComponent(message)}`;
  }

  currencyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currencyButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      currentCurrency = button.dataset.currency || 'USD';

      amountButtons.forEach((amountBtn) => {
        const usd = Number(amountBtn.dataset.amount);
        const value = currentCurrency === 'UGX' ? Math.round(usd * ugxPerUsd) : usd;
        amountBtn.textContent = currentCurrency === 'UGX'
          ? `${new Intl.NumberFormat('en-US').format(value)} UGX`
          : `$${usd}`;
      });
      updatePledgeLink();
    });
  });

  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      amountButtons.forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
      if (customAmountInput) customAmountInput.value = '';
      updatePledgeLink();
    });
  });

  customAmountInput?.addEventListener('input', () => {
    amountButtons.forEach((btn) => btn.classList.remove('selected'));
    updatePledgeLink();
  });

  donorNameInput?.addEventListener('input', updatePledgeLink);
  paymentInputs.forEach((input) => input.addEventListener('change', updatePledgeLink));
  updatePledgeLink();
});
