const units = ['C°', 'F°', 'K°'];
const currencyFrom = document.getElementById('currencyFrom');
const currencyTo = document.getElementById('currencyTo');

units.forEach(unit => {
    let optionFrom = document.createElement('option');
    let optionTo = document.createElement('option');
    optionFrom.value = unit[0]; // 'C', 'F', 'K'
    optionTo.value = unit[0];
    optionFrom.text = unit;
    optionTo.text = unit;
    currencyFrom.appendChild(optionFrom);
    currencyTo.appendChild(optionTo);
});

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) {
        return value;
    }

    let celsius;

    // Convert from the source unit to Celsius
    switch (fromUnit) {
        case 'C':
            celsius = value;
            break;
        case 'F':
            celsius = (value - 32) * (5 / 9);
            break;
        case 'K':
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to the target unit
    switch (toUnit) {
        case 'C':
            return celsius;
        case 'F':
            return (celsius * (9 / 5)) + 32;
        case 'K':
            return celsius + 273.15;
    }
}

document.getElementById('amount').addEventListener('input', function() {
    const amount = parseFloat(this.value);
    const fromUnit = document.getElementById('currencyFrom').value;
    const toUnit = document.getElementById('currencyTo').value;

    if (!isNaN(amount)) {
        const convertedValue = convertTemperature(amount, fromUnit, toUnit);
        document.getElementById('convertedAmount').value = convertedValue.toFixed(2);
    }
});

document.getElementById('currencyFrom').addEventListener('change', function() {
    document.getElementById('amount').dispatchEvent(new Event('input'));
});

document.getElementById('currencyTo').addEventListener('change', function() {
    document.getElementById('amount').dispatchEvent(new Event('input'));
});