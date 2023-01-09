import * as d3 from "d3";

import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";
import Curve from "../ChartComponents.js/Curve";

const Timeline = props => {
  // Dimensions
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;


  // Format data
  const maxMortalities = [];
  const focusDiffKey = `${props.focus}_diff`;
  props.data.forEach(d => {
    maxMortalities.push(d3.max(d[props.focus], year => year.mortality_rate));
    d[focusDiffKey] = d[props.focus].find(y => y.year === props.year).mortality_rate - d[props.focus][0].mortality_rate;
  });
  const maxMortality = d3.max(maxMortalities);

  const dataSortedByDiff = props.data
    .filter(country => !isNaN(country[focusDiffKey]))
    .sort((a, b) => a[focusDiffKey] - b[focusDiffKey]);
  const increasedMortality = dataSortedByDiff.slice(-5).sort((a, b) => b[focusDiffKey] - a[focusDiffKey]);
  const topDecreaseMortality = dataSortedByDiff.slice(0, 5);

  let dataSortedForDisplay = dataSortedByDiff.filter(country => !increasedMortality.find(c => c.country_code === country.country_code));
  dataSortedForDisplay = dataSortedForDisplay.filter(country => !topDecreaseMortality.find(c => c.country_code === country.country_code));
  dataSortedForDisplay = dataSortedForDisplay.concat(topDecreaseMortality).concat(increasedMortality);
  console.log("dataSortedForDisplay", props.focus, dataSortedForDisplay)
  // Scales
  const xScale = d3.scaleLinear()
    .domain([d3.min(props.years), d3.max(props.years)])
    .range([0, innerWidth]);
  const yScale = d3.scaleLinear()
    .domain([0, maxMortality])
    .range([innerHeight, 0])
    .nice();

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
      />
      <Axis
        type="left"
        innerHeight={innerHeight}
        scale={yScale}
        label={props.focus === "infant_mortality"
          ? "Infant mortality rate (per 1,000 live births)"
          : "Number of Maternal deaths"
        }
      />
      {dataSortedForDisplay.map(country => (
        <Curve
          key={`timeline-${props.focus}-${country.country_code}`}
          xScale={xScale}
          yScale={yScale}
          data={country[props.focus]}
          xAccessor={"year"}
          yAccessor={"mortality_rate"}
          stroke={
            topDecreaseMortality.find(c => c.country_code === country.country_code)
              ? "green"
              : increasedMortality.find(c => c.country_code === country.country_code)
                ? "red"
                : "black"
          }
          strokeOpacity={
            topDecreaseMortality.find(c => c.country_code === country.country_code)
              ? 1
              : increasedMortality.find(c => c.country_code === country.country_code)
                ? 1
                : 0.1
          }
          strokeWidth={
            topDecreaseMortality.find(c => c.country_code === country.country_code)
              ? 1.5
              : increasedMortality.find(c => c.country_code === country.country_code)
                ? 1.5
                : 1
          }
        />
      ))}
    </ChartContainer>
  );
};

export default Timeline;