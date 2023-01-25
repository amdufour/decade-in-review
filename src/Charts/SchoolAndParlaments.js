import { useRef, useEffect } from "react";
import * as d3 from "d3";

import SectionHeader from "../UI/SectionHeader";

const SchoolAndParlaments = props => {
  // Dimensions
  const width = 400;
  const height = 400;
  const dotsRadius = 3;

  // Format data
  const numInSchool = props.dataSchool.find(d => d.year === 2010).percentage * 10;
  const numOutSchool = props.dataSchool.find(d => d.year === 2018).percentage * 10 - numInSchool;
  const arrayInSchool = d3.range(0, numInSchool);
  const arrayOutSchool = d3.range(0, numOutSchool);
  const schoolDots = [];
  arrayInSchool.forEach((d, i) => {
    schoolDots.push({ id: i, status: "in" });
  });
  arrayOutSchool.forEach((d, i) => {
    schoolDots.push({ id: i + numInSchool, status: "out" });
  });

  // Draw the dots
  const schoolDotsRef = useRef(null);
  // useEffect(() => {
  //   const schoolDotsContainer = d3.select(schoolDotsRef.current);

  //   schoolDotsContainer
  //     .selectAll(`.dot-school`)
  //     .data(schoolDots)
  //     .join("circle")
  //       .attr("class", `dot-school`)
  //       .attr("cx", width / 2)
  //       .attr("cy", height / 2)
  //       .attr("r", dotsRadius)
  //       .attr("fill", d => d.status === "in" ? "#AAAFAF" : "#C38D9D");

  //   // const tick = (type) => {
  //   //   d3.selectAll(`.dot-${type}`)
  //   //     .transition().duration(50)
  //   //     .attr("cx", d => d.x)
  //   //     .attr("cy", d => d.y);
  //   // };

  //   // let simulation = d3.forceSimulation(schoolDots)
  //   //   .force("x", d3.forceX(width/2).strength(0.1))
  //   //   .force("y", d3.forceY(height/2).strength(0.1))
  //   //   .force("collide", d3.forceCollide(dotsRadius + 1).strength(1))
  //   //   .on("tick", tick("school"));

  //   const simulation = d3.forceSimulation()
  //     .force("collide", d3.forceCollide(d => d.dotsRadius + 1).strength(10))
  //     // .force("charge", d3.forceManyBody())
  //     .force('charge', d3.forceManyBody().strength(0.01))
  //     .velocityDecay(0.75)
  //     .alphaDecay(0.006)
  //     .force("center", d3.forceCenter(width / 2, height / 2))
  //     .force("y", d3.forceY(0))
  //     .force("x", d3.forceX(0))
    
  //   const ticked = () => {
  //     schoolDotsContainer.selectAll("circle")
  //       .attr("cx", d => d.x)
  //       .attr("cy", d => d.y);
  //   }

  //   simulation
  //     .nodes(schoolDots)
  //     .on("tick", ticked);

  // }, []);
  

  return (
    <section>
      <div className="container">
        <SectionHeader
          number={2}
          title="More girls are enrolled in high school..."
          title2="...And there are more women in parlaments"
        />
        <div className="row">
          <div className="col-12 col-md-5 offset-md-1">
            <div className="timeline">
              <svg id="timeline-school" viewBox="0 0 333.26 151.58">
                <path d="M54.9,24.05s14.65-2.72,22-3.56c7.31-.84,14.68-.74,22-1.48,7.35-.74,14.66-2.03,22-2.97,7.33-.94,14.65-2.18,22-2.67,7.32-.49,14.67-.25,22-.3,7.33-.05,14.67,.25,22,0,7.34-.25,14.66-1.24,22-1.49,7.33-.25,22,0,22,0" style={{fill: "none", stroke: "#aaafaf", strokeLinecap: "round", strokeWidth: 3}}/>
                <text transform="translate(0 61.38)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2010</tspan></text>
                <text transform="translate(240.03 45.67)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2018</tspan></text>
                <text transform="translate(.69 33.67)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">62%</tspan></text>
                <text transform="translate(240.72 18.14)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">66%</tspan></text>
              </svg>
            </div>
            <div className="dots">
              <svg viewBox={`0 0 ${width} ${height}`}>
                <g ref={schoolDotsRef}></g>
              </svg>
            </div>
          </div>
          <div className="col-12 col-md-5 offset-md-1">
            <div className="timeline">
              <svg id="timeline-mp" viewBox="0 0 291.89 182.86">
                <path d="M55.1,140s11.74-1.2,17.6-1.99c5.87-.79,11.74-1.8,17.6-2.76,5.87-.96,11.72-2.32,17.6-3.03,5.86-.7,11.74-.69,17.6-1.22,5.87-.53,11.73-1.51,17.6-1.96,5.86-.45,11.74-.37,17.6-.74,5.87-.37,11.73-.99,17.6-1.48,5.87-.5,11.73-.97,17.6-1.49,5.87-.51,11.74-.87,17.6-1.6,5.87-.73,17.6-2.79,17.6-2.79" style={{fill: "none", stroke: "#aaafaf", strokeLinecap: "round", strokeWidth: 3}}/>
                <text transform="translate(0 176.15)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2010</tspan></text>
                <text transform="translate(240.22 153.15)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2020</tspan></text>
                <text transform="translate(.58 148.34)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">19%</tspan></text>
                <text transform="translate(240.9 124.85)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">26%</tspan></text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolAndParlaments;