import { useRef, useEffect } from 'react';
import * as d3 from "d3";

import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";

const Dots = props => {
  // Dimensions
  const margin = { top: 30, right: 100, bottom: 30, left: 100 };
  const width = 600;
  const height = 300;
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const categories = ["Not enrolled", "Enrolled"];
  const xScale = d3.scalePoint()
    .domain(categories)
    .range([0, innerWidth])
    .padding(0.3);


  // Format data
  const data = props.data;
  data.forEach(d => {
    // d["in_number"] = d.percentage * 10;
    // d["out_number"] = (100 - d.percentage) * 10;
    d["in_number"] = Math.round(d.percentage);
    d["out_number"] = Math.round(100 - d.percentage);
    const inArray = Array(d.in_number).fill({ status: "Enrolled" });
    const outArray = Array(d.out_number).fill({ status: "Not enrolled" });
    d["dots"] = inArray.concat(outArray);
  });
  console.log("dots data", data);


  // Control dots position with D3
  const dotsRef = useRef();
  useEffect(() => {
    console.log("in useEffect")
    const dotsContainer = d3.select(dotsRef.current);

    // 2010
    const data2010 = data[0].dots;
    const dotsRadius = 4;
    dotsContainer
      .selectAll(`.dot-${props.type}`)
      .data(data2010)
      .join("circle")
        .attr("class", `dot-${props.type}`)
        .attr("cx", d => xScale(d.status))
        .attr("cy", innerHeight)
        .attr("r", dotsRadius)
        .attr("fill", "LightCoral");

    const tick = () => {
      d3.selectAll(`.dot-${props.type}`)
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    };

    let simulation = d3.forceSimulation(data2010)
      .force("x", d3.forceX().x(d => xScale(d.status)).strength(0.01))
      .force("y", d3.forceY(innerHeight/2).strength(0.01))
      .force("collide", d3.forceCollide(8).strength(1))
      .on("tick", tick);

    return () => {
      simulation.stop();
    }

  }, [data, innerHeight, props.type, xScale]);


  return (
    <ChartContainer
      width={width}
      height={height}
      margin={margin}
    >
      <Axis
        type="bandBottom"
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        scale={xScale}
        ticks={categories}
      />
      <g ref={dotsRef}></g>
    </ChartContainer>
  );
};

export default Dots;