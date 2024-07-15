

const axios = require('axios');


const ValidateData = (data) => {
    const { date, description, amount, currency } = data;
    
    const [day, month, year] = date.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);
  
    if (description.length === 0) {
      return { error: "Description should not be empty" };
    }
    if (amount <= 0) {
      return { error: "Amount cannot be less than or equal to zero" };
    }
    if (parsedDate > Date.now()) {
      return { error: "Date cannot be in the future" };
    }
    return null;
  };
  

module.exports = ValidateData;
