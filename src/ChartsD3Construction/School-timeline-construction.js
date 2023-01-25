import * as d3 from "d3";

import SectionHeader from "../UI/SectionHeader";
import ChartContainer from "../ChartComponents.js/ChartContainer";
import Curve from "../ChartComponents.js/Curve";

const SchoolAndParlaments = props => {
  // Dimensions
  const tlWidth = 300;
  const tlHeight = 200;
  const tlMargin = { top: 30, right: 50, bottom: 30, left: 30 };
  const tlInnerWidth = tlWidth - tlMargin.right - tlMargin.left;
  const tlInnerHeight = tlHeight - tlMargin.top - tlMargin.bottom;

  // Scales
  const tlXScale = d3.scaleLinear()
    .domain([props.years[0], props.years[props.years.length - 1]])
    .range([0, tlInnerWidth]);
  const tlSchoolYScale = d3.scaleLinear()
    .domain([d3.min(props.dataMP, d => d.percentage), d3.max(props.dataSchool, d => d.percentage)])
    .range([tlInnerHeight, 0]);

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
              <ChartContainer
                width={tlWidth}
                height={tlHeight}
                margin={tlMargin}
              >
                <Curve
                  xScale={tlXScale}
                  yScale={tlSchoolYScale}
                  xAccessor="year"
                  yAccessor="percentage"
                  data={props.dataSchool}
                  stroke="#AAAFAF"
                  strokeWidth={3}
                />
                <rect
                  x={0}
                  y={0}
                  width={tlInnerWidth}
                  height={tlInnerHeight}
                  stroke="black"
                  fill="none"
                />
              </ChartContainer>
            </div>
          </div>
          <div className="col-12 col-md-5 offset-md-1">
          <div className="timeline">
              <ChartContainer
                width={tlWidth}
                height={tlHeight}
                margin={tlMargin}
              >
                <Curve
                  xScale={tlXScale}
                  yScale={tlSchoolYScale}
                  xAccessor="year"
                  yAccessor="percentage"
                  data={props.dataMP}
                  stroke="#AAAFAF"
                  strokeWidth={3}
                />
                <rect
                  x={0}
                  y={0}
                  width={tlInnerWidth}
                  height={tlInnerHeight}
                  stroke="black"
                  fill="none"
                />
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolAndParlaments;