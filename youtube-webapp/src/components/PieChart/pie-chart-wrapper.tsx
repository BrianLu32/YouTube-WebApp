"use client";
import { useRef, useState, useEffect } from "react";

import { Statistics } from "../../model/video-info";

import PieChart from "./pie-chart";
import "./pie-chart-wrapper.css"

export interface PieChartProps {
  YouTubeData: Statistics;
  width: number;
  height: number;
}

export default function PieChartWrapper({YouTubeData, width, height}: PieChartProps) {
  // Takes the smaller of the two to be the bounding size
  var sizeLimiter: number = Math.min(width, height);
  sizeLimiter *= 0.5; // Reduce the size by 10% to make the pie chart fit nicer

  const [ifHover, setHover] = useState(false);

  const trueData = [
    { label: "viewCount", value: Number(YouTubeData.viewCount) },
    { label: "likeCount", value: Number(YouTubeData.likeCount) },
    { label: "commentCount", value: Number(YouTubeData.commentCount) },
  ]

  // Used to scale the pie slices so it's easier to read
  // +1 to avoid log(0)
  const pieData = [
    { label: "viewCount", value: Math.log10(Number(YouTubeData.viewCount) + 1) },
    { label: "likeCount", value: Math.log10(Number(YouTubeData.likeCount) + 1) },
    { label: "commentCount", value: Math.log10(Number(YouTubeData.commentCount) + 1) },
  ]

  return (
    <div className="pieChartWrapper">
      <div onMouseOver={() => {setHover(true); console.log("Hover")}} onMouseLeave={() => {setHover(false); console.log("Off Hover")}}>
        <PieChart data={pieData} width={sizeLimiter} height={sizeLimiter}/>
      </div>
      <div className={`pieChartCard ${ifHover ? "show": ""}`}>
          <div>Note: pie slices are scaled down by log10 for visual clarity</div>
          <div className="pieChartCardView">
            <span className="pieChartCardColor pieChartCardViewColor"></span>
            <span>View Count: {trueData[0].value}</span>
          </div>
          <div className="pieChartCardView">
            <span className="pieChartCardColor pieChartCardLikeColor"></span>
            <span>Like Count: {trueData[1].value}</span>
          </div>
          <div className="pieChartCardView">
            <span className="pieChartCardColor pieChartCardCommentsColor"></span>
            <span>Comment Count: {trueData[2].value}</span>
          </div>
        </div>
      {/* {ifHover && (
        
      )} */}
    </div>
  );
}