import { Fragment, useState } from "react";
import * as d3 from "d3";

import Heatmap from "./Heatmap";
import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";

// Data
const regions = [
  "North America",
  "Latin America & Caribbean",
  "Europe & Central Asia",
  "Middle East & North Africa",
  "Sub-Saharan Africa",
  "East Asia & Pacific",
  "South Asia",
];
const incomeGroups = [
  "High income",
  "Upper middle income",
  "Lower middle income",
  "Low income"
];

const BreakdownWomen = props => {
  const [groupSelection, setGroupSelection] = useState(regions);


  // Dimensions
  const margin = { top: 0, right: 10, bottom: 0, left: 0 };
  const width = 1600;
  const height = 20;
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;


  // Scales
  const xScale = d3.scaleBand()
    .domain(props.years)
    .range([0, innerWidth])
    .paddingOuter(0.1);
  const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(["white", "Teal"]);

  return (
    <Fragment>
      <p>Select Region / Income</p>
      <p>Select Literacy / Girls in school / Women MP</p>
      <p>Legend heatmap + no data (gray)</p>
      <div className="heatmap-axis">
        <ChartContainer
          width={width}
          height={30}
          margin={margin}
        >
          <Axis
            type="bandBottom"
            ticks={props.years}
            scale={xScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
            labelsPosition="above"
          />
        </ChartContainer>
      </div>  
      {groupSelection.map((group, i) => (
        <Fragment key={`breakdown-women-group-${i}`}>
          <h4>{group}</h4>
          {props.data.filter(country => country["region"] === group)
                     .sort((a, b) => {
                       if (a.country_name < b.country_name) return -1;
                       if (a.country_name > b.country_name) return 1;
                       return 0;
                     })
                     .map(country => (
            <Heatmap
              key={`heatmap-${country.country_code}`}
              data={country}
              margin={margin}
              width={width}
              height={height}
              bandScale={xScale}
              colorScale={colorScale}
              topic="women_MP_seats"
            />
          ))}
        </Fragment>
      ))}
      <div className="heatmap-axis">
        <ChartContainer
          width={width}
          height={30}
          margin={margin}
        >
          <Axis
            type="bandBottom"
            ticks={props.years}
            scale={xScale}
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          />
        </ChartContainer>
      </div>  
    </Fragment>
  );
};

export default BreakdownWomen;