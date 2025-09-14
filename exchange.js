const apiKey = '78812af0de2b0012b38ba90f';
const currencyApiRoot = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;
const convertBtn = document.querySelector('#convertBtn')
const output = document.querySelector('.output')
const amountField = document.querySelector('#amount')

async function getRates(currencyCode) {
    const url = `${currencyApiRoot}/${currencyCode}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json)
    return json['conversion_rates'];
}

async function convert() {
    console.log('convert function triggered')
    const from = document.querySelector('#from-currency').value.split(',')[0];
    const to = document.querySelector('#to-currency').value.split(',')[0];
    const amount = amountField.value;

    const rates = await getRates(from);
    const value = rates[to] * amount;
    console.log(`Converted: ${value}`)
    output.textContent = value.toFixed(2);
}

convertBtn.addEventListener('click', convert);
amountField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        convert();
    }
});
