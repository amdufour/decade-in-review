import { useState } from "react";
import * as d3 from "d3";

import SectionHeader from "../UI/SectionHeader";
import { regions } from "../helper/helper";
import ChartContainer from "../ChartComponents.js/ChartContainer";

const QualityOfLife = props => {
  // Dimensions
  const width = 342;
  const height = 342;
  const margin = { top: 50, right: 50, bottom: 70, left: 50 };
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = innerWidth;

  // Scales
  const radialScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth/2]);

  // Data
  const bgCircles = [25, 50, 75, 100];

  const defaultRegionLabel = "Europe & Central Asia";
  const defaultData = props.dataByCountry.filter(c => c.region === defaultRegionLabel);

  const sortData = (d) => {
    d.sort((a, b) => {
      if (a.country_name < b.country_name) return -1;
      if (a.country_name > b.country_name) return 1;
      return 0;
    });
  };
  sortData(defaultData);

  const [data, setData] = useState(defaultData);

  return (
    <section className="section-quality-life">
      <div className="container">
        <SectionHeader
          number={5}
          title="Quality of life"
          intro=""
        />
        <div>Legend with world data</div>
        <div>Region selector</div>
        <div className="row">
          {defaultData.map((d, i) => (
            <div 
              key={`quality-life-${d.country_code}`}
              className="col-12 col-md-3"
            >
              <ChartContainer
                width={width}
                height={height}
                margin={margin}
              >
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
    </section>
  );
};

export default QualityOfLife;