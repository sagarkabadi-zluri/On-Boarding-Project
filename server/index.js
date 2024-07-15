const express = require("express");
const app = express();
const cors = require("cors"); 

const port = process.env.PORT || 4000;
const expensesRoutes = require("./routes/expenseRoutes"); 
const uploadRoutes = require("./routes/uploadRoutes"); 
const { createTable } = require('./utils/db');


createTable();

app.use(express.json());
app.use(cors());


app.use("/expenses", expensesRoutes);
app.use("/expenses/upload", uploadRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
