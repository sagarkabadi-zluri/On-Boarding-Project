const db = require("../utils/db");
const { Readable } = require("stream");
const csv = require("csv-parser");
const formatDate = require("../utils/formatDate");
const ValidateData = require("../utils/validateData");
const convertToINR = require("../utils/convertToINR");

exports.uploadExpenses = (req, res) => {
  const fileBuffer = req.file.buffer;
  const results = [];

  const readableStream = new Readable();
  readableStream.push(fileBuffer);
  readableStream.push(null);

  readableStream
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        for (const row of results) {
          const { Date, Description, Amount, Currency } = row;
          const myRow = {
            date: Date,
            description: Description,
            amount: Amount,
            currency: Currency,
          };
          const validationError = ValidateData(myRow);
          if (validationError) {
            console.log(validationError);
            return res.status(400).json(validationError);
          }
        }

        for (const row of results) {
          const { Date, Description, Amount, Currency } = row;
          const amountINR = await convertToINR(Currency, Amount);
          const result = await db.query(
            "INSERT INTO expenses (date, description, amount, amountINR, currency) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [Date, Description, Amount, amountINR, Currency]
          );
        }
        res.status(201).json({ message: "Expenses uploaded successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });
};
