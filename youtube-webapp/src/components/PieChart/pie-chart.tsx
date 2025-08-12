"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface PieChartData {
  label: string;
  value: number;
}
interface PieChartProps {
  data: PieChartData[];
  width: number;
  height: number;
}

export default function PieChart({data, width, height}: PieChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log(data);

    const radius = Math.min(width, height) / 2;

    // Clear old SVG content before rendering
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));

  }, [width, height]);

  return <svg ref={ref}></svg>;

  // const height = 500;
  // const width = 500;
  // const outerRadius = height / 2 - 10;
  // const innerRadius = outerRadius * 0.75;
  // const tau = 2 * Math.PI;
  // const color = d3.scaleOrdinal(d3.schemeObservable10);

  // const data = d3.tsvParse(`apples	oranges
  // 53245	200
  // 28479	200
  // 19697	200
  // 24037	200
  // 40245	200`, d3.autoType)

  // return (
  //   <svg>

  //   </svg>
  // )
}
