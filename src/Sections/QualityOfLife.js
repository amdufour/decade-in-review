import { useState } from "react";
import Select from 'react-select';
import * as d3 from "d3";

import SectionHeader from "../UI/SectionHeader";
import { regions, hpiColorScale } from "../helper/helper";
import ChartContainer from "../ChartComponents.js/ChartContainer";

import LegendAxisImg from "./assets/quality_of_life-axis.svg";
import LegendAxisVisuals from "./assets/quality_of_life-visuals.svg";

const QualityOfLife = props => {
  // Dimensions
  const width = 342;
  const height = 342;
  const margin = { top: 50, right: 50, bottom: 70, left: 50 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = innerWidth;

  // Scales
  const bgCircles = [25, 50, 75, 100];
  const angles = [0, 1, 2, 3, 4];
  const abbreviations = ["E", "I", "W", "L", "A"];
  const categories = ["access_electricity", "access_internet", "access_water", "life_expectancy", "air_pollution_exposure"];

  const radialScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth/2]);
  const scaleAngle = d3.scaleLinear()
    .domain([0, 5])
    .range([0, 2 * Math.PI]);

  // Shape generators
  const shapeGenerator = d3.lineRadial()
    .angle(d => scaleAngle(d.index))
    .radius(d => radialScale(d.valueLastYear));
  const shapeGeneratorFirstYear = d3.lineRadial()
    .angle(d => scaleAngle(d.index))
    .radius(d => radialScale(d.valueFirstYear));

  // Data
  const localData = JSON.parse(JSON.stringify(props.dataByCountry));
  const dataToPlot = localData.filter(c => !c.has_missing_life_quality_data);
  dataToPlot.forEach(d => {
    const lifeQualityFactors = [];
    lifeQualityFactors.push({ 
      index: 0, 
      factor: "access_electricity", 
      valueFirstYear: d.access_electricity["2010"],
      valueLastYear: d.access_electricity["2010"],
      hasImproved: Math.abs(d.access_electricity["2020"] - d.access_electricity["2010"]) >= 1 ? d.access_electricity.has_improved : "equal"
    });
    lifeQualityFactors.push({ 
      index: 1, 
      factor: "access_internet", 
      valueFirstYear: d.access_internet["2010"],
      valueLastYear: d.access_internet["2020"],
      hasImproved: Math.abs(d.access_internet["2020"] - d.access_internet["2010"]) >= 1 ? d.access_internet.has_improved : "equal"
    });
    lifeQualityFactors.push({ 
      index: 2, 
      factor: "access_water", 
      valueFirstYear: d.access_water["2010"],
      valueLastYear: d.access_water["2020"],
      hasImproved: Math.abs(d.access_water["2020"] - d.access_water["2010"]) >= 1 ? d.access_water.has_improved : "equal"
    });
    lifeQualityFactors.push({ 
      index: 3, 
      factor: "life_expectancy", 
      valueFirstYear: d.life_expectancy["2010"],
      valueLastYear: d.life_expectancy["2020"],
      hasImproved: Math.abs(d.life_expectancy["2020"] - d.life_expectancy["2010"]) >= 1 ? d.life_expectancy.has_improved : "equal"
    });
    const air2010 = 100 - d.population_exposed_to_levels_exceeding_WHO_guideline["2010"];
    const air2017 = 100 - d.population_exposed_to_levels_exceeding_WHO_guideline["2017"];
    lifeQualityFactors.push({ 
      index: 4, 
      factor: "air_pollution_exposure", 
      valueFirstYear: air2010,
      valueLastYear: air2017,
      hasImproved: Math.abs(air2017 - air2010) >= 1 ? d.population_exposed_to_levels_exceeding_WHO_guideline.has_improved : "equal"
    });

    d["life_quality_factors"] = lifeQualityFactors;
  });

  const defaultRegionLabel = "Eastern Mediterranean";
  const defaultData = dataToPlot.filter(c => c.region === defaultRegionLabel);

  const sortData = (d) => {
    d.sort((a, b) => {
      if (a.country_name < b.country_name) return -1;
      if (a.country_name > b.country_name) return 1;
      return 0;
    });
  };
  sortData(defaultData);
  const [data, setData] = useState(defaultData);

  const handleRegionSelection = (selection) => {
    const filteredData = dataToPlot.filter(c => c.region === selection.label);
    setData(filteredData);
  };

  

  return (
    <section className="section-quality-life">
      <div className="container">
        <SectionHeader
          number={5}
          title="Most of us are living a better, longer, and greener life"
          intro="The overall quality of life improved in most countries during the last decade. The following visualization presents factors such as access to electricity, the internet and drinking water, life expectancy, exposure to clean air, and the Happy Planet Index. The Happy Planet Index tells us “how well nations are doing at achieving long, happy, sustainable lives,” and its 2019 value is represented by the color of the shape associated with each country. The larger and the greener a shape is, the better a nation is doing."
        />
        <div className="row">
          <div className="col-11 offset-md-1">
            <div className="legend-container">
              <h3>How to read this visualization</h3>
              <div className="row">
                <div className="col-12 col-md-3">
                  <img src={LegendAxisImg} alt="Legend of the radial axis" />
                </div>
                <div className="col-12 col-md-5">
                  <img src={LegendAxisVisuals} alt="How to interpret the visualizations" />
                </div>
                <div className="col-12 col-md-4">
                  <div className="legend-quality-life">
                    <div className="legend-section legend-color">
                      <div className="legend-color-label">Color: Happy Planet Index</div>
                      <div className="legend-color-gradient"></div>
                      <div className="labels">
                        <div className="label">24</div>
                        <div className="label">65</div>
                      </div>
                    </div>
                    <div className="legend-section legend-prefixes">
                      <ul>
                        <li><span className="prefix-label">E: </span>Population with access to Electricity (%)</li>
                        <li><span className="prefix-label">I: </span>Population with access to the Internet (%)</li>
                        <li><span className="prefix-label">W: </span>Population with access to drinking water (%)</li>
                        <li><span className="prefix-label">L: </span>Life expectancy (years)</li>
                        <li><span className="prefix-label">A: </span>Population exposed to air pollution below WHO limits (%)</li>
                      </ul>
                    </div>
                    <div className="legend-section legend-improvements">
                      <ul>
                        <li><span className="symbol symbol-improved"></span>Improved in the last decade</li>
                        <li><span className="symbol symbol-worsened"></span>Worsened in the last decade</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="selectors">
              <h3 className="highlight">Select a region</h3>
              <Select
                className="select select-region"
                classNamePrefix="select"
                defaultValue={regions.find(r => r.label === defaultRegionLabel)}
                isSearchable={true}
                name="region"
                options={regions}
                onChange={handleRegionSelection}
              />
            </div>
            <div className="row">
              {data.map((d, i) => (
                <div 
                  key={`quality-life-${d.country_code}`}
                  className="col-12 col-md-3"
                >
                  <ChartContainer
                    width={width}
                    height={height}
                    margin={margin}
                  >
                    <filter id="blur">
                      <feGaussianBlur stdDeviation="3" />
                    </filter>
                    <filter id="blur-sm">
                      <feGaussianBlur stdDeviation="1" />
                    </filter>
                    <g transform={`translate(${innerWidth/2}, ${innerHeight/2})`}>
                      <g 
                        className="bg-circles"
                        fill="none"
                        stroke="#D1D3D3"
                        strokeDasharray="6 5"
                        strokeLinecap="round"
                      >
                        {bgCircles.map(c => (
                          <circle
                            key={`bg-circle-${c}`}
                            cx={0}
                            cy={0}
                            r={radialScale(c)}
                          />
                        ))}
                      </g>
                      <path
                        d={`${shapeGenerator(d.life_quality_factors)} Z`}
                        fill={hpiColorScale(d.happy_planet_index_2019)}
                        filter="url(#blur)"
                      />
                      <path
                        d={`${shapeGenerator(d.life_quality_factors)} Z`}
                        fill={hpiColorScale(d.happy_planet_index_2019)}
                      />
                      <path
                        d={`${shapeGeneratorFirstYear(d.life_quality_factors)} Z`}
                        fill="none"
                        stroke="#021E1E"
                        strokeWidth={1}
                        filter="url(#blur-sm)"
                      />
                      <path
                        d={`${shapeGeneratorFirstYear(d.life_quality_factors)} Z`}
                        fill="none"
                        stroke="#021E1E"
                        strokeWidth={1}
                      />
                      <g 
                        className="axis-lines"
                        stroke="#F9FFFF"
                        strokeWidth={2}
                      >
                        {angles.map(a => (
                          <line
                            key={`axis-line-${d.country_name}-${a}`}
                            x1={0}
                            y1={0}
                            x2={radialScale(100) * Math.sin(scaleAngle(a))}
                            y2={-radialScale(100) * Math.cos(scaleAngle(a))}
                          />
                        ))}
                      </g>
                      <g
                        className="abbreviations"
                        fontSize="18px"
                      >
                        {abbreviations.map((a, i) => (
                          <text
                            key={`abbreviation-${d.country_name}-${a}`}
                            x={radialScale(128) * Math.sin(scaleAngle(i))}
                            y={-radialScale(128) * Math.cos(scaleAngle(i))}
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {a}
                          </text>
                        ))}
                      </g>
                      <g className="improvements">
                        {categories.map((c, i) => (
                          <circle
                            key={`improvement-${d.country_name}-${c}`}
                            cx={radialScale(110) * Math.sin(scaleAngle(i))}
                            cy={-radialScale(110) * Math.cos(scaleAngle(i))}
                            r={4}
                            fill={d.life_quality_factors.find(f => f.factor === c).hasImproved === "positive" ? "#059799" : "transparent"}
                            stroke={d.life_quality_factors.find(f => f.factor === c).hasImproved === "positive" 
                                      ? "#059799" 
                                      : d.life_quality_factors.find(f => f.factor === c).hasImproved === "negative"
                                        ? "#E27D5F"
                                        : "transparent"
                            }
                            strokeWidth={2}
                          />
                        ))}
                      </g>
                    </g>
                  </ChartContainer>
                  <div className="quality-life-country-label">{d.country_name}</div>
                </div>
              ))}
            </div>
            <div className="section-sources section-sources-gap">
              <div>Sources:</div>
              <ul>
                <li>Access to electricity: <a href="https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS?end=2020&name_desc=false&start=2020&view=bar">Worldbank</a></li>
                <li>Individuals using the Internet: <a href="https://data.worldbank.org/indicator/IT.NET.USER.ZS?end=2020&start=1960&view=chart">Worldbank</a></li>
                <li>People using at least basic drinking water services: <a href="https://data.worldbank.org/indicator/SH.H2O.BASW.ZS?view=chart">Worldbank</a></li>
                <li>Life expectancy: <a href="https://population.un.org/wpp/Download/Standard/MostUsed/">United Nations</a></li>
                <li>Outdoor air pollution: <a href="https://ourworldindata.org/outdoor-air-pollution">Our World in Data</a></li>
                <li><a href="https://happyplanetindex.org/countries/">Happy Planet Index</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityOfLife;