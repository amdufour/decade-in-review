import ChartContainer from "../ChartComponents.js/ChartContainer";

const Scatterplot = props => {
  // Dimensions
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  return (
    <ChartContainer
      width={width}
      height={height}
      margin={props.margin}
    >
      
    </ChartContainer>
  );
};

export default Scatterplot;