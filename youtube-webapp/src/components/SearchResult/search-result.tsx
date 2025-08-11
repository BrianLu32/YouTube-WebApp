import SearchYouTubeInfo from "../../model/youtube-info.js";
import './search-result.css'

import PieChartWrapper from "../PieChart/pie-chart-wrapper.jsx";

type Props = {
  results: SearchYouTubeInfo[];
};

export default function SearchResults({ results }: Props) {
  if (results.length === 0) return;

  console.log(results);

  return (
    <div>
      {results.map((item, index) => (
        <div key={index} className="searchResults">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="searchResultsStatistics">
            <h3>{item.snippet.title}</h3>
            <p>{item.snippet.description}</p>
            <small>Likes: {item.statistics?.statistics.likeCount}</small><br />
            <small>Views: {item.statistics?.statistics.viewCount}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
