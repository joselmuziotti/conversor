    document.addEventListener('DOMContentLoaded', function() {
        const apiKey = 'd56220970c1888e70698b032';
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
        
        // Selecciona los elementos
        const currencyFrom = document.getElementById('currencyFrom');
        const currencyTo = document.getElementById('currencyTo');
        const amountInput = document.getElementById('amount');
        const convertedAmountInput = document.getElementById('convertedAmount');
      
        // Cargar las opciones en los selects
        function loadCurrencies() {
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
              const currencies = Object.keys(data.conversion_rates);
              currencyFrom.innerHTML = '';
              currencyTo.innerHTML = '';
              currencies.forEach(currency => {
                console.log(currency);
                
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.textContent = currency;
                console.log(optionFrom);
                
                currencyFrom.appendChild(optionFrom);
      
                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.textContent = currency;
                currencyTo.appendChild(optionTo);
              });
            })
            .catch(error => console.error('Error:', error));
        }
      
        // Actualizar la conversión
        function updateConversion() {
          const from = currencyFrom.value;
          const to = currencyTo.value;
          const amount = parseFloat(amountInput.value);
      
          if (from && to && amount) {
            fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                const rateFrom = data.conversion_rates[from];
                const rateTo = data.conversion_rates[to];
                const rate = rateTo / rateFrom;
                const convertedAmount = amount * rate;
                convertedAmountInput.value = convertedAmount.toFixed(2);
              })
              .catch(error => console.error('Error:', error));
          }
        }
      
        // Event listeners
        currencyFrom.addEventListener('change', updateConversion);
        currencyTo.addEventListener('change', updateConversion);
        amountInput.addEventListener('input', updateConversion);
      
        // Cargar las monedas al cargar la página
        loadCurrencies();
      });
      