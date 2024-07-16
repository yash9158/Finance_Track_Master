import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph({ type, data, options }) {
  return (
    <div className="graph block">
      {type == "Bar" && <Bar data={data} options={options} />}
      {type == "Line" && <Line data={data} options={options} />}
      {type == "Pie" && <Pie data={data} options={options} />}
    </div>
  );
}
