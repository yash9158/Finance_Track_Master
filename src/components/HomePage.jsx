import { useContext } from "react";
import { PageContext } from "./App";
import {
  HiOutlineCurrencyRupee,
  HiOutlinePlusCircle,
  HiOutlineMinusCircle,
} from "react-icons/hi";
import Graph from "./GraphChart";

function HomePage() {
  const {
    page,
    setPage,
    income,
    setIncome,
    expense,
    setExpense,
    months,
    month,
    categories,
  } = useContext(PageContext);

  const balance = (function () {
    let bal = [];
    for (let i = 0; i < income.length; i++) {
      bal.push({
        month: income[i].month,
        value:
          income[i].transactions.reduce((a, b) => a + b.value, 0) -
          expense[i].transactions.reduce((a, b) => a + b.value, 0),
      });
    }
    return bal;
  })();

  const curBalance = balance.reduce((a, b) => a + b.value, 0);

  const Wallet = () => {
    return (
      <div className="block flexBox-c">
        <div className="flexBox-r">
          <h2>Total Balance</h2>
          <div
            className="amount-value"
            style={{
              backgroundColor:
                curBalance > 0
                  ? "rgba(0, 128, 0, 0.3)"
                  : "rgba(255, 0, 0, 0.3)",
            }}
          >
            <h2>
              <HiOutlineCurrencyRupee
                className="icon"
                style={{ transform: "translateY(3px)" }}
              />
              {curBalance}
            </h2>
          </div>
        </div>
        <div className="flexBox-r">
          <button
            onClick={() => {
              setPage("income");
            }}
          >
            <HiOutlinePlusCircle className="icon" style={{ color: "green" }} />{" "}
            Add Income
          </button>
          <button
            onClick={() => {
              setPage("expense");
            }}
          >
            <HiOutlineMinusCircle className="icon" style={{ color: "red" }} />{" "}
            Add Expense
          </button>
        </div>
      </div>
    );
  };

  const WalletGraph = () => {
    const optionsIEB = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Income and Expense chart",
        },
      },
    };
    const optionsBal = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Total Balance chart",
        },
      },
    };
    const dataIEB = {
      labels: months.map((m) => m.slice(0, 3)),
      datasets: [
        {
          label: "Income",
          data: income.map((i) =>
            i.transactions.reduce((a, b) => a + b.value, 0)
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Expense",
          data: expense.map((i) =>
            i.transactions.reduce((a, b) => a + b.value, 0)
          ),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Balance",
          data: balance.map((i) => i.value),
          borderColor: "rgb(53, 162, 128)",
          backgroundColor: "rgba(53, 162, 128, 0.5)",
        },
      ],
    };

    var total = 0;
    const dataBal = {
      labels: months.map((m) => m.slice(0, 3)),
      datasets: [
        {
          label: "Income",
          data: balance.map((b) => (total += b.value)),
          borderColor: "rgb(53, 162, 128)",
          backgroundColor: "rgba(53, 162, 128, 0.5)",
        },
      ],
    };
    return (
      <div className="flexBox-r">
        <Graph type="Bar" data={dataIEB} options={optionsIEB} />
        <Graph type="Line" data={dataBal} options={optionsBal} />
      </div>
    );
  };

  return (
    <div className="page-container flexBox-c">
      <Wallet />
      <WalletGraph />
    </div>
  );
}

export default HomePage;
