import { useRef, useEffect } from "react";
import * as d3 from "d3";

const ForceTest = props => {
  const width = 500;
  const height = 500;
  
  const chartRef = useRef();
  

  useEffect(() => {
    const data = [
      { id: 1, name: "React", size: 100, fillColor: "#D3D3D3" },
      { id: 2, name: "TypeScript", size: 10, fillColor: "#D3D3D3" },
      { id: 3, name: "SCSS", size: 30, fillColor: "#D3D3D3" },
      { id: 4, name: "Recoil", size: 60, fillColor: "#D3D3D3" },
      { id: 5, name: "Redux", size: 80, fillColor: "#D3D3D3" },
    ];

    const chart = d3.select(chartRef.current);
    chart
      .selectAll("circle")
      .data(data)
      .join("circle")
        .attr("r", d => 30)
        .attr("fill", d => d.fillColor);

    const tick = () => {
      chart
        .selectAll("circle")
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    };

    let simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(width/2).strength(0.1))
      .force("y", d3.forceY(height/2).strength(0.1))
      .force("collide", d3.forceCollide(32).strength(1))
      .on("tick", tick);

    return () => {
      simulation.stop();
    }

  }, []);

  return (
    <svg width={width} height={height}>
      <g ref={chartRef}></g>
    </svg>
  );
};

export default ForceTest;