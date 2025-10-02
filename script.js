const sellBtn = document.getElementById('sellBtn');
const buyBtn = document.getElementById('buyBtn');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const suggestionWrapper = document.getElementById('suggestion-wrapper');
const suggestionText = document.getElementById('suggestion-text');
const copyBtn = document.getElementById('copy-btn');

function formatNumber(num) {
    return num.toFixed(3);
}

function showResult(type, amount) {
    let adjusted;
    let resultText;
    let suggestionNum;

    if (type === "sell") {
        adjusted = amount * (1 - 0.003);
        resultText = `Vender: ${formatNumber(adjusted)}`;
        suggestionNum = adjusted - 0.002;
    } else {
        adjusted = amount * 1.003;
        resultText = `Comprar: ${formatNumber(adjusted)}`;
        suggestionNum = adjusted + 0.003;
    }
    
    resultDiv.textContent = resultText;
    suggestionText.textContent = formatNumber(suggestionNum);
    suggestionWrapper.style.display = "flex";
}

copyBtn.addEventListener('click', () => {
    const textToCopy = suggestionText.textContent;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.style.borderColor = 'var(--success)';
        copyBtn.style.color = 'var(--success)';
        setTimeout(() => {
            copyBtn.style.borderColor = 'var(--border)';
            copyBtn.style.color = 'var(--text-secondary)';
        }, 1500);
    }).catch(() => {
        alert('No se pudo copiar al portapapeles.');
    });
});

sellBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount < 0) {
        resultDiv.textContent = 'Ingresa un monto válido.';
        suggestionWrapper.style.display = "none";
        return;
    }
    showResult("sell", amount);
});

buyBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount < 0) {
        resultDiv.textContent = 'Ingresa un monto válido.';
        suggestionWrapper.style.display = "none";
        return;
    }
    showResult("buy", amount);
});

amountInput.addEventListener('input', () => {
    resultDiv.textContent = '';
    suggestionWrapper.style.display = "none";
});