let portfolio = [];
let cryptocurrencies = [];

async function fetchJsonFile() {
  // Fetch the json file
  const jsonFile = await fetch('cryptocurrencies.json');

  // Convert it into a object
  cryptocurrencies = await jsonFile.json();

  // Literate over each element in the cryptocurrencies array
  cryptocurrencies.forEach((element) => {
    cryptoTableFtn(element);
    addFormFtn(element);
    historicalDataFtn(element);
  });
}

// Creating table body for the Crypto-Table
function cryptoTableFtn(element) {
  const cryptoTableBody = document.querySelector('#crypto-table tbody');

  let bodyRows = document.createElement('tr');

  // The each row of the body code
  bodyRows.innerHTML = `
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.symbol}</td>
    <td>${element.current_price}</td>
    <td>${element.prices[`1h`]}</td>
    <td>${element.prices[`24h`]}</td>
    <td>${element.prices[`7d`]}</td>
    `;

  // Adding the rows in the body
  cryptoTableBody.innerHTML += bodyRows.innerHTML;
}

// Bellow code in addFormFtn is for select button
function addFormFtn(element) {
  const addForm_select = document.querySelector('#add-form select');

  addForm_select.innerHTML += `
  <option value='${element.id}'>${element.name}</option>
  `;
}

// Bellow code is for submiting the purchase
const addForm_button = document.querySelector('#add-form-btn');

addForm_button.addEventListener('click', (event) => {
  event.preventDefault();

  const addForm_select = document.querySelector('#add-form select');
  const addForm_amount = document.querySelector('#add-form input');

  // The single purchase class constructor
  class singlePurchase {
    constructor(id, name, purchasePrice, amount, totalPrice) {
      (this.id = id),
        (this.name = name),
        (this.purchasePrice = purchasePrice),
        (this.amount = amount),
        (this.totalPrice = totalPrice);
    }
  }

  let typeOfPurchase = addForm_select.value;
  let amountOfPurchase = Math.floor(addForm_amount.value);

  cryptocurrencies.forEach((element) => {
    if (element.id == typeOfPurchase) {
      let billOfPurchase = new singlePurchase(
        element.id,
        element.name,
        element.current_price,
        amountOfPurchase != 0 ? amountOfPurchase : 0,
        amountOfPurchase * parseInt(element.current_price)
      );
      // To check if any earlier purchase is made of same coin
      let isAlreadyPurchase = false;

      portfolio.forEach((arrayElement) => {
        if (arrayElement.id == typeOfPurchase) {
          // Code for change in values of repeated purchase
          arrayElement.amount += amountOfPurchase;
          arrayElement.totalPrice =
            parseInt(arrayElement.amount) *
            parseInt(arrayElement.purchasePrice);

          isAlreadyPurchase = true;

          return;
        }
      });

      !isAlreadyPurchase ? portfolio.push(billOfPurchase) : null;

      return;
    }
  });

  addForm_select.value = 'btc';
  addForm_amount.value = null;

  portfolioTableFtn(portfolio);
});

// Bellow code is for deducting from purchase
const removeForm_button = document.querySelector('#remove-form-btn');
const removeForm_button_id = document.getElementById('remove-form-btn');

removeForm_button.addEventListener('click', (event) => {
  event.preventDefault();

  const addForm_select = document.querySelector('#add-form select');
  const addForm_amount = document.querySelector('#add-form input');

  portfolio.forEach((element, index) => {
    if (element.id == addForm_select.value) {
      if (element.amount < addForm_amount.value) {
        removeForm_button_id.style.background = 'red';
        setTimeout(() => {
          removeForm_button_id.style.background = 'lightGrey';
        }, 2000);
      } else {
        portfolio[index].amount -= addForm_amount.value;
        portfolio[index].totalPrice =
          portfolio[index].amount * portfolio[index].purchasePrice;
        portfolioTableFtn(portfolio);
      }
    }
  });
});

// Bellow is code for portfolio table
function portfolioTableFtn(purchase_data) {
  const portfolioTable = document.querySelector('#portfolio-table tbody');
  portfolioTable.innerHTML = ``;

  let portfolioTable_body = document.createElement('tr');

  purchase_data.forEach((value) => {
    let purchase_data_value = Object.values(value);
    let table_data = ``;
    purchase_data_value.forEach((value) => {
      table_data += `<td>${value}</td>`;
    });
    portfolioTable_body.innerHTML = table_data;
    portfolioTable.innerHTML += portfolioTable_body.innerHTML;
  });
}

// Historical data code bellow
function historicalDataFtn(data) {
  const historicalData = document.querySelector('#historical-data tbody');

  let historicalData_row = document.createElement('tr');

  let historical_prices = ``;
  let historical_prices_sum = 0;
  data.prices.historical.forEach((value) => {
    historical_prices = `${historical_prices}, ${value}`;
    historical_prices_sum += value;
  });
  let historical_prices_avg =
    historical_prices_sum / data.prices.historical.length;

  historicalData_row = `
  <td>${data.name}</td>
  <td>${historical_prices}</td>
  <td>${historical_prices_avg}</td>
  `;
  historicalData_row.innerHTML = historicalData_row;
  historicalData.innerHTML += historicalData_row;
}

fetchJsonFile();
