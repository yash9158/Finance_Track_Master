import React, { useState, useEffect } from "react";

import "./App.scss";
import Header from "./Header";
import HomePage from "./HomePage";

import IncomeExpensePage from "./IncomeExpensePage";

const PageContext = React.createContext();
function App() {
  const [page, setPage] = useState("home");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().getMonth();
  months.splice(month + 1);

  var incomeFromLocalStorage = JSON.parse(localStorage.getItem("income"));
  var expenseFromLocalStorage = JSON.parse(localStorage.getItem("expense"));

  if (!incomeFromLocalStorage) {
    incomeFromLocalStorage = months.map((m) => {
      // for random data
      // return {
      //   month: m,
      //   transactions: [
      //     { category: 0, value: 10000 },
      //     {
      //       category: 1 + Math.floor(Math.random() * 5),
      //       value: Math.floor(Math.random() * 5000),
      //     },
      //     {
      //       category: 1 + Math.floor(Math.random() * 5),
      //       value: Math.floor(Math.random() * 500),
      //     },
      //   ],
      // };

      // for zero data
      return {
        month: m,
        transactions: [],
      };
    });
  }
  if (!expenseFromLocalStorage) {
    expenseFromLocalStorage = months.map((m) => {
      // return {
      //   month: m,
      //   transactions: Array.from({ length: 5 }, () => {
      //     return {
      //       category: Math.floor(Math.random() * 6),
      //       value: Math.floor(Math.random() * 3000),
      //     };
      //   }),
      // };

      return {
        month: m,
        transactions: [],
      };
    });
  }

  const categories = {
    income: ["Salary", "Pension", "Business", "Rental", "Investment", "Other"],
    expense: [
      "Shopping/Foods/Entertainment/Transport",
      "Debt",
      "Bills",
      "Health and Insurance",
      "Investment",
      "Other",
    ],
  };

  const [income, setIncome] = useState(incomeFromLocalStorage);

  const [expense, setExpense] = useState(expenseFromLocalStorage);

  useEffect(() => {
    console.log("saving to local storage");
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expense", JSON.stringify(expense));
  }, [income, expense]);

  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
        income,
        setIncome,
        expense,
        setExpense,
        months,
        month,
        categories,
      }}
    >
      <div className="app">
        <Header></Header>
        <div className="app-body">
          {(() => {
            if (page == "home") {
              return <HomePage />;
            } else if (page == "income") {
              return <IncomeExpensePage typeIncExp={"income"} />;
            } else if (page == "expense") {
              return <IncomeExpensePage typeIncExp={"expense"} />;
            }
          })()}
        </div>
      </div>
    </PageContext.Provider>
  );
}

export { PageContext, App };
