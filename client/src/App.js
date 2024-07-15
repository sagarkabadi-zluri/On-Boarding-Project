import React from "react";
import ExpensesList from "./components/ExpensesList";
import UploadCSV from "./components/UploadCsv";
import NavBar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="container px-20">
        <ExpensesList />
      </div>
    </div>
  );
};

export default App;
