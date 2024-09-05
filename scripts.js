// Helper function to format numbers with commas
function formatNumber(num) {
    return num.toLocaleString();
}

// Function to show and hide sections based on button clicks
function showSection(sectionId) {
    const sections = document.querySelectorAll('.calculator-section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// SIP Calculator
function calculateSIP() {
    const monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    const annualReturn = parseFloat(document.getElementById('annualReturnSIP').value) / 100;
    const years = parseInt(document.getElementById('yearsSIP').value);

    const months = years * 12;
    const rate = annualReturn / 12;
    const futureValue = monthlyInvestment * (((1 + rate) ** months - 1) / rate);
    const totalInvestment = monthlyInvestment * months;
    const interestEarned = futureValue - totalInvestment;

    document.getElementById('resultSIP').innerHTML = `
        <strong>Total Investment:</strong> INR ${formatNumber(totalInvestment.toFixed(2))}<br>
        <strong>Interest Earned:</strong> INR ${formatNumber(interestEarned.toFixed(2))}<br>
        <strong>Future Value:</strong> INR ${formatNumber(futureValue.toFixed(2))}
    `;
}

// Lumpsum Calculator
function calculateLumpsum() {
    const principal = parseFloat(document.getElementById('principal').value);
    const annualReturn = parseFloat(document.getElementById('annualReturnLumpsum').value) / 100;
    const years = parseInt(document.getElementById('yearsLumpsum').value);

    const futureValue = principal * ((1 + annualReturn) ** years);
    const totalInvestment = principal;
    const interestEarned = futureValue - totalInvestment;

    document.getElementById('resultLumpsum').innerHTML = `
        <strong>Total Investment:</strong> INR ${formatNumber(totalInvestment.toFixed(2))}<br>
        <strong>Interest Earned:</strong> INR ${formatNumber(interestEarned.toFixed(2))}<br>
        <strong>Future Value:</strong> INR ${formatNumber(futureValue.toFixed(2))}
    `;
}

// Insurance Calculator
function calculateInsurance() {
    const annualPremium = parseFloat(document.getElementById('annualPremium').value);
    const firstYearPayment = parseFloat(document.getElementById('firstYearPremium').value);
    const annualReturn = parseFloat(document.getElementById('annualReturnInsurance').value) / 100;
    const years = parseInt(document.getElementById('yearsInsurance').value);

    const futureValue = firstYearPayment * ((1 + annualReturn) ** years) + (annualPremium * (((1 + annualReturn) ** years - 1) / annualReturn));
    const totalInvestment = firstYearPayment + (annualPremium * (years - 1));
    const interestEarned = futureValue - totalInvestment;

    document.getElementById('resultInsurance').innerHTML = `
        <strong>Total Investment:</strong> INR ${formatNumber(totalInvestment.toFixed(2))}<br>
        <strong>Interest Earned:</strong> INR ${formatNumber(interestEarned.toFixed(2))}<br>
        <strong>Future Value:</strong> INR ${formatNumber(futureValue.toFixed(2))}
    `;
}

// SWP Calculator
function calculateSWP() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestmentSWP').value);
    const monthlyWithdrawal = parseFloat(document.getElementById('monthlyWithdrawal').value);
    const annualReturn = parseFloat(document.getElementById('annualReturnSWP').value) / 100;
    const years = parseInt(document.getElementById('yearsSWP').value);

    const months = years * 12;
    const rate = annualReturn / 12;
    let balance = initialInvestment;
    let totalWithdrawn = 0;

    for (let i = 0; i < months; i++) {
        balance = balance * (1 + rate) - monthlyWithdrawal;
        if (balance < 0) break;
        totalWithdrawn += monthlyWithdrawal;
    }

    const futureValue = balance;
    const totalInvestment = initialInvestment;
    const interestEarned = totalWithdrawn - totalInvestment;

    document.getElementById('resultSWP').innerHTML = `
        <strong>Total Investment:</strong> INR ${formatNumber(totalInvestment.toFixed(2))}<br>
        <strong>Total Withdrawn:</strong> INR ${formatNumber(totalWithdrawn.toFixed(2))}<br>
        <strong>Interest Earned:</strong> INR ${formatNumber(interestEarned.toFixed(2))}<br>
        <strong>Remaining Balance:</strong> INR ${formatNumber(futureValue.toFixed(2))}
    `;
}

// Step-up SIP Calculator
function calculateStepUpSIP() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestmentStepUp').value);
    const stepUpAmount = parseFloat(document.getElementById('stepUpAmount').value);
    const stepUpPeriod = parseInt(document.getElementById('stepUpPeriod').value);
    const annualReturn = parseFloat(document.getElementById('annualReturnStepUp').value) / 100;
    const years = parseInt(document.getElementById('yearsStepUp').value);

    const months = years * 12;
    let totalInvestment = 0;
    let futureValue = 0;
    let monthlyInvestment = initialInvestment;

    for (let i = 0; i < months; i++) {
        futureValue = (futureValue + monthlyInvestment) * (1 + annualReturn / 12);
        totalInvestment += monthlyInvestment;
        if ((i + 1) % (stepUpPeriod * 12) === 0) {
            monthlyInvestment += stepUpAmount;
        }
    }

    const interestEarned = futureValue - totalInvestment;

    document.getElementById('resultStepUp').innerHTML = `
        <strong>Total Investment:</strong> INR ${formatNumber(totalInvestment.toFixed(2))}<br>
        <strong>Interest Earned:</strong> INR ${formatNumber(interestEarned.toFixed(2))}<br>
        <strong>Future Value:</strong> INR ${formatNumber(futureValue.toFixed(2))}
    `;
}

// Fixed Duration Step-up SIP Calculator
function calculateFixedDurationStepUpSIP() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestmentFixed').value);
    const stepUpAmount = parseFloat(document.getElementById('stepUpAmountFixed').value);
    const stepUpYears = parseInt(document.getElementById('stepUpYears').value);
    const annualReturn = parseFloat(document.getElementById('annualReturnFixed').value) / 100;
    const totalYears = parseInt(document.getElementById('totalYearsFixed').value);

    const months = totalYears * 12;
    const stepUpMonths = stepUpYears * 12;
    let totalInvestment = 0;
    let futureValue = 0;
    let monthlyInvestment = initialInvestment;

    for (let i = 0; i < months; i++) {
        futureValue = (futureValue + monthlyInvestment) * (1 + annualReturn / 12);
        totalInvestment += monthlyInvestment;
        if ((i + 1) % stepUpMonths === 0) {
            monthlyInvestment += stepUpAmount;
        }
    }

    const interestEarned = futureValue - totalInvestment;

    document.getElementById('resultFixed').innerHTML = `
        <strong>Total Investment:</strong> INR ${formatNumber(totalInvestment.toFixed(2))}<br>
        <strong>Interest Earned:</strong> INR ${formatNumber(interestEarned.toFixed(2))}<br>
        <strong>Future Value:</strong> INR ${formatNumber(futureValue.toFixed(2))}
    `;
}
