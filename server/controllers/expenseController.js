const convertToINR = require("../utils/convertToINR");
const db = require("../utils/db");
const ValidateData = require("../utils/validateData");

exports.getAllExpenses = async (req, res) => {
  try {
    const result = await db.query("select * from expenses ORDER BY date;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM expenses WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpensesByPage = async (req, res) => {
  const { page } = req.params;
  const itemsPerPage = 10; // Define how many items per page
  const offset = (page - 1) * itemsPerPage;

  try {
    const result = await db.query(
      "SELECT * FROM expenses ORDER BY id LIMIT $1 OFFSET $2",
      [itemsPerPage, offset]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createExpense = async (req, res) => {
  const { date, description, amount, currency } = req.body;

  try {
    const validationError = ValidateData(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    const amountINR = await convertToINR(currency, amount);

    const result = await db.query(
      "INSERT INTO expenses (date, description, amount, amountINR, currency) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [date, description, amount, amountINR, currency]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { date, description, amount, currency } = req.body;
  try {
    const validationError = ValidateData(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    const amountINR = await convertToINR(currency, amount);

    const result = await db.query(
      "UPDATE expenses SET date = $1, description = $2, amount = $3, amountINR = $4, currency = $5 WHERE id = $6 RETURNING *",
      [date, description, amount, amountINR, currency, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.getExpensesBetweenDates = async (req, res) => {
  const { startDate, endDate } = req.params;
  console.log(req.params)
  try {
    const result = await db.query(
      "SELECT * FROM expenses WHERE date BETWEEN $1 AND $2 ORDER BY date;",
      [startDate, endDate]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No expenses found within the specified date range" });
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};