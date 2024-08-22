// script.js

// Initialize sliders with input fields
function initializeSliders() {
    const sliders = [
        { sliderId: 'sip-amount-slider', inputId: 'sip-amount' },
        { sliderId: 'sip-duration-slider', inputId: 'sip-duration' },
        { sliderId: 'sip-return-slider', inputId: 'sip-return' },
        { sliderId: 'lumpsum-amount-slider', inputId: 'lumpsum-amount' },
        { sliderId: 'lumpsum-duration-slider', inputId: 'lumpsum-duration' },
        { sliderId: 'lumpsum-return-slider', inputId: 'lumpsum-return' },
        { sliderId: 'insurance-first-year-slider', inputId: 'insurance-first-year' },
        { sliderId: 'insurance-payment-slider', inputId: 'insurance-payment' },
        { sliderId: 'insurance-duration-slider', inputId: 'insurance-duration' },
        { sliderId: 'insurance-return-slider', inputId: 'insurance-return' },
    ];

    sliders.forEach(({ sliderId, inputId }) => {
        const slider = document.getElementById(sliderId);
        const input = document.getElementById(inputId);
        slider.addEventListener('input', () => {
            input.value = slider.value;
        });
        input.addEventListener('input', () => {
            slider.value = input.value;
        });
    });
}

// Switch between tabs
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => {
        if (tab.id === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(tabId)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Calculate SIP
function calculateSIP() {
    const amount = parseFloat(document.getElementById('sip-amount').value);
    const years = parseFloat(document.getElementById('sip-duration').value);
    const rate = parseFloat(document.getElementById('sip-return').value) / 100;

    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        alert('Please enter valid values.');
        return;
    }

    const months = years * 12;
    const monthlyRate = rate / 12;
    let futureValue = 0;

    for (let i = 0; i < months; i++) {
        futureValue = (futureValue + amount) * (1 + monthlyRate);
    }

    document.getElementById('sip-future-value').innerText = `Future Value: ₹${futureValue.toFixed(2)}`;
    drawDonutChart('sip-chart', amount * months, futureValue);
}

// Calculate Lumpsum
function calculateLumpsum() {
    const amount = parseFloat(document.getElementById('lumpsum-amount').value);
    const years = parseFloat(document.getElementById('lumpsum-duration').value);
    const rate = parseFloat(document.getElementById('lumpsum-return').value) / 100;

    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        alert('Please enter valid values.');
        return;
    }

    const futureValue = amount * Math.pow(1 + rate, years);
    document.getElementById('lumpsum-future-value').innerText = `Future Value: ₹${futureValue.toFixed(2)}`;
    drawDonutChart('lumpsum-chart', amount, futureValue);
}

// Calculate Insurance
function calculateInsurance() {
    const firstYearAmount = parseFloat(document.getElementById('insurance-first-year').value);
    const subsequentPayment = parseFloat(document.getElementById('insurance-payment').value);
    const years = parseFloat(document.getElementById('insurance-duration').value);
    const rate = parseFloat(document.getElementById('insurance-return').value) / 100;

    if (isNaN(firstYearAmount) || isNaN(subsequentPayment) || isNaN(years) || isNaN(rate)) {
        alert('Please enter valid values.');
        return;
    }

    const months = years * 12;
    const monthlyRate = rate / 12;
    let futureValue = 0;

    // First year contribution
    futureValue = (firstYearAmount) * Math.pow(1 + monthlyRate, months);
    
    // Subsequent years contribution
    for (let i = 12; i < months; i++) {
        futureValue = (futureValue + subsequentPayment) * (1 + monthlyRate);
    }

    document.getElementById('insurance-future-value').innerText = `Future Value: ₹${futureValue.toFixed(2)}`;
    drawDonutChart('insurance-chart', firstYearAmount + (subsequentPayment * (months - 12) / 12), futureValue);
}

// Draw Donut Chart
function drawDonutChart(canvasId, initialAmount, futureValue) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Initial Investment', 'Future Value'],
            datasets: [{
                data: [initialAmount, futureValue - initialAmount],
                backgroundColor: ['#ff6384', '#36a2eb'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ₹' + tooltipItem.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// Initialize sliders and default tab on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    openTab('sip');
});
