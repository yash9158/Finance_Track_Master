import { useContext, useState } from "react";
import { PageContext } from "./App";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RecentTransactions from "./RecentTransactions";

import Graph from "./GraphChart";

function IncomeExpensePage({ typeIncExp }) {
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

  const colors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(95, 102, 198, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(192, 192, 192, 0.5)",
  ];

  const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Total ${typeIncExp} category`,
      },
    },
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${typeIncExp} Month Wise`,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const incExp = typeIncExp == "income" ? income : expense;

  const dataPie = {
    labels: categories[typeIncExp],
    datasets: [
      {
        label: typeIncExp,
        data: (function () {
          // intial all categories sum to 0
          const categorySums = categories[typeIncExp].map((c) => {
            return { category: c, value: 0 };
          });

          incExp.forEach((i) => {
            i.transactions.forEach((t) => {
              categorySums[t.category].value += t.value;
            });
          });

          return categorySums.map((c) => c.value);
        })(),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: months,
    datasets: categories[typeIncExp]
      .map(function (c, ind) {
        let obj = {
          label: c,
          data: incExp.map((i) =>
            i.transactions.reduce(
              (a, b) => (b.category == ind ? a + b.value : a + 0),
              0
            )
          ),
          backgroundColor: colors[categories[typeIncExp].indexOf(c)],
          borderWidth: 1,
        };
        return obj;
      })
      .reverse(),
  };

  const Selector = ({ data, selected, handleSelectChange }) => {
    return (
      <div className="flexBox-r">
        <h3>Category</h3>
        <select onChange={handleSelectChange} selected={selected}>
          {data.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const InputAmount = ({ amount, handleAmountChange }) => {
    return (
      <div className="flexBox-r">
        <h3>Amount</h3>
        <h2>
          <HiOutlineCurrencyRupee
            className="icon"
            style={{ transform: "translateY(3px)" }}
          />
        </h2>
        <input type="number" onChange={handleAmountChange} value={amount} />
      </div>
    );
  };

  const InputDiv = () => {
    const [selected, setSelected] = useState(categories[typeIncExp][0]);
    const [amount, setAmount] = useState("");
    const handleSelectChange = (e) => {
      setSelected(e.target.value);
    };
    const handleAmountChange = (e) => {
      setAmount(e.target.value);
    };
    const handleAdd = () => {
      if (!amount) return;
      var newAmountObj;
      typeIncExp == "income"
        ? (newAmountObj = [...income])
        : (newAmountObj = [...expense]);

      newAmountObj[month].transactions.push({
        category: categories[typeIncExp].indexOf(selected),
        value: parseInt(amount),
      });
      typeIncExp == "income"
        ? setIncome(newAmountObj)
        : setExpense(newAmountObj);
    };
    return (
      <div className="flexBox-r block">
        <InputAmount amount={amount} handleAmountChange={handleAmountChange} />
        <Selector
          data={categories[typeIncExp]}
          selected={selected}
          handleSelectChange={handleSelectChange}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    );
  };

  const handleDelete = (ind) => {
    var newAmountObj;
    typeIncExp == "income"
      ? (newAmountObj = [...income])
      : (newAmountObj = [...expense]);
    newAmountObj[month].transactions.splice(ind, 1);
    typeIncExp == "income" ? setIncome(newAmountObj) : setExpense(newAmountObj);
  };

  return (
    <div className="page-container flexBox-c">
      <div
        className="block flexBox-r"
        style={{
          width: "100%",
          backgroundColor: `${
            typeIncExp == "income"
              ? "rgba(0, 128, 0, 0.3)"
              : "rgba(255, 0, 0, 0.3)"
          }`,
        }}
      >
        <h2 style={{ color: "white" }}>{`${(
          typeIncExp + " Tab"
        ).toUpperCase()}`}</h2>
      </div>
      <InputDiv />
      <p className="info-text">
        Transactions will be added in {months[month]} month data
      </p>
      <RecentTransactions
        colors={colors}
        month={months[month]}
        trans={
          typeIncExp == "income"
            ? income[month].transactions
            : expense[month].transactions
        }
        categories={categories[typeIncExp]}
        handleDelete={handleDelete}
      />
      <div className="graphs flexBox-r">
        <Graph type="Bar" data={dataBar} options={optionsBar} />
        <Graph type="Pie" data={dataPie} options={optionsPie} />
      </div>
    </div>
  );
}

export default IncomeExpensePage;
