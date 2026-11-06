document.addEventListener('DOMContentLoaded', () => {
  const currencyButtons = document.querySelectorAll('.currency');
  const amountButtons = document.querySelectorAll('.amount');
  const customAmountInput = document.getElementById('custom-amount');
  const donorNameInput = document.getElementById('donor-name');
  const pledgeLink = document.querySelector('.pledge-link');
  const paymentInputs = document.querySelectorAll('input[name="payment"]');
  const paymentDetails = document.getElementById('payment-details');

  // Display-only estimate. Confirm the current exchange rate before sending UGX.
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
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'Airtel Money';
    const message = `Hello GECOD, I would like to pledge ${amount} for the Ayivu girls’ toilet project. Name: ${donorName}. Payment method: ${paymentMethod}. Please confirm how I can complete my gift and receive a receipt.`;
    pledgeLink.href = `https://wa.me/256787967919?text=${encodeURIComponent(message)}`;
  }

  function updatePaymentDetails() {
    if (!paymentDetails) return;
    const selected = document.querySelector('input[name="payment"]:checked')?.value;
    if (selected === 'Bank transfer') {
      paymentDetails.innerHTML = '<h3>Bank transfer</h3><p>For bank account details, message GECOD on WhatsApp. Please confirm the account name and details directly with GECOD before transferring.</p>';
    } else {
      paymentDetails.innerHTML = '<h3>Airtel Money</h3><p><strong>Number:</strong> <a href="tel:+256755121204">0755 121204</a></p><p><strong>Registered name:</strong> Hakim James, Executive Director, Girls’ Empowerment For Community Development</p>';
    }
  }

  currencyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currencyButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      currentCurrency = button.dataset.currency || 'USD';
      amountButtons.forEach((amountButton) => {
        const usd = Number(amountButton.dataset.amount);
        const value = currentCurrency === 'UGX' ? Math.round(usd * ugxPerUsd) : usd;
        amountButton.textContent = currentCurrency === 'UGX'
          ? `${new Intl.NumberFormat('en-US').format(value)} UGX`
          : `$${usd}`;
      });
      updatePledgeLink();
    });
  });

  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      amountButtons.forEach((amountButton) => amountButton.classList.remove('selected'));
      button.classList.add('selected');
      if (customAmountInput) customAmountInput.value = '';
      updatePledgeLink();
    });
  });

  customAmountInput?.addEventListener('input', () => {
    amountButtons.forEach((button) => button.classList.remove('selected'));
    updatePledgeLink();
  });
  donorNameInput?.addEventListener('input', updatePledgeLink);
  paymentInputs.forEach((input) => input.addEventListener('change', () => {
    updatePaymentDetails();
    updatePledgeLink();
  }));

  updatePaymentDetails();
  updatePledgeLink();
});
