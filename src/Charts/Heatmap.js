import ChartContainer from "../ChartComponents.js/ChartContainer";

const Heatmap = props => {
  return (
    <div className="heatmap-section">
      <h5>{props.data.country_name}</h5>
      <ChartContainer
        width={props.width}
        height={props.height}
        margin={props.margin}
      >
        {props.data[props.topic].map((d, i) => (
          <rect
            x={props.bandScale(d.year)}
            y={0}
            width={props.bandScale.bandwidth()}
            height={props.height}
            fill={d.percentage.length > 0 ? props.colorScale(+d.percentage) : "LightGray"}
            stroke="white"
          />
        ))}
      </ChartContainer>
    </div>
  );
};

export default Heatmap;