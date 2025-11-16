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
      {results.map((video, index) => (
        <div ref={containerRef} key={index} className="searchResults">
          <img src={video.videoInfo.thumbnails.medium.url} alt="" />
          <div className="searchResultsStatistics">
            <h2>{video.videoInfo.title}</h2>
            <div className="searchResultsHeader">
              <img src={video.channel.channelInfo.thumbnails.default.url} alt="" 
                crossOrigin="anonymous" referrerPolicy="no-referrer" />
              <div className="searchResultsHeaderText">
                <h3>{video.channel.channelInfo.title}</h3>
              </div>
            </div>
            {/* <p>{video.snippet.description}</p> */}
            <small>Likes: {video.statistics.likeCount}</small><br />
            <small>Views: {video.statistics.viewCount}</small>
          </div>
          <PieChartWrapper YouTubeData={video.statistics} width={size.width} height={size.height}></PieChartWrapper>
        </div>
      ))}
    </div>
  );
}
