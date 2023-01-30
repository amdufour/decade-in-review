import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

import ChartContainer from "../ChartComponents.js/ChartContainer";

const Heatmap = props => {
  const [showLabels, setShowLabels] = useState(false);
  const heatmapRef = useRef(null);

  useEffect(() => {
    const heatmap = d3.select(heatmapRef.current);

    heatmap
      .selectAll("rect, text")
      .on("mouseenter", () => setShowLabels(true))
      .on("mouseleave", () => setShowLabels(false));
  }, []);

  return (
    <div className={`heatmap-section ${showLabels ? "show-labels" : ""}`}>
      <h4>{props.data.country_name}</h4>
      <ChartContainer
        width={props.width}
        height={props.height}
        margin={props.margin}
      >
        <g ref={heatmapRef}>
          {props.data[props.topic].map((d, i) => (
            <g
              key={`heatmap-${props.data.country_name}-${d.year}`}
              transform={`translate(${props.bandScale(d.year)}, 0)`}
            >
              <rect
                x={0}
                y={0}
                width={props.bandScale.bandwidth()}
                height={props.height}
                fill={d.percentage.length > 0 ? props.colorScale(+d.percentage) : "#059799"}
                stroke="#059799"
                strokeWidth={3}
                rx={6}
                ry={6}
              />
              <text
                x={props.bandScale.bandwidth()/2}
                y={props.height/2}
                textAnchor="middle"
                dominantBaseline="middle"
                color="#021E1E"
                fontSize={16}
              >
                {d.percentage.length > 0 ? `${d3.format(".1f")(d.percentage)}%` : "n/a"}
              </text>
            </g>
          ))}
        </g>
      </ChartContainer>
    </div>
  );
};

export default Heatmap;