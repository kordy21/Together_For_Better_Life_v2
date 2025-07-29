document.addEventListener('DOMContentLoaded', function() {
    // JavaScript for donation counter (from your original code)
    let number = 0;
    let sum = 0; // Changed initial sum to 0
    const counterElement = document.getElementById('counter');
    const incrementBtn = document.getElementById('incrementBtn'); // Added ID for clarity
    const decrementBtn = document.getElementById('decrementBtn'); // Added ID for clarity

    function increment() {
        number++;
        counterElement.textContent = number;
        sum = 50 * number;
        // If you want to show sum, make sure you have an element with ID 'sum'
        // For example: document.getElementById('sumDisplay').textContent = sum;
    }

    function decrement() {
        if (number > 0) { // Prevent negative numbers
            number--;
        }
        counterElement.textContent = number;
        sum = 50 * number;
    }

    // Bind counter functions to buttons
    if (incrementBtn) incrementBtn.addEventListener('click', increment);
    if (decrementBtn) decrementBtn.addEventListener('click', decrement);

    // JavaScript for Popup
    const openPopupBtn = document.getElementById('openPopupBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');
    const donationPopup = document.getElementById('formContainer'); 
    const overlay = document.getElementById('overlay'); 

    function openPopup() {
        donationPopup.classList.remove('d-none'); 
        donationPopup.classList.add('d-block'); 
        donationPopup.classList.remove('zakat-calc-hidden-popup'); 
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    }

    function closePopup() {
        donationPopup.classList.add('zakat-calc-hidden-popup'); 
        overlay.style.display = 'none';

        donationPopup.addEventListener('animationend', function handler() {
            donationPopup.classList.remove('d-block', 'zakat-calc-hidden-popup'); 
            donationPopup.classList.add('d-none'); 
            document.body.style.overflow = 'auto'; 
            donationPopup.removeEventListener('animationend', handler); 
        });
    }

    if (openPopupBtn) openPopupBtn.addEventListener('click', openPopup);
    if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
    if (overlay) overlay.addEventListener('click', closePopup);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !donationPopup.classList.contains('d-none')) {
            closePopup();
        }
    });

    // Zakat Calculation Logic
    const moneyInput = document.querySelector('.form label:nth-of-type(1) + input');
    const realEstateSharesInput = document.querySelector('.form.mt-5 .input-group input');
    const bondsInput = document.querySelector('.form.mt-5 .d-flex:nth-of-type(2) input');
    const realEstateProfitsInput = document.querySelector('.form.mt-5 .d-flex:nth-of-type(3) input');
    const buildingRentInput = document.querySelector('.form.mt-5:last-of-type input');

    function updateZakatValues() {
        let money = parseFloat(moneyInput ? moneyInput.value : 0) || 0;
        let realEstateShares = parseFloat(realEstateSharesInput ? realEstateSharesInput.value : 0) || 0;
        let bonds = parseFloat(bondsInput ? bondsInput.value : 0) || 0;
        let realEstateProfits = parseFloat(realEstateProfitsInput ? realEstateProfitsInput.value : 0) || 0;
        let buildingRent = parseFloat(buildingRentInput ? buildingRentInput.value : 0) || 0;

        const zakatRate = 0.025; 

        let zakatOnMoney = money * zakatRate;
        let zakatOnRealEstate = (realEstateShares + bonds + realEstateProfits) * zakatRate; 
        let zakatOnBuildings = buildingRent * zakatRate; 

        document.getElementById('moneyZakat').textContent = zakatOnMoney.toFixed(2);
        document.getElementById('realEstateZakat').textContent = zakatOnRealEstate.toFixed(2);
        document.getElementById('buildingsZakat').textContent = zakatOnBuildings.toFixed(2);
        document.getElementById('totalZakat').textContent = (zakatOnMoney + zakatOnRealEstate + zakatOnBuildings).toFixed(2);
    }

    if (moneyInput) moneyInput.addEventListener('input', updateZakatValues);
    if (realEstateSharesInput) realEstateSharesInput.addEventListener('input', updateZakatValues);
    if (bondsInput) bondsInput.addEventListener('input', updateZakatValues);
    if (realEstateProfitsInput) realEstateProfitsInput.addEventListener('input', updateZakatValues);
    if (buildingRentInput) buildingRentInput.addEventListener('input', updateZakatValues);

    updateZakatValues();
});
