import { useRef, useState, useEffect } from "react";

import SearchYouTubeInfo from "../../model/youtube-info.js";
import './search-result.css'

import PieChartWrapper from "../PieChart/pie-chart-wrapper";

type Props = {
  results: SearchYouTubeInfo[];
};

export default function SearchResults({ results }: Props) {
  if (results.length === 0) return;

  // Grabs the referenced <div> element and find it's width and height for the pie chart sizing
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    }

    updateSize(); // initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      {results.map((item, index) => (
        <div ref={containerRef} key={index} className="searchResults">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="searchResultsStatistics">
            <h3>{item.snippet.title}</h3>
            <p>{item.snippet.description}</p>
            <small>Likes: {item.statistics.statistics.likeCount}</small><br />
            <small>Views: {item.statistics.statistics.viewCount}</small>
          </div>
          <PieChartWrapper YouTubeData={item.statistics.statistics} width={size.width} height={size.height}></PieChartWrapper>
        </div>
      ))}
    </div>
  );
}
