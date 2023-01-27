import * as d3 from "d3";

const AxisBottom = props => {
  const numberOfTicks = props.innerWidth / 50;
  const ticks = props.scale.ticks(numberOfTicks);
  const verticalPosition = props.position === "middle" ? props.innerHeight/2 : props.innerHeight;

  return (
    <g className="axis" transform={`translate(0, ${verticalPosition})`} >
      <line x1={0} y1={0} x2={props.innerWidth} y2={0} />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(${props.scale(tick)}, 0)`}>
          <line x1={0} y1={0} x2={0} y2={3} />
          <text x={0} y={12} textAnchor="middle" >
            {d3.format(",.2r")(tick)}
          </text>
        </g>
      ))}
      {props.label &&
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${props.innerWidth / 2}, 27)`}
        >
          {props.label}
        </text>
      }
    </g>
  );
};

const AxisLeft = props => {
  const numberOfTicks = props.innerHeight / 50;
  const ticks = props.scale.ticks(numberOfTicks);
  const horizontalPosition = props.position === "middle" ? props.innerWidth/2 : 0

  return (
    <g className="axis" transform={`translate(${horizontalPosition}, 0)`}>
      <line x1={0} y1={props.innerHeight} x2={0} y2={0} />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(0, ${props.scale(tick)})`}>
          <line x1={-3} y1={0} x2={0} y2={0} />
          <text x={-5} y={0} textAnchor="end" alignmentBaseline="middle" >
            {tick}
          </text>
        </g>
      ))}
      {props.label &&
        <text
          textAnchor="middle"
          transform={`translate(-24, ${props.innerHeight / 2}) rotate(-90)`}
        >
          {props.label}
        </text>
      }
    </g>
  );
};

const AxisBandBottom = props => {
  const ticksVerticalTranslation = props.labelsPosition ? -10 : -15;

  return (
    <g className="axis" transform={`translate(0, ${props.innerHeight})`} >
      {props.ticks.map(tick => (
        <text
          key={tick}
          textAnchor="middle"
          transform={`translate(${props.scale(tick) + props.scale.bandwidth()/2}, ${ticksVerticalTranslation})`}
        >
          {tick}
        </text>
      ))}
    </g>
  );
};

const Axis = props => {

  switch (props.type) {
    case "bottom":
      return AxisBottom(props);
    case "left":
      return AxisLeft(props);
    case "bandBottom":
      return AxisBandBottom(props);
    // no default
  };

};

export default Axis;