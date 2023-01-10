import * as d3 from "d3";

import ChartContainer from "../ChartComponents.js/ChartContainer";
import Curve from "../ChartComponents.js/Curve";

const Gap = props => {
  // Dimensions
  const margin = { top: 50, right: 300, bottom: 50, left: 300 };
  const width = 1600;
  const height = 300;
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;


  // Format data
  const firstYear = props.data[0].year;
  const lastYear = props.data[props.data.length - 1].year;
  const minLiteracy = props.data[0].literacy_female;
  const maxLiteracy = props.data[props.data.length - 1].literacy_male;

  const dataDecade = props.data.slice(-11);
  const dataHistoric = props.data.slice(0, -10);


  // Scales
  const xScale = d3.scaleLinear()
    .domain([firstYear, lastYear])
    .range([0, innerWidth]);
  const yScale = d3.scaleLinear()
    .domain([minLiteracy, maxLiteracy])
    .range([innerHeight, 0]);

  return (
    <ChartContainer
      width={width}
      height={height}
      margin={margin}
    >
      <Curve
        xScale={xScale}
        yScale={yScale}
        xAccessor="year"
        yAccessor="literacy_female"
        data={dataHistoric}
        stroke="Silver"
        strokeWidth={3}
        strokeDasharray="6 8"
      />
      <Curve
        xScale={xScale}
        yScale={yScale}
        xAccessor="year"
        yAccessor="literacy_male"
        data={dataHistoric}
        stroke="Silver"
        strokeWidth={3}
        strokeDasharray="6 8"
      />
      <Curve
        xScale={xScale}
        yScale={yScale}
        xAccessor="year"
        yAccessor="literacy_female"
        data={dataDecade}
        stroke="LightCoral"
        strokeWidth={5}
      />
      <Curve
        xScale={xScale}
        yScale={yScale}
        xAccessor="year"
        yAccessor="literacy_male"
        data={dataDecade}
        stroke="SlateBlue"
        strokeWidth={5}
      />
    </ChartContainer>
  );
};

export default Gap;