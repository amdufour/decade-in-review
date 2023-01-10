import * as d3 from "d3";

const Curve = props => {
  const lineGenerator = d3.line()
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor] / props.ratio))
    .defined(d => d[props.yAccessor] && d[props.yAccessor] !== null);

  return (
    <path
      d={lineGenerator(props.data)}
      fill="none" 
      stroke={props.stroke ? props.stroke : "black"} 
      strokeWidth={props.strokeWidth ? props.strokeWidth : 1}
      strokeOpacity={props.strokeOpacity ? props.strokeOpacity : 1}
    />
  );
};

export default Curve;