const Circle = props => {
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      fill={props.color}
      fillOpacity="0.2"
    />
  );
};

export default Circle;