require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');



const createTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      description VARCHAR(500) NOT NULL,
      amount NUMERIC(10, 2) NOT NULL,
      amountINR NUMERIC(10, 2) NOT NULL,
      currency VARCHAR(3) NOT NULL 
    )
  `;

  try {
    await pool.query(queryText);
    console.log('Expenses table created or already exists.');
  } catch (err) {
    console.error('Error creating expenses table:', err);
  }
};

const dbConfig = require("../config/dbconfig");


const pool = new Pool(dbConfig)


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


// const pool = new Pool({
//   connectionString: 'postgres://avnadmin:AVNS_j5C6qZMyvzykIQpbvxq@pg-32e88592-on-boarding.i.aivencloud.com:28067/test?sslmode=require',
//   ssl: {
//       rejectUnauthorized: false,
      
//   }
// });




pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database.");
});

pool.on("error", (err) => {
  console.error("Error with the database connection:", err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  createTable
};
