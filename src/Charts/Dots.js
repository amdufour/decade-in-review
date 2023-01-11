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
  const categories = ["out", "in"];
  const xScale = d3.scalePoint()
    .domain(categories)
    .range([0, innerWidth])
    .padding(0.3);


  // Format data
  const data = props.data;
  data.forEach(d => {
    d["in_number"] = d.percentage * 10;
    d["out_number"] = (100 - d.percentage) * 10;
    const arrayIn = d3.range(0, d.in_number);
    const inArray = [];
    arrayIn.forEach((d, i) => {
      inArray.push({ id: i, status: "in" });
    });
    const arrayOut = d3.range(0, d.out_number);
    const outArray = [];
    arrayOut.forEach((d, i) => {
      outArray.push({ id: i + arrayIn.length, status: "out" });
    });
    d["dots"] = inArray.concat(outArray);
  });


  // Control dots position with D3
  const dotsRef = useRef();
  useEffect(() => {
    const dotsContainer = d3.select(dotsRef.current);

    // 2010
    const data2010 = data[0].dots;
    const dotsRadius = 3;
    dotsContainer
      .selectAll(`.dot-${props.type}`)
      .data(data2010)
      .join("circle")
        .attr("class", `dot-${props.type}`)
        .attr("r", dotsRadius)
        .attr("fill", d => d.status === "in" ? "LightSeaGreen" : "DarkGray");

    const tick = () => {
      d3.selectAll(`.dot-${props.type}`)
        .transition().duration(50)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    };

    let simulation = d3.forceSimulation(data2010)
      .force("x", d3.forceX().x(d => xScale(d.status)).strength(0.1))
      .force("y", d3.forceY(innerHeight/2).strength(0.1))
      .force("collide", d3.forceCollide(dotsRadius + 2).strength(1))
      .on("tick", tick);

    setTimeout(() => {
      const newData = data2010;
      newData.forEach((d, i) => {
        if (i >= newData.length - 30) {
          d.status = "in";
        }
      });
      simulation.stop();
      simulation.nodes(newData);
      simulation.alpha(0.3).restart();
    }, 5000)

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