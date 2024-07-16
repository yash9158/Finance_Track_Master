import { useContext } from "react";
import { PageContext } from "./App";
import { HiHome, HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";

function Header() {
  const { page, setPage } = useContext(PageContext);
  return (
    <div className="app-header">
      <ul>
        <li>
          <h1 className="logo">
            Fin<span>Track</span>
          </h1>
        </li>
        <li>
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => {
              setPage("home");
            }}
          >
            <HiHome className="icon" /> <p>Home</p>
          </button>
        </li>
        <li>
          <button
            className={page === "income" ? "active" : ""}
            onClick={() => {
              setPage("income");
            }}
          >
            <HiArrowDownLeft className="icon" style={{ color: "green" }} />{" "}
            <p>Income</p>
          </button>
        </li>
        <li>
          <button
            className={page === "expense" ? "active" : ""}
            onClick={() => {
              setPage("expense");
            }}
          >
            <HiArrowUpRight className="icon" style={{ color: "red" }} />{" "}
            <p>Expense</p>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
