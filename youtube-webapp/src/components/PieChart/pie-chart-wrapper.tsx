"use client";
import { useRef, useState, useEffect } from "react";

import { Statistics } from "../../model/video-info";

import PieChart from "./pie-chart";

export interface PieChartProps {
  YouTubeData: Statistics;
  width: number;
  height: number;
}

export default function PieChartWrapper({YouTubeData, width, height}: PieChartProps) {
  // Takes the smaller of the two to be the bounding size
  var sizeLimiter: number = Math.min(width, height);
  sizeLimiter *= 0.5; // Reduce the size by 10% to make the pie chart fit nicer

  const data = [
    { label: "viewCount", value: Number(YouTubeData.viewCount) },
    { label: "likeCount", value: Number(YouTubeData.likeCount) },
    { label: "commentCount", value: Number(YouTubeData.commentCount) },
  ]

  return (
    <div className="pieChartWrapper">
      <PieChart data={data} width={sizeLimiter} height={sizeLimiter}/>
    </div>
  );
}