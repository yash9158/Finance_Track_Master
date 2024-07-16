import { HiOutlineCurrencyRupee, HiOutlineTrash } from "react-icons/hi";

export default function RecentTransactions({
  colors,
  trans,
  categories,
  month,
  handleDelete,
}) {
  const maxTrans = 10;
  return (
    <div className="flexBox-c block" style={{ width: "100%" }}>
      <h2>Recent Transactions in {month}</h2>
      <div className="recentTrans flexBox-r">
        {trans
          .slice(-maxTrans)
          .reverse()
          .map((t, i) => {
            return (
              <div
                className="transaction"
                key={
                  categories[t.category] +
                  (t.value + Math.floor(Math.random() * 100)).toString()
                }
              >
                <div
                  className="trans-category"
                  style={{ backgroundColor: colors[t.category] }}
                >
                  <h5>{categories[t.category]}</h5>
                </div>
                <h4>
                  <HiOutlineCurrencyRupee
                    className="icon"
                    style={{ transform: "translate(-3px,3px)" }}
                  />
                  {t.value}
                </h4>
                <button onClick={() => handleDelete(trans.length - (i + 1))}>
                  <HiOutlineTrash className="icon" />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
