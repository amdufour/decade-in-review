import { Fragment } from "react";
import * as d3 from "d3";

import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";
import Circle from "../ChartComponents.js/Circle";

const Scatterplot = props => {
  // Dimensions
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  // Format data
  const sortedData = props.data.sort((a, b) => b.population - a.population);
  const threshold = props.focus === "infant_mortality" ? 50 : 0.0002;

  // Scales
  const maxMortality = props.focus === "infant_mortality"
    ? d3.max(props.data, d => d[props.focus].find(y => y.year === props.year).mortality_rate)
    : d3.max(props.data, d => d[props.focus].find(y => y.year === props.year).mortality_rate/d.population);
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(props.data, d => d.gdp_per_capita_2015_US$)])
    .range([0, innerWidth])
    .nice();
  const yScale = d3.scaleLinear()
    .domain([0, maxMortality])
    .range([innerHeight, 0])
    .nice();
  const rScale = d3.scaleRadial()
    .domain([0, d3.max(props.data, d => d.population)])
    .range([1, 30]);

  return (
    <ChartContainer
      width={width}
      height={height}
      margin={props.margin}
    >
      <Axis
        type="bottom"
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        scale={xScale}
        label="GDP per capita (2015 US$)"
      />
      <Axis
        type="left"
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        scale={yScale}
        label={props.focus === "infant_mortality"
          ? "Infant mortality rate (per 1,000 live births)"
          : "Number of Maternal deaths / population"
        }
      />
      {sortedData.map(country => (
        <Fragment key={`circle-${props.focus}-${country.country_code}`}>
          {country[props.focus].find(y => y.year === props.year).mortality_rate &&
            <Circle
              cx={xScale(country.gdp_per_capita_2015_US$)}
              cy={props.focus === "infant_mortality"
                ? yScale(country[props.focus].find(y => y.year === props.year).mortality_rate)
                : yScale(country[props.focus].find(y => y.year === props.year).mortality_rate / country.population)
              }
              r={rScale(country.population)}
              color={props.focus === "infant_mortality"
                ? country[props.focus].find(y => y.year === props.year).mortality_rate > threshold ? "red" : "black"
                : country[props.focus].find(y => y.year === props.year).mortality_rate / country.population > threshold ? "red" : "black"
              }
            />
          }
        </Fragment>
      ))}
    </ChartContainer>
  );
};

export default Scatterplot;