import * as d3 from "d3";

const Curve = props => {
  const ratio = props.ratio ? props.ratio : 1;
  const lineGenerator = d3.line()
    .x(d => props.xScale(d[props.xAccessor]))
    .y(d => props.yScale(d[props.yAccessor] / ratio))
    .defined(d => d[props.yAccessor] && d[props.yAccessor] !== null)
    .curve(d3.curveCatmullRom);

  return (
    <path
      d={lineGenerator(props.data)}
      fill="none" 
      stroke={props.stroke ? props.stroke : "black"} 
      strokeWidth={props.strokeWidth ? props.strokeWidth : 1}
      strokeOpacity={props.strokeOpacity ? props.strokeOpacity : 1}
      strokeLinecap="round"
      strokeDasharray={props.strokeDasharray ? props.strokeDasharray : 0}
    />
  );
};

export default Curve;