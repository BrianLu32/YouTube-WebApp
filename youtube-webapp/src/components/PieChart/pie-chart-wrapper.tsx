"use client";
import { useRef, useState, useEffect } from "react";

import PieChart from "./pie-chart";

export default function PieChartWrapper() {
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
    <div ref={containerRef} style={{ width: "100%", height: "500px" }}>
      {/* {size.width > 0 && (
        // <PieChart data={data} width={size.width} height={size.height} />
        // <PieChart width={size.width} height={size.height} />
      )} */}
    </div>
  );
}