import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "../Animations/DrawSVGPlugin";

import SectionHeader from "../UI/SectionHeader";
import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";

const Mortality = props => {
  // Dimensions
  const width = 330;
  const height = 245;
  const heightSlope = 410;
  const margin = { top: 12, right: 50, bottom: 30, left: 30 };
  const marginSlope = { top: 25, right: 20, bottom: 30, left: 200 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidthSlope = width - marginSlope.left - marginSlope.right;
  const innerHeightSlope = heightSlope - marginSlope.top - marginSlope.bottom;

  // FormatData
  const localData = JSON.parse(JSON.stringify(props.data));
  localData.forEach(d => {
    const mortality2020 = d[props.type].find(y => y.year === 2020).mortality_rate;
    d["mortality2020"] = mortality2020;
    d["fill"] = "#AAAFAF";
  });
  const filteredData = localData.filter(d => d[`${props.type}_diff`]);

  const dataDecrease = filteredData.filter(d => d[`${props.type}_diff`] <= 0);
  dataDecrease.sort((a, b) => a[`${props.type}_diff`] - b[`${props.type}_diff`]);
  const topDecrease = dataDecrease.slice(0, 5);
  topDecrease.forEach(d => d.fill = "#059799");
  const decreaseRemain = dataDecrease.splice(5);

  const dataIncrease = filteredData.filter(d => d[`${props.type}_diff`] > 0);
  dataIncrease.sort((a, b) => b[`${props.type}_diff`] - a[`${props.type}_diff`]);
  const topIncrease = dataIncrease.slice(0, 5);
  topIncrease.forEach(d => d.fill = "#E27D5F");
  const increaseRemain = dataIncrease.splice(5);

  const sortedData = decreaseRemain.concat(increaseRemain).concat(topDecrease).concat(topIncrease);
  
  const scatterplotRef = useRef(null);
  const scatterplotMouseOverRef = useRef(null);
  const slopeRef = useRef(null);
  const slopeMouseOver2020Ref = useRef(null);
  const slopeMouseOver2010Ref = useRef(null);
  const descriptionRef = useRef(null);
  useEffect(() => {

    const scatterplot = d3.select(scatterplotRef.current);
    const scatterplotMouseOver = d3.select(scatterplotMouseOverRef.current);
    d3.selectAll(".slope-country").remove();
    d3.selectAll(".slope-others").remove();
    const slope = d3.select(slopeRef.current);
    const slopeMouseOver2020 = d3.select(slopeMouseOver2020Ref.current);
    const slopeMouseOver2010 = d3.select(slopeMouseOver2010Ref.current);

    // Scatterplot
    scatterplotMouseOver
        .attr("transform", "translate(-100, -100)")
      .selectAll("mouseover")
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    const hideLabels = () => {
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

      slope
        .selectAll(".slope-country")
          .style("opacity", 1);

      slopeMouseOver2010
        .attr("transform", `translate(0, -100)`)
        .style("opacity", 0);
      slopeMouseOver2020
        .attr("transform", `translate(0, -100)`)
        .style("opacity", 0);

      d3.select(".slope-others")
        .style("opacity", 0)
        .attr("transform", "translate(0, -1000)");
    };

    const showScatterplotLabels = d => {
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
    };

    const showSlopeLabels = d => {
      slope
        .selectAll(".slope-country")
          .transition()
            .style("opacity", country => country.country_code === d.country_code ? 1 : 0.1);
      
      if (!topDecrease.find(c => c.country_code === d.country_code) && !topIncrease.find(c => c.country_code === d.country_code)) {
        d3.select(".slope-others line")
          .attr("y1", yScaleSlope(d[props.type][0].mortality_rate))
          .attr("y2", yScaleSlope(d.mortality2020));
        d3.select(".slope-others .other-circle-2010")
          .attr("cy", yScaleSlope(d[props.type][0].mortality_rate));
        d3.select(".slope-others .other-circle-2020")
          .attr("cy", yScaleSlope(d.mortality2020));
        d3.select(".slope-others text")
          .attr("y", yScaleSlope(d[props.type][0].mortality_rate))
          .text(d.country_name);
        d3.select(".slope-others")
          .attr("transform", "translate(0, 0)")
          .transition()
            .style("opacity", 1);
      }

      slopeMouseOver2010
        .select("text")
        .text(d[props.type][0].mortality_rate);
      slopeMouseOver2020
        .select("text")
        .text(d.mortality2020);
      
      slopeMouseOver2010
        .attr("transform", `translate(0, ${yScaleSlope(d[props.type][0].mortality_rate) + 8})`)
        .transition()
          .style("opacity", 1);
      slopeMouseOver2020
        .attr("transform", `translate(${innerWidthSlope}, ${yScaleSlope(d.mortality2020) + 8})`)
        .transition()
          .style("opacity", 1);

    };
    
    scatterplot
      .selectAll(".scatterplot-circle")
      .data(sortedData)
      .join("circle")
        .attr("class", d => {
          let circleType = "";
          if (topDecrease.find(c => c.country_code === d.country_code)) {
            circleType = "decrease";
          } else if (topIncrease.find(c => c.country_code === d.country_code)) {
            circleType = "increase";
          } else {
            circleType = "default";
          }
          return `scatterplot-circle scatterplot-circle-${props.type}-${d.country_code} ${circleType}`;
        })
        .attr("cx", d => xScale(d.gdp_per_capita_2015_US$))
        .attr("cy", d => yScale(d.mortality2020))
        .attr("r", 2.5)
        .attr("fill", d => d.fill)
        .attr("stroke", "#F9FFFF")
        .attr("stroke-width", 0.5)
        .on("mouseenter", (e, d) => {
          showScatterplotLabels(d);
          showSlopeLabels(d);
        })
        .on("mouseleave", () => hideLabels());

    // Slope chart
    const slopeCountry = slope
      .selectAll(".slope-country")
      .data(topDecrease.concat(topIncrease))
      .join("g")
        .attr("class", d => `slope-country slope-country-${d.country_code} ${d[`${props.type}_diff`] < 0 ? "decrease" : "increase"}`);

    slopeCountry
      .append("line")
        .attr("x1", 0)
        .attr("y1", d => yScaleSlope(d[props.type].find(y => y.year === 2010).mortality_rate))
        .attr("x2", innerWidthSlope)
        .attr("y2", d => yScaleSlope(d[props.type].find(y => y.year === props.lastYear).mortality_rate))
        .attr("stroke", d => d[`${props.type}_diff`] < 0 ? "#059799" : "#E27D5F")
        .attr("stroke-width", 2);

    slopeCountry
      .append("circle")
        .attr("class", "circle-2010")
        .attr("cx", 0)
        .attr("cy", d => yScaleSlope(d[props.type].find(y => y.year === 2010).mortality_rate))
        .attr("r", 5)
        .attr("fill", d => d[`${props.type}_diff`] < 0 ? "#059799" : "#E27D5F")
        .attr("stroke", "#F9FFFF")
        .on("mouseenter", (e, d) => {
          showScatterplotLabels(d);
          showSlopeLabels(d);
        })
        .on("mouseleave", () => hideLabels());
    slopeCountry
      .append("circle")
        .attr("class", "circle-2020")
        .attr("cx", innerWidthSlope)
        .attr("cy", d => yScaleSlope(d[props.type].find(y => y.year === props.lastYear).mortality_rate))
        .attr("r", 5)
        .attr("fill", d => d[`${props.type}_diff`] < 0 ? "#059799" : "#E27D5F")
        .attr("stroke", "#F9FFFF")
        .on("mouseenter", (e, d) => {
          showScatterplotLabels(d);
          showSlopeLabels(d);
        })
        .on("mouseleave", () => hideLabels());

    slopeCountry
      .append("text")
        .attr("x", -8)
        .attr("y", d => {
          const defaultPosition = yScaleSlope(d[props.type].find(y => y.year === 2010).mortality_rate);
          switch (d.country_code) {
            case "LCA":
              return defaultPosition + 4;
            case "DMA":
              return defaultPosition - 10;
            default:
              return defaultPosition;
          }
        })
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .style("font-size", "13px")
        .attr("fill", d => d[`${props.type}_diff`] < 0 ? "#059799" : "#E27D5F")
        .text(d => d.country_name);

    const slopeOthers = slope
      .append("g")
        .attr("class", "slope-others")
        .attr("transform", "translate(0, -1000)");
    slopeOthers
      .append("line")
        .attr("x1", 0)
        .attr("x2", innerWidthSlope)
        .attr("stroke", "#059799")
        .attr("stroke-width", 2);
    slopeOthers
      .append("circle")
        .attr("class", "other-circle-2010")
        .attr("cx", 0)
        .attr("r", 5)
        .attr("fill", "#059799")
        .attr("stroke", "#F9FFFF");
    slopeOthers
      .append("circle")
        .attr("class", "other-circle-2020")
        .attr("cx", innerWidthSlope)
        .attr("r", 5)
        .attr("fill", "#059799")
        .attr("stroke", "#F9FFFF");
    slopeOthers
      .append("text")
        .attr("x", -8)
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .attr("fill", "#059799")
        .style("font-size", "13px");

    slopeMouseOver2010.style("opacity", 0);
    slopeMouseOver2020.style("opacity", 0);
    slopeOthers.style("opacity", 0);

    // Animations
    const scatterplotGsap = scatterplotRef.current;
    const description = descriptionRef.current;
    const slopeGsap = slopeRef.current;

    gsap.set(scatterplotGsap.querySelectorAll(".scatterplot-circle"), {scale: 0, opacity: 0});
    gsap.set(slopeGsap.querySelectorAll(".slope-country circle"), {scale: 0, opacity: 0});
    gsap.set(slopeGsap.querySelectorAll(".slope-country line"), {drawSVG: "0%", opacity: 0});
    gsap.set(slopeGsap.querySelectorAll(".slope-country text"), {opacity: 0, x: -10, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"});
    gsap.set(description.querySelectorAll("li"), {opacity: 0, x: -50});

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 0.5
      },
      scrollTrigger: {
        trigger: description
      }
    });

    tl.to(scatterplotGsap.querySelectorAll(".scatterplot-circle.default"), {scale: 1, opacity: 1, stagger: {amount: 0.8, from: "center"}})
      .to(description.querySelectorAll(`.description-${props.type}-0`), {opacity:1, x: "+=50", duration: 1.5}, "+=1")
      .to(scatterplotGsap.querySelectorAll(".scatterplot-circle.decrease"), {scale: 1, opacity: 1, stagger: {amount: 0.3, from: "center"}}, "-=0.5")
      .to(slopeGsap.querySelectorAll(".slope-country.decrease .circle-2010"), {scale: 1, opacity: 1, stagger: {amount: 0.3, from: "center"}}, "-=0.5")
      .to(slopeGsap.querySelectorAll(".slope-country.decrease line"), {drawSVG: "100%", opacity: 1, duration: 1.5, stagger: {amount: 0.3, from: "center"}}, "-=0.5")
      .to(slopeGsap.querySelectorAll(".slope-country.decrease .circle-2020"), {scale: 1, opacity: 1, stagger: {amount: 0.3, from: "center"}}, "-=1")
      .to(slopeGsap.querySelectorAll(".slope-country.decrease text"), {opacity: 1, x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, stagger: {amount: 0.3, from: "center"}}, "-=1")

      .to(description.querySelectorAll(`.description-${props.type}-1`), {opacity:1, x: "+=50", duration: 1.5}, "+=1")
      .to(scatterplotGsap.querySelectorAll(".scatterplot-circle.increase"), {scale: 1, opacity: 1, stagger: {amount: 0.3, from: "center"}}, "-=0.5")
      .to(slopeGsap.querySelectorAll(".slope-country.increase .circle-2010"), {scale: 1, opacity: 1, stagger: {amount: 0.3, from: "center"}}, "-=0.5")
      .to(slopeGsap.querySelectorAll(".slope-country.increase line"), {drawSVG: "100%", opacity: 1, duration: 1.5, stagger: {amount: 0.3, from: "center"}}, "-=0.5")
      .to(slopeGsap.querySelectorAll(".slope-country.increase .circle-2020"), {scale: 1, opacity: 1, stagger: {amount: 0.3, from: "center"}}, "-=1")
      .to(slopeGsap.querySelectorAll(".slope-country.increase text"), {opacity: 1, x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, stagger: {amount: 0.3, from: "center"}}, "-=1")

  });

  // Scales
  const maxGDP = d3.max(localData, d => d.gdp_per_capita_2015_US$);
  const xScale = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([0, innerWidth]);
  const maxMortality = d3.max(localData, d => d[props.type][0].mortality_rate);
  const yScale = d3.scaleLinear()
    .domain([0, maxMortality])
    .range([innerHeight, 0]);
  const yScaleSlope = d3.scaleLinear()
    .domain([0, maxMortality])
    .range([innerHeightSlope, 0]);

  return (
    <section>
      <div className="container">
        <SectionHeader
          number={props.number}
          title={props.title}
          intro={props.intro}
        />
        <div className="row">
          <div className="offset-md-1 col-11">
            <div className="chart-help">Pass your cursor over a circle to reveal additional information.</div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-7">
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
          <div className="col-4">
            <div className="slope-container">
              <ChartContainer
                width={width}
                height={heightSlope}
                margin={marginSlope}
              >
                <g
                  stroke="#808989"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <line
                    x1={0}
                    x2={0}
                    y1={0}
                    y2={innerHeightSlope}
                  />
                  <line
                    x1={innerWidthSlope}
                    x2={innerWidthSlope}
                    y1={0}
                    y2={innerHeightSlope}
                  />
                </g>
                <g
                  transform={`translate(0, ${innerHeightSlope + 20})`}  
                  fontSize="15px"
                  textAnchor="middle"
                  alignmentBaseline="hanging"
                >
                  <text>2010</text>
                  <text x={innerWidthSlope}>2020</text>
                </g>
                <g ref={slopeRef}></g>
                <g ref={slopeMouseOver2010Ref}>
                  <rect
                    x={-18}
                    y={0}
                    width={36}
                    height={20}
                    fill="#059799"
                    rx={2}
                    ry={2}
                  />
                  <text
                    x={0}
                    y={10.5}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#F9FFFF"
                    fontSize="11px"
                    fontWeight={500}
                  />
                </g>
                <g ref={slopeMouseOver2020Ref}>
                  <rect
                    x={-18}
                    y={0}
                    width={36}
                    height={20}
                    fill="#059799"
                    rx={2}
                    ry={2}
                  />
                  <text
                    x={0}
                    y={10.5}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#F9FFFF"
                    fontSize="11px"
                    fontWeight={500}
                  />
                </g>
              </ChartContainer>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-9">
            <div ref={descriptionRef} className="description description-mortality">
              <ul>
                {props.description.map((d, i) => (
                  <li 
                    key={`description-${props.type}-${i}`}
                    className={`description-${props.type}-${i}`}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="section-sources section-sources-infant-mortality">
              <div>Sources:</div>
              <ul>
                {props.sources.map((d, i) => (
                  <li key={`source-${props.type}-${i}`}>
                    {d.label}
                    <a href={d.link}>{d.linkLabel}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mortality;