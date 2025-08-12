import SearchBar from "../components/SearchBar/search-bar";
import LinePlot from '../components/Test_D3/line-plot'
import PieChartWrapper from "../components/PieChart/pie-chart-wrapper";

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <SearchBar />
    </div>
  );
}