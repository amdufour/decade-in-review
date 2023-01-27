import { useRef, useEffect } from "react";
import * as d3 from "d3";

import SectionHeader from "../UI/SectionHeader";
import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";

const Mortality = props => {
  // Dimensions
  const width = 300;
  const height = 245;
  const margin = { top: 12, right: 50, bottom: 30, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // FormatData
  props.data.forEach(d => {
    const mortality2020 = d[props.type].find(y => y.year === 2020).mortality_rate;
    d["mortality2020"] = mortality2020;
    d["fill"] = "#AAAFAF";
  });
  const filteredData = props.data.filter(d => d[`${props.type}_diff`]);

  const dataDecrease = filteredData.filter(d => d[`${props.type}_diff`] <= 0);
  dataDecrease.sort((a, b) => a[`${props.type}_diff`] - b[`${props.type}_diff`]);
  const topDecrease = dataDecrease.slice(0, 5);
  topDecrease.forEach(d => d.fill = "#059799");
  const decreaseRemain = dataDecrease.splice(5);

  const dataIncrease = filteredData.filter(d => d[`${props.type}_diff`] > 0);
  dataIncrease.sort((a, b) => b[`${props.type}_diff`] - a[`${props.type}_diff`]);
  const topIncrease = dataIncrease.slice(0, 3);
  topIncrease.forEach(d => d.fill = "#E27D5F");
  const increaseRemain = dataIncrease.splice(3);

  const sortedData = decreaseRemain.concat(increaseRemain).concat(topDecrease).concat(topIncrease);
  console.log("sortedData", sortedData);

  const scatterplotRef = useRef(null);
  const scatterplotMouseOverRef = useRef(null);
  useEffect(() => {
    const scatterplot = d3.select(scatterplotRef.current);
    const scatterplotMouseOver = d3.select(scatterplotMouseOverRef.current);

    scatterplotMouseOver
        .attr("transform", "translate(-100, -100)")
      .selectAll("mouseover")
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    scatterplot
      .selectAll(".scatterplot-circle")
      .data(sortedData)
      .join("circle")
        .attr("class", d => `scatterplot-circle scatterplot-circle-${props.type}-${d.country_code}`)
        .attr("cx", d => xScale(d.gdp_per_capita_2015_US$))
        .attr("cy", d => yScale(d.mortality2020))
        .attr("r", 2.5)
        .attr("fill", d => d.fill)
        .attr("stroke", "#F9FFFF")
        .attr("stroke-width", 0.5)
        .on("mouseenter", (e, d) => {

          d3.selectAll(".scatterplot-circle")
            .transition()
              .attr("fill-opacity",circle => circle.country_code === d.country_code ? 1 : 0.1);

          scatterplotMouseOver
            .select(".mouseover-vertical-line")
              .attr("y2", innerHeight - yScale(d.mortality2020));

          scatterplotMouseOver
            .select(".mouseover-horizontal-line")
              .attr("x1", -xScale(d.gdp_per_capita_2015_US$));

          scatterplotMouseOver
            .select(".country-label text")
              .text(d.country_name);

          const countryLabelWidth = d3.select(".country-label text").node().getComputedTextLength();
          scatterplotMouseOver
            .select(".country-label rect")
              .attr("width", countryLabelWidth + 8);

          scatterplotMouseOver
            .select(".gdp-label text")
              .text(`${d3.format(".3s")(d.gdp_per_capita_2015_US$)}$`);

          const gdpLabelWidth = d3.select(".gdp-label text").node().getComputedTextLength();
          scatterplotMouseOver
            .select(".gdp-label text")
              .attr("x", 0)
              .attr("y", innerHeight - yScale(d.mortality2020) + 8.5);
          scatterplotMouseOver
            .select(".gdp-label rect")
              .attr("x", -gdpLabelWidth/2 - 4)
              .attr("y", innerHeight - yScale(d.mortality2020) + 2)
              .attr("width", gdpLabelWidth + 8);

          scatterplotMouseOver
            .select(".mortality-label text")
              .text(d.mortality2020);

          const mortalityLabelWidth = d3.select(".mortality-label text").node().getComputedTextLength();
          scatterplotMouseOver
            .select(".mortality-label text")
              .attr("x", -xScale(d.gdp_per_capita_2015_US$) - 6)
              .attr("y", 0);
          scatterplotMouseOver
            .select(".mortality-label rect")
              .attr("x", -xScale(d.gdp_per_capita_2015_US$) - mortalityLabelWidth - 10)
              .attr("y", -6)
              .attr("width", mortalityLabelWidth + 8);
          
          scatterplotMouseOver
              .attr("transform", `translate(${xScale(d.gdp_per_capita_2015_US$)}, ${yScale(d.mortality2020)})`)
            .selectAll("mouseover")
            .transition()
              .attr("fill-opacity", 1)
              .attr("stroke-opacity", 1);

          scatterplotMouseOver
            .select(".country-label")
              .transition()
                .attr("transform", "translate(3, 0)");

        })
        .on("mouseleave", () => {

          d3.selectAll(".scatterplot-circle")
            .attr("fill-opacity", 1);

          scatterplotMouseOver
              .attr("transform", "translate(-100, -100)")
            .selectAll("mouseover")
              .attr("fill-opacity", 1)
              .attr("stroke-opacity", 1);

          scatterplotMouseOver
            .select(".country-label")
              .attr("transform", "translate(0, 0)");

        });
  });

  // Scales
  const maxGDP = d3.max(props.data, d => d.gdp_per_capita_2015_US$);
  const xScale = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([0, innerWidth]);
  const maxMortality = d3.max(props.data, d => d.mortality2020);
  const yScale = d3.scaleLinear()
    .domain([0, maxMortality])
    .range([innerHeight, 0]);

  return (
    <section>
      <div className="container">
        <SectionHeader
          number={props.number}
          title={props.title}
        />
        <div className="row">
          <div className="offset-md-1 col-7">
            <div className="chart-help">Pass your cursor over a circle to reveal additional information.</div>
            <ChartContainer
              width={width}
              height={height}
              margin={margin}
            >
              <Axis
                type="left"
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                scale={yScale}
                label={props.yLabel}
              />
              <Axis
                type="bottom"
                innerWidth={innerWidth}
                innerHeight={innerHeight}
                scale={xScale}
                label="GDP per capita (2015 US$)"
              />
              <g className="scatterplot-circles" ref={scatterplotRef}></g>
              <g className="scatterplot-mouseover" ref={scatterplotMouseOverRef}>
                <circle
                  className="mouseover"
                  cx={0}
                  cy={0}
                  r={5}
                  fill="none"
                  stroke="#808989"
                  strokeLinecap="round"
                />
                <line
                  className="mouseover mouseover-vertical-line"
                  x1={0}
                  x2={0}
                  y1={5}
                  y2={0}
                  stroke="#808989"
                  strokeDasharray="2 2"
                  strokeLinecap="round"
                />
                <line
                  className="mouseover mouseover-horizontal-line"
                  x1={0}
                  x2={-5}
                  y1={0}
                  y2={0}
                  stroke="#808989"
                  strokeDasharray="2 2"
                  strokeLinecap="round"
                />
                <g className="country-label">
                  <rect 
                    className="mouseover"
                    x={6}
                    y={-8}
                    height={16}
                    fill="#059799"
                    rx={1}
                    ry={1}
                  />
                  <text
                    className="mouseover"
                    x={10}
                    y={0.5}
                    alignmentBaseline="middle"
                  />
                </g>
                <g className="gdp-label">
                  <rect 
                    className="mouseover"
                    x={0}
                    y={0}
                    height={12}
                    fill="#059799"
                    rx={1}
                    ry={1}
                  />
                  <text
                    className="mouseover"
                    x={0}
                    y={0}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  />
                </g>
                <g className="mortality-label">
                  <rect 
                    className="mouseover"
                    x={0}
                    y={0}
                    height={12}
                    fill="#059799"
                    rx={1}
                    ry={1}
                  />
                  <text
                    className="mouseover"
                    x={0}
                    y={0}
                    textAnchor="end"
                    alignmentBaseline="middle"
                  />
                </g>
              </g>
            </ChartContainer>
          </div>
          <div className="offset-md-1 col-4">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mortality;