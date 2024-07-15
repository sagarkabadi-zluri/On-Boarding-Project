const CURRENCY_URL = require("./constants");

const exchangeRateCache = {};

const convertToINR = async (currency, amount) => {
  
  if (exchangeRateCache[currency]) {
    // console.log(`Using cached exchange rate for ${currency}`);
    return exchangeRateCache[currency] * amount;
  }

  try {
    const response = await fetch(CURRENCY_URL + currency);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates.');
    }
    const data = await response.json();
    // Cache the fetched exchange rate
    exchangeRateCache[currency] = data.conversion_rates["INR"];
    console.log("called");
    return exchangeRateCache[currency] * amount;
  } catch (error) {
    console.error('Error converting currency:', error.message);
    return null;
  }
}

module.exports = convertToINR;
